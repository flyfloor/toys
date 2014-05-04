var Ned = {
	appear: function(){
		$("#ned").stop().find("img").fadeIn(1000);
	},
	disappear: function(){
		$("#ned").stop().find("img").fadeOut(1000);
	}
}

var Robb = {
	appear: function(){
		$("#robb").find(".info").stop().animate({left: "700px", opacity:1}, 800);
	},
	disappear: function(){
		$("#robb").find(".info").stop().animate({left: "1200px",opacity:0}, 800);
	}
};

$(document).ready(function(){
	var fullHeight = $(document).scrollHeight;

	window.onmousewheel = function(event){
		event.preventDefault();
		if (event.wheelDelta < 0) {
			$("body, html").stop().animate({scrollTop: '+=800'}, "slow");
		}else{
			$("body, html").stop().animate({scrollTop: '-=800'}, "slow");
		}
		return false;
	};

	

	var $badge = $("#badge");

	$(window).scroll(function(){
		var topHeight = $(window).scrollTop();
		
		//badge
		if (topHeight >= 500 & topHeight <= 800 ) {
			$badge.stop().animate({top: "80px", left: "120px"}, 1000);
		}else if(topHeight > 800 & topHeight <= 1800){
			$badge.stop().animate({top: "250px", left: "1100px"}, 1000);
		}else{
			$badge.stop().animate({opacity: 0});
		}

		//
		if (topHeight > 0 & topHeight < 1000) {
			Ned.appear();
		}else{
			Ned.disappear();
			if (topHeight < 2000) {
				Robb.appear();
			}else{
				Robb.disappear();
			}	
		}
	});
});

