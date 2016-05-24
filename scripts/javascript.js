/*-----------------------------------------------------------------------------
Matrix Responsive HTML Template - Javascript Functions
-------------------------------------------------------------------------------
Version : 1.2
Date : 21 / 10 / 2012
Author : Billy Foo
-----------------------------------------------------------------------------*/

$(document).ready(function(){
	
	// Color changer
	$(".cblue").click(function(){
       $("link#clink").attr("href", "css/style-blue.css");
       return false;
    });
	$(".cred").click(function(){
       $("link#clink").attr("href", "css/style-red.css");
       return false;
    });
	$(".cgreen").click(function(){
       $("link#clink").attr("href", "css/style-green.css");
       return false;
    });
	$(".cmagenta").click(function(){
       $("link#clink").attr("href", "css/style-magenta.css");
       return false;
    });
	$(".cpurple").click(function(){
       $("link#clink").attr("href", "css/style-purple.css");
       return false;
    });
	$(".cteal").click(function(){
       $("link#clink").attr("href", "css/style-teal.css");
       return false;
    });
	$(".clime").click(function(){
       $("link#clink").attr("href", "css/style-lime.css");
       return false;
    });
	$(".cbrown").click(function(){
       $("link#clink").attr("href", "css/style-brown.css");
       return false;
    });
	$(".cpink").click(function(){
       $("link#clink").attr("href", "css/style-pink.css");
       return false;
    });
	$(".cmango").click(function(){
       $("link#clink").attr("href", "css/style-mango.css");
       return false;
    });
	
	//Navigation
	$("ul#nav li").hoverIntent(function(){
		$(this).children('ul').slideDown(300);
	},function(){
		$(this).children('ul').slideUp(300);
	});
		// Create the dropdown base
		$("<select />").appendTo("nav");
		
		// Create default option "Go to..."
		$("<option />", {
		   "selected": "selected",
		   "value"   : "",
		   "text"    : "Go to..."
		}).appendTo("nav select");
		
		// Populate dropdown with menu items
		$("nav a").each(function() {
		 var el = $(this);
		 $("<option />", {
			 "value"   : el.attr("href"),
			 "text"    : el.text()
		 }).appendTo("nav select");
		});
		
		$("nav select").change(function() {
		  window.location = $(this).find("option:selected").val();
		});
	
	//Create a function for tiles
	function matrix_tiles_init() {
	//Flexslider	
    $('.flexslider').flexslider({
		slideshowSpeed: 5000,
		//animation: 'slide',
		after: function(slider) {
			slider.next().find('.quote-w').html(slider.find('span:eq(' + slider.currentSlide + ')').html());
		}
	});
	
	//Fix Masonry container width error
	function matrix_fix_masonry() {
	var screenWidth = jQuery(window).width();
	if (screenWidth < 960) {
		jQuery('#mainpage-mos').width(screenWidth);
	} else {
		jQuery('#mainpage-mos').width(960);
	}
	
	};
	matrix_fix_masonry();
	jQuery(window).resize(matrix_fix_masonry);

	//Masonry Settings
    $('#content-mos').masonry({
      itemSelector : '.tile',
      columnWidth : 160,
	  isAnimated: true,
	  isFitWidth: true
    });
	
  	//Allow effects when hovering on tiles
    $('.tile').not('.exclude').hover(function(){  
        $('.tile').not(this).addClass('fade');
    },     
    function(){    
        $('.tile').removeClass('fade');     
    });
	$('.tile').append('<img class="tilehover" src="images/tilehover.png" alt=" "/>');
		
	//Live-tile effects
	$(".live").liveTile({pauseOnHover: true});
	
	//Lightbox
	$("a.lightbox").click(function(){
		$(this).next(".tile-pre").addClass("tempsrc");
	});
	var lbSRC ="";
	$("a.lightbox").fancybox({
		'margin' : 0 ,
		'overlayColor' : '#fff',
		'overlayOpacity' : '0.9',
		'transitionIn': 'elastic',
		'transitionOut': 'elastic',
		'speedOut': 100,
		'cyclic' : true,
		//Lightbox iframe fix
		'onComplete': function() {
		lbSRC = $('#fancybox-content').find('iframe').attr('src');
		lbcolor = $('#fancybox-content').find('article').attr('data-lbcolor');
		$('#fancybox-content').css('border-color',lbcolor);
		},
		'onClosed': function() {
		$('.tempsrc').find('iframe').attr('src',lbSRC);
		$('.tile-pre').removeClass('tempsrc');
		$('#fancybox-content').css('border-color','#404040');
		}
	});
	
	matrix_media_player();
	
	}//end matrix_tiles_init();
	
	matrix_tiles_init(); //run the function when page is ready

		
	//Toggle
	$(".toggle-button").click(function(){
		$(this).next("div.toggle-content").slideToggle("slow");
		$(this).children('.toggle-indicator').text($(this).children('.toggle-indicator').text() == '+' ? '-' : '+');
	});
	
	//Accordion
	$(".accordion .ac-tab").click(function(){
		$(this).next("div.toggle-content").slideToggle("slow").siblings("div.toggle-content").slideUp("slow");
		$(this).children('.toggle-indicator').text('-')
		$(this).siblings().children('.toggle-indicator').text('+');
	});
	
	//Table
	$(".table-info ul li").hoverIntent(function(){
		$(this).next("div.table-details").slideDown("slow").siblings("div.table-details").slideUp("slow");
		$(this).children('.toggle-indicator').text('-')
		$(this).siblings().children('.toggle-indicator').text('+');
	},function(){
		
	});
	$(".table-info ul").mouseleave(function(){
		$(this).children('div.table-details').slideUp('slow');
		$(this).find('.toggle-indicator').text('+');
	});
	/*		
	//Post Meta
	var pathname = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
	// Get Number of Facebook Shares
    $.getJSON('http://graph.facebook.com/?id='+pathname+'',
        function(data) {
			if( data.shares == undefined){
            $('.meta2 .count').prepend('0');
			}else{
			$('.meta2 .count').prepend(data.shares);
			}
    });

    // Get Number of Tweet Count
    $.getJSON('http://urls.api.twitter.com/1/urls/count.json?url='+pathname+'&callback=?',
        function(data) {
            $('.meta3 .count').prepend(data.count);
    });*/
	
	
	//Bloglist
	$('.bloglist').hover(function(){
		$(this).css({'margin-top' : '-5px'});
	},
	function(){
		$(this).css({'margin-top' : '0'});
	});
	
	//Portfoliolist
	 $('ul#port-filter a').click(function() {  
        $(this).css('outline','none');  
        $('ul#port-filter .filter-current').removeClass('filter-current');  
        $(this).parent().addClass('filter-current');  
          
        var filterVal = $(this).text().toLowerCase().replace(' ','-');  
                  
        if(filterVal == 'all') {  
			$('div.hidden').fadeIn('fast').removeClass('hidden');  
        } else {  
            $('div#portfolio div.tile').each(function() {  
                if(!$(this).hasClass(filterVal)) {  
                    $(this).fadeOut('fast').addClass('hidden');  
                } else {  
                    $(this).fadeIn('fast').removeClass('hidden');  
                }  
            });
			$('div.portfoliolist').each(function() {  
                if(!$(this).hasClass(filterVal)) {  
                    $(this).fadeOut('fast').addClass('hidden');  
                } else {  
                    $(this).fadeIn('fast').removeClass('hidden');  
                }  
            });  
        }  
          
        return false;  
    });
	
	//Organic Tabs
	$("#demo-button").organicTabs();
	$("#demo-tab").organicTabs();
    
	//Check for placeholder
	// Released under MIT license: http://www.opensource.org/licenses/mit-license.php
	$('[placeholder]').focus(function() {
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');
	  }
	}).blur(function() {
	  var input = $(this);
	  if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));
	  }
	}).blur().parents('form').submit(function() {
	  $(this).find('[placeholder]').each(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
		  input.val('');
		}
	  })
	});
	
	//AJAX Pagination
	jQuery('.ajax-pagination a').live('click', function(e){ //check when pagination link is clicked and stop its action.
		e.preventDefault();
		var link = jQuery(this).attr('href'); //Get the href attribute
		jQuery("#loader").fadeIn(300); // show the loader animation
		jQuery.ajax({
            url: link,
			dataType: "html",
            context: document.body,
			cache: "false",
			beforeSend: function(){jQuery('#mainpage-mos').fadeOut(500)},
            success: function(html) {
				var newhtml = jQuery('#mainpage-mos', jQuery(html));
				jQuery('script', newhtml).each(function() {
					jQuery.globalEval(jQuery(this).text());
				});
				jQuery('#mainpage-mos').html(newhtml);
				jQuery('#mainpage-mos').fadeIn(500);
				matrix_tiles_init(); // run this function first
				var screenheight = jQuery(window).height();
				jQuery('#container').css('min-height', screenheight);
				// Remove .lb-video style for iframe elements
				jQuery('iframe').parent('.lb-video').removeAttr("style");
				jQuery("#loader").fadeOut(300); //hide the loader

            },
			error: function() {
				alert('Error');
			}
        });
		});
 	
	// jplayer hide buttons on resize
	jQuery('a.jp-full-screen').click(function(){
		jQuery('a#fancybox-left, a#fancybox-close, a#fancybox-right').hide();
	});
	jQuery('a.jp-restore-screen').click(function(){
		jQuery('a#fancybox-left, a#fancybox-close, a#fancybox-right').show();
	});
	
	// jplayer control bar width
	// Set width of control bar
	var vpWidth = jQuery(window).width();
		if ( vpWidth < 590 ) {
			jQuery('article .jp-controls-holder').css('width',(vpWidth-20) + 'px');
			var newWidth = vpWidth - 280;
			jQuery('article .jp-progress').css('width', newWidth + 'px');
		}
	jQuery('a.lightbox').click(function(){
		var vpWidth = jQuery(window).width();
		if ( vpWidth < 590 ) {
			jQuery('article .jp-controls-holder').css('width',(vpWidth-20) + 'px');
			var newWidth = vpWidth - 280;
			jQuery('article .jp-progress').css('width', newWidth + 'px'); 
		} else {
			jQuery('article .jp-controls-holder').css('width',570 + 'px');
			jQuery('article .jp-progress').css('width', 310 + 'px');
		}
	});
	jQuery(window).resize(function(){
		var vpWidth = jQuery('article .lb-audio').width();
		if ( vpWidth < 570 ) {
			jQuery('article .jp-controls-holder').css('width',vpWidth + 'px');
			var newWidth = vpWidth - 260;
			jQuery('article .jp-progress').css('width', newWidth + 'px'); 
		} else {
			jQuery('article .jp-controls-holder').css('width',570 + 'px');
			jQuery('article .jp-progress').css('width', 310 + 'px');
		}
	});

	
	// Fix background pattern
	var screenheight = $(window).height();
	$('#container').css('min-height', screenheight);

	$('.meta-like').click(function(){
		var $ct1 = $(this).next('.count');
		if ($ct1) {
			$ct1.html(Number($ct1.html()) + 1);
		}
	});

	// Menu click
	selectMenu();
	function selectMenu(){
		var url = window.location.href, index = 0;
		if (url.indexOf('index')>-1)
		{
			index = 0;
		} else if (url.indexOf('n_activity')>-1)
		{
			index = 1;
		} else if (url.indexOf('n_villageList')>-1)
		{
			index = 2;
		} else if (url.indexOf('aboutus')>-1)
		{
			index = 3;
		} else if (url === '#')
		{
			index = 4;
		}
		if ($('header ul#nav>li:eq('+index+')').hasClass('current'))
			return false;
		$('header ul#nav>li.current').removeClass('current');
		$('header ul#nav>li:eq('+index+')').addClass('current');
	}

	// Link of Me
	$('#me').click(function(){
		if ($('header ul#nav>li:last').hasClass('current'))
			return false;
		$('header ul#nav>li.current').removeClass('current');
		$('header ul#nav>li:last').addClass('current');
		// If unsign in
		var token = $.cookie('token');
		// 已登录时跳至个人主页
		if (token) window.location.href = 'me.sthml';
		// 未登录时跳至登录画面
		else window.location.href = 'login.html?from=me.shtml';
	});
});

