var querystring = require("querystring");
var url = require("url");

var data = ["Anna","Brittany","Cinderella","Diana","Eva","Fiona","Gunda","Hege","Inga","Johanna","Kitty","Linda","Nina","Ophelia","Petunia","Amanda","Raquel","Cindy","Doris","Eve","Evita","Sunniva","Tove","Unni","Violet","Liza","Elizabeth","Ellen","Wenche","Vicky"];

function fetchData(request, response){
  var resData = [],
  		reqQuery = querystring.parse(url.parse(request.url).query),
  		reqStr = reqQuery.q.toLowerCase();

	if (reqStr) {
		for (var i in data) {
			if (data[i].toString().toLowerCase().match(reqStr) !== null) {
				resData.push({name:data[i]});
			};
		};
	};

	response.writeHead(200, {"Content-Type": "application/json"}); 
  response.end(reqQuery.callback +"(" + JSON.stringify(resData) + ")");

}

exports.fetch = fetchData;