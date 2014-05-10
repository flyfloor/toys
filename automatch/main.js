$(document).ready(function(){

	var $input = $("#automatch"),
			$list = $("ul#hints"),
			$hintsBoard = $("#hints-board");

	$input.focus();

	var highLight = function(value, str){
		value = value.toString();

		return str.replace(value, '<span class="highLight">'+value +'</span>');
	};


	var HintList = {
		appear: function(element, data){
			element.find("li").remove();
			for(var i = 0; i < data.length; i++ ){
				var $item = $('<li><a href="javascript:void(0);"></a></li>').addClass("hint-item");
				$item.children("a").html(highLight($input.val(), data[i].name));
				$item.appendTo(element);
			}
		},

		disappear: function(element){
			element.find("li").remove();
			element.fadeOut(0);
		},

		nextVal: function(element){
			element.removeClass("selected").next().addClass("selected");
			return this.textVal(element.next());
		},

		prevVal: function(element){
			element.removeClass("selected").prev().addClass("selected");
			return this.textVal(element.prev());
		},

		textVal: function(element){
			return element.children("a").text();
		}

	};

	var loadData = function(){
		var	inputStr = $input.val();			 					

		if (inputStr) {			
			$.ajax({
				url: "http://127.0.0.1:4000/fetch?q="+ inputStr,
				method: "GET",
				dataType: "jsonp",
				crossDomain: true,
				success: function(data){
					HintList.appear($list, data);
				},
				error: function(xhr, status, error){
					console.log(error);
				}
			}).done(function(){
				if ($list.has("li").length) {
					$list.fadeIn(200);
				}else{
					$list.fadeOut(200);
				}
			});
		}
	};


	//handle events
	$input.on("keyup", function(event){
		var keyCode = event.keyCode;
		if (keyCode !== 40 && keyCode !== 38) {
			loadData();
		}
	});

	$hintsBoard.on("keyup", function(event){
		var displayText,
				keyCode = event.keyCode,
				$selectItem = $list.find("li.selected");

		switch(keyCode){
			case 40:
				if ($selectItem.length) {
					$input.val(HintList.nextVal($selectItem));
				}else{
					var $firstItem = $list.find("li:first");
					$firstItem.addClass("selected");
					$input.val(HintList.textVal($firstItem));
				}
				break;

			case 38:
				if ($selectItem.length) {
					$input.val(HintList.prevVal($selectItem));
				}
				break;

			default:
				break;
		}


	});

	$(document).on("click", ".hint-item", function(){
		$input.val(HintList.textVal($(this)));
		HintList.disappear($list);
	});

	$input.on("blur", function(event){
		setTimeout(function(){
			HintList.disappear($list);			
		}, 200);
	});
	

});

