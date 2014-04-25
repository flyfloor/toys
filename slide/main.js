window.onload = function(){
	//Marquee
	// var marquee = new	Marquee("image_display", "original_display", "clone_display");

	//Scrolling
	var scroll_display = new ScrollDisplay($("#previous_image"), $("#next_image"), $("#original_display"), 1000, 3);
				
};

// choice one Marquee	
// var Marquee = function(container, original, clone){
// 	var container = document.getElementById(container),
// 			original = document.getElementById(original),
// 			clone =  document.getElementById(clone);
// 			clone.innerHTML = original.innerHTML;
// 	var rolling = function(){
//     if(container.scrollLeft == clone.offsetLeft){
//       container.scrollLeft = 0;
//     }else{
//     	container.scrollLeft++;
//     }
//   }
//  var timer = setInterval(rolling, 20);
//  container.onmouseover = function(){clearInterval(timer)};
//  container.onmouseout = function(){timer = setInterval(rolling, 20)};
//}

// Choice Two scroll

var ScrollDisplay = function(prev, next, scroll_view, display_width, page_count){
	var page = 1,
			least_width = scroll_view.width() % display_width;

	var navi_status = {
		navi: function(id){
			if (id.hasClass("disabled")) {
				id.removeClass("disabled");
			}
		},
		disable: function(id){
			id.addClass("disabled");
		}
	}

	prev.on("click", function(){
		if (page !== page_count) {
			if (page === page_count -1 ) {
				scroll_view.stop().animate({"left" : '-='+ least_width}, 'slow');
			}else{
				scroll_view.stop().animate({"left" : '-='+display_width}, 'slow');
			}
			page++;
			navi_status.navi(prev);
		}
	});
	next.on("click", function(){
		if (page !== 1) {
			if (page === 2) {
				scroll_view.stop().animate({"left" : 0}, 'slow');
			}else{
				scroll_view.stop().animate({"left" : '+='+display_width}, 'slow');
			}
			page--;
			navi_status.navi(prev);
		}
	});

};




