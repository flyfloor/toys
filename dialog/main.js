$(document).ready(function(){
	$("#create_dialog").on("click", function(){
		Dialog({
			title:"",
			content: $('<section id="add_view">'+
									'<p>This document defines a mechanism to enable client-side cross-origin requests. Specifications that enable an API to make cross-origin requests to resources can use the algorithms defined by this specification. If such an API is used on http://example.org resources, a resource on http://hello-world.example can opt in using the mechanism described by this specification (e.g., specifying Access-Control-Allow-Origin: http://example.org as response header), which would allow that resource to be fetched cross-origin from http://example.org.'+
									'</p>'+
								'</section>'),
			blur:true,
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