// 获取数据并绑定
;
var api_url = 'http://localhost/wfp'
	, request_url = {
		'r' : api_url + '/rural/{m}/{q}', // 乡村
		's' : api_url + '/staplefood/{m}/{q}', // 主食
		'v' : api_url + '/vegetables/{m}{q}', // 蔬菜
		'f' : api_url + '/fruit/{m}/{q}', // 水果
		'a' : api_url + '/activity/{m}/{q}' // 活动
	};
var hash = window.location.hash||'#n', q = window.location.search;
if (q && q.length > 1)
{
	q = q.substring(1);
} else {
	console.error('未指定对象.');
	;
}
hash = hash.substring(1);

var commentItem = '<li class="comment"><article id="comment-1"><div class="comment-author"><img class="avatar" src="{avatar}" alt="头像"/><span class="commenter">{commenter}</span><span class="comment-date">{date}</span></div><div class="comment-content"><p>{content}</p></div></article></li>';

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