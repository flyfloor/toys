var querystring = require("querystring");
var url = require("url");

//data
var data = ["Anna","Brittany","Cinderella","Diana","Eva","Fiona","Gunda","Hege","Inga","Johanna","Kitty","Linda","Nina","Ophelia","Petunia","Amanda","Raquel","Cindy","Doris","Eve","Evita","Sunniva","Tove","Unni","Violet","Liza","Elizabeth","Ellen","Wenche","Vicky"];

var Format = {
	lowercase: function(str){
		return str.toString().trim().toLowerCase();
	},
	split: function(spliter, str){
		return str.toString().trim().split(spliter);
	}
}

function fetchData(request, response){
  var resData = [],
  		reqQuery = querystring.parse(url.parse(request.url).query),
  		reqStr = Format.lowercase(reqQuery.q);

	if (reqStr) {
		for(var i in data){
			if (Format.lowercase(data[i]).match(reqStr) !== null) {
				resData.push({name:data[i]});
			}
		}
	}

	response.writeHead(200, {"Content-Type": "application/json"}); 
  response.end(reqQuery.callback +"(" + JSON.stringify(resData) + ")");

}

exports.fetch = fetchData;