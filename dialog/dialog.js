$(document).ready(function(){
	$("body").append($('<div id="overlay"></div>'));
});

var Overlay = {
	appear: function(value){
		if (value) {
			$("#overlay").fadeIn(200);
		}
	},
	disappear: function(){
		$("#overlay").fadeOut(200);
	}
}

var Dialog = function(options){

	this.title = options.title || 'new dialog';
	this.content = options.content || '<p>dialog content</p>';
	this.blur = options.blur === false? false:true;
	this.yesText = options.yesText || "ok";
	this.noText = options.noText || "cancel";
	this.yesFunc = options.yesFunc;
	this.noFunc = options.noFunc;
	this.closeFunc = options.closeFunc;
	var that = this;

	this.removeDialog = function(element){
		element.parents(".dialog").fadeOut(200);
	}

	this.init = function(){
		var $wrapper = $("<div></div>").addClass("dialog-wrapper"),
			 	$dialog =  $('<div></div>').addClass("dialog"),
				$d_head = $('<div><button class="dialog-close">x</button></div>').addClass("dialog-head"),
				$d_body = $('<div></div>').addClass("dialog-body"),
				$d_foot = $('<div></div>').addClass("dialog-foot"),
				$titleElem = $('<span></span>').addClass("dialog-title");
		
		$titleElem.text(that.title)
							.appendTo($d_head);
		$(that.content).appendTo($d_body);

		if (that.yesFunc) {
			var $yesBtn = $('<button></button>').addClass("dialog-btn");
			$yesBtn.text(that.yesText)
						 .appendTo($d_foot);

			$yesBtn.on("click", function(){
				yesFunc();
				removeDialog($(this));
				Overlay.disappear();
			});
		}

		if (that.noFunc) {
			var $noBtn = $('<button></button>').addClass("dialog-btn cancel");
			$noBtn.text(that.noText)
						.appendTo($d_foot);

			$noBtn.on("click", function(){
				noFunc();
				removeDialog($(this));
				Overlay.disappear();
			});
		}
	
		
		$dialog.append($d_head, $d_body, $d_foot).appendTo($wrapper);

		Overlay.appear(that.blur);
		$("body").append($wrapper);

		$(".dialog-close").on("click", function(){
			removeDialog($(this));
			Overlay.disappear();
			if (that.closeFunc) {
				closeFunc();
			}
		});

	}

	that.init();

}