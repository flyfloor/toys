var server = require("./server"),
		router = require("./router"),
		requestHandlers = require("./requestHandlers");

var handle = {};
handle["/fetch"] = requestHandlers.fetch;

server.start(router.route, handle);
