window.myCallback = function(data){
	console.log(data);
}

$(document).ready(function(){

	$("button").on("click", function(){
		$.ajax({
			url: "http://127.0.0.1:4000/fetch",
			method: "GET",
			dataType: "jsonp",
			crossDomain: true,
			success: function(data){
				console.log(data);
			},
			error: function(xhr, status, error){
				console.log(error);
			}
		});

	});
});

