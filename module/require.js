window.onload = function(){
	var prevImg = document.getElementById("previous_image"),
			nextImg = document.getElementById("next_image");
	var marquee = new	Marquee("image_scroll_display", "original_display", "clone_display");
	var lastImg = document.getElementById("clone_display"),
			contentEnd = document.getElementById("image_scroll_display").style.offsetLeft;
			prevImg.onclick = function(){
				marquee.rollingLeft(2000);
				return false;
			};
			// nextImg.onclick = function() {
			// 	marquee.rollingRight(2000);
			// };
				
};

var Animation = {
	easeIn: function(width){
		var speed;
		// speed = 800 * width - width*width;
		return speed;
	},
	liner: function(){

	}
};
	
var Marquee = function(container, original, clone){
	var container = document.getElementById(container),
			original = document.getElementById(original),
			clone =  document.getElementById(clone);
			clone.innerHTML = original.innerHTML;
	var goLeft = function(){
    if(container.scrollLeft == clone.offsetLeft){
      container.scrollLeft = 0;
    }else{
    	container.scrollLeft+=10;
    }
  }
 	// var timer = setInterval(rolling, 20);
 	// container.onmouseover = function(){clearInterval(timer)};
 	// container.onmouseout = function(){timer = setInterval(rolling, 20)};

  return{
  	rollingLeft: function(){
  		var timer = setInterval(goLeft, 20);
  	},
  	rollingRight: function(width){
  		var width = width||600;
  		if(container.scrollLeft == clone.offsetLeft){
  			container.scrollLeft = 0;
  		}else{
  			setInterval(function(){

  				// if (container.scrollLeft > width) {
  					// for(var i=0; i < width; i++){
							// container.scrollLeft += Animation.easeIn(i);
							// console.log(container.scrollLeft);
  					// }
  					container.scrollLeft --;
  				// }
  			},100);
  		}
  	}
  }
}