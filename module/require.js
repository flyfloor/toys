window.onload = function(){
	var prevImg = document.getElementById("previous_image"),
			nextImg = document.getElementById("next_image");
			var marquee = new	Marquee("image_scroll_display", "original_display", "clone_display");
			prevImg.onclick = function(){
				marquee.scrollLeft(1000);
			};
				
};

var Animation = {
	easeIn: function(width, time, hSpeed){
		
		 
	},
	liner: function(){

	}
};
	
var Marquee = function(container, original, clone){
	var container = document.getElementById(container),
			original = document.getElementById(original),
			clone =  document.getElementById(clone);
			clone.innerHTML = original.innerHTML;
	// var rolling = function(){
 //    if(container.scrollLeft == clone.offsetLeft){
 //      container.scrollLeft = 0;
 //    }else{
 //    	container.scrollLeft++;
 //    }
 //  }
 // 	var timer = setInterval(rolling, 20);
 // 	container.onmouseover = function(){clearInterval(timer)};
 // 	container.onmouseout = function(){timer = setInterval(rolling, 20)};

  return{
  	scrollLeft: function(width){
  		var width = width||1000;
  		if(container.scrollLeft == clone.offsetLeft){
  			container.scrollLeft = 0;
  		}else{
  			setInterval(function(){
  				if (container.scrollLeft < width) {
  					container.scrollLeft += 100;
  				};
  			},20);
  			// container.scrollLeft += width;
  		}
  	},
  	scrollRight: function(){

  	}
  }
}