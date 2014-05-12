$(document).ready(function(){
	$("#create_dialog").on("click", function(){
		Dialog({
			title:"",
			content: "",
			blur:false,
			yesFunc: function(){
				alert("yes button handle");
			},
			noFunc: function(){
				alert("no button handle");
			}
		});
	});

	$("ul").find("li").on("click", function(){
		$(this).addClass("active")
					 .siblings("li").removeClass("active");

		switch($("li").index($(this))){
			case 0:
				$("#JQ").css("display", "block");
				$("#HTML").css("display", "none");
				break;
			case 1:
				$("#JQ").css("display", "none");
				$("#HTML").css("display", "block");
				break;
			default:
				break;
		}

	});

});