$(document).ready(function(){
	var $input = $("#automatch");

	var loadData = function(){
		var	inputStr = $input.val(),
			 	$list = $("ul#hints");				

		if (inputStr) {			
			$.ajax({
				url: "http://127.0.0.1:4000/fetch?q="+ inputStr,
				method: "GET",
				dataType: "jsonp",
				crossDomain: true,
				success: function(data){
					$list.find("li").remove();
					for(var i = 0; i < data.length; i++ ){
						var $item = $("<li></li>").addClass("hint-item");
						$item.text(data[i].name);
						$item.appendTo($list);
					}
				},
				error: function(xhr, status, error){
					console.log(error);
				}
			}).done(function(){
				if ($list.has("li").length) {
					$list.removeClass("noItem");
				}else{
					$list.addClass("noItem");
				}
			});
		}
	};

	$input.on("keyup", function(){
		loadData();
	}).on("change", function(){
		console.log($input);
		loadData();
	});

	$(document).on("click", ".hint-item", function(){
		$input.val($(this).text());
	});

});

