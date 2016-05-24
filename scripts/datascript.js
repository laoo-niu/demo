// 获取数据并绑定
;
var api_url = 'http://localhost/wfp'
	, request_url = {
		'r' : api_url + '/rural/{m}/{q}', // 乡村
		's' : api_url + '/staplefood/{m}/{q}', // 主食
		'v' : api_url + '/vegetables/{m}{q}', // 蔬菜
		'f' : api_url + '/fruit/{m}/{q}', // 水果
		'a' : api_url + '/activity/{m}/{q}', // 活动
		'sn' : api_url + '/token/{autosignin}/{cert}', // 登录
		'u' : api_url + '/user' // 用户相关接口
	};
var hash = window.location.hash, q = window.location.search;
if (q && q.length > 1)
{
	q = q.substring(1);
}
if (hash && hash.length > 1)
{
	hash = hash.substring(1);
}

var commentItem = '<li class="comment"><article id="comment-1"><div class="comment-author"><img class="avatar" src="{avatar}" alt="头像"/><span class="commenter">{commenter}</span><span class="comment-date">{date}</span></div><div class="comment-content"><p>{content}</p></div></article></li>';

// 获取画面初始数据
if (q&&hash)
$.restGet(request_url[hash], {'m': 'init', 'q': q}, function(data){
	console.log(data);
	if (data.code != 0)
	{
		$.error(data.msg, 5000);
	}
	// 统计信息
	var statistics = data.body.statistics;
	if (statistics)
	{
		var $post_meta = $('div#post-meta');
		for (var meta in statistics)
		{
			$post_meta.find('div.' + meta + ' .count, div.' + meta + ' .count1, div.' + meta + ' .comment-count').html(statistics[meta]);
		}
	}
	// 评论列表
	var commentList = data.body.commentList;
	// 无评论
	if (!commentList || commentList.length == 0)
	{
		$('#comments>.section-title:first').html('抢沙发');
		return;
	}
	var commentlist = $('ol.commentlist'), len = commentList.length;
	$('#comments>.section-title:first').html(len + ' 评论');
	for (var i = 0; i < len; i++)
	{
		var comment = commentList[i];
		var _item = null;
		for ( var opt in comment )
		{
			_item = (_item||commentItem).replace('{' + opt + '}', comment[opt]);
		}
		commentlist.append(_item, true);
	}
});

// 登录
$('#btn_Login').click(function(){
	// TODO 空判断
	var _form = document.forms['form_sign'];
	$.signIn(request_url.sn, {
		's_u': _form['s_u'].value,
		's_p': _form['s_p'].value,
		'autosignin': _form['autosignin'].checked
	}, function(data) {
		if (data.code != 0)
		{
			// 10次登录失败则清除本地缓存数据及cookie
			if (sessionStorage.signerror)
			{
				sessionStorage.signerror = Number(sessionStorage.signerror) + 1;
			} else sessionStorage.signerror = 1;
			if (sessionStorage.signerror >= 10)
			{
				clearStorage();
			}
			$.error(data.msg, 3000);
		}
		// 缓存用户信息
		localStorage.removeItem('_user');
		// 不自动登录的情况
		if (_body.expires == 0)
		{
			sessionStorage.setItem('_user', JSON.stringify(_body.user));
			// 自动登录永久保存
		} else {
			localStorage.setItem('_user', JSON.stringify(_body.user));
		}
		// 转回到原画面,未指定画面时回主画面
		var from = window.location.search, _f;
		if (from && from.indexOf('?from=') === 0)
		{
			_f = from.substring(6);
		}
		if (!_f || _f.indexOf('login.html') >= 0) {
			_f = 'index.shtml';
		}
		window.location.href = _f;
	});
});

var getUser = function() {
	var _user = sessionStorage._user||localStorage._user;
	if (!_user)
	{
		var _tk__ = $.cookie('_tk__');
		if (_tk__)
		{
			// 同步获取
			$.ajaxSetup('async', false);
			var data = $.restGet(request_url.u + '/getInfoByToken');
			if (data.code != 0)
			{
				clearStorage();
				$.info('未登录或登录已过期.', 3000);
				var pathname = window.location.pathname;
				window.location.href = 'login.html?from=' + pathname.substring(pathname.lastIndexOf('/')+1);
			}
			sessionStorage.setItem('_user', JSON.stringify(data.body));
			_user = data.body.user;
			$.ajaxSetup('async', true);
		} else {
			$.info('未登录或登录已过期.', 3000);
			var pathname = window.location.pathname;
			window.location.href = 'login.html?from=' + pathname.substring(pathname.lastIndexOf('/')+1);
		}
		
	} else {
		_user = JSON.parse(_user);
	}
	return _user;
};

var clearStorage = function() {
	sessionStorage.clear();
	localStorage.clear();
	$.removeCookie('_tk__');
};
