window.onload = function(){
	//Marquee
	// var marquee = new	Marquee("image_display", "original_display", "clone_display");

	//Scrolling
	var scrollDisplay = new ScrollDisplay($("#previous_image"), $("#next_image"), $("#display_content"), 1000);
				
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

// var ScrollDisplay = function(prev, next, scrollView, displayWidth){
// 	var width = 0;
// 	var isEnd = function(){
// 		if ( + displayWidth <= scrollArea.offsetWidth) {
// 			return false;
// 		}else{
// 			return true;
// 		}
// 	};
// 	// scrollArea.setAttribute("style", "margin-left:" + Value.toString() + "px");
// 	prev.on("click", function(){
// 		var offset = $(scrollView).css("margin-left").replace("px","");
// 		console.log(offset-width);
// 		$(scrollView).css("margin-left", offset - width);
// 		// scrollArea.style.cssText = "margin-left:30px;"
// 		// if (!isEnd()) {
// 		// 	$(id).animate("margin-left", )
// 		// console.log(offset);
// 		// }
// 	});
// 	next.on("click", function(){
// 		if (!isEnd()) {
// 			offset += width;
// 		}
// 	});

// };

// var ScrollDisplay = {
// 	isEnd : function(scrollView, displayWidth){
// 		if (scrollView.css("margin-left").replace("px")) {};
// 	}
// };



