$(document).ready(function(){
	$("#create_dialog").on("click", function(){
		Dialog({
			title:"",
			content: "",
			yesFunc: function(){
				alert("yes button handle");
			},
			noFunc: function(){
				alert("no button handle");
			}
		});
	});

});