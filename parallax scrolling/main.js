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

	window.onmousewheel = function mouseWheel(event){
		event.preventDefault();
		console.log();
		setTimeout(function(){
			if (event.wheelDelta < 0) {
				$("body, html").stop().animate({scrollTop: '+=800'}, "slow");
			}else{
				$("body, html").stop().animate({scrollTop: '-=800'}, "slow");
			}
		},400);
		return false;
	};


	

	var $badge = $("#badge");

	$(window).scroll(function(){
		var topHeight = $(window).scrollTop();
		
		//animtations
		if (topHeight >= 300 & topHeight <= 900) {
			Ned.appear();
			$badge.stop().animate({top: "70px", left: "120px"}, 1000);
		}else{
			Ned.disappear();
			if(topHeight > 900 & topHeight <= 1800){
				Robb.appear();
				$badge.stop().animate({top: "250px", left: "1100px"}, 1000);
			}else if (topHeight > 1800) {
				Robb.disappear();
			}	
		}

		if (topHeight < 300 || topHeight > 1800) {
			$badge.stop().animate({opacity: 0});
		}

	});
});

