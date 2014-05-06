var data = ["Anna","Brittany","Cinderella","Diana","Eva","Fiona","Gunda","Hege","Inga","Johanna","Kitty","Linda","Nina","Ophelia","Petunia","Amanda","Raquel","Cindy","Doris","Eve","Evita","Sunniva","Tove","Unni","Violet","Liza","Elizabeth","Ellen","Wenche","Vicky"];

function fetchData(request, response){

	var resData = [
		{name: data[0]},
		{name: data[1]},
		{name: data[2]},
		{name: data[3]},
		{name: data[4]},
		{name: data[5]},
		{name: data[6]},
		{name: data[7]},
		{name: data[8]},
		{name: data[9]},
		{name: data[10]},
		{name: data[11]},
		{name: data[12]},
		{name: data[13]},
		{name: data[14]}
	];

	// console.log(resData);

	response.writeHead(200, {"Content-Type": "application/json"}); 

  // response.write(resData);
  response.end(request.callback + JSON.stringify(resData));
}

exports.fetch = fetchData;