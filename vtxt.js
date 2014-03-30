// An attemped at rebuilding the voting system for vtxt
net = require('net');
require('array.prototype.findindex');

var sockets = [];
var incomingData = [];

var s = net.Server(function(socket) {
	sockets.push(socket);
	console.log(socket);

// When data is sent via a socket
	socket.on('data', function(d) {	

		// Increment the value for the data
		var count = increment(d);

		// Iterate over each socket and write the results
		for (var i = 0; i < sockets.length; i++) {
			sockets[i].write("Count is " + count + " for " + d);
		}
	});

// Removes from array on end 
	socket.on('end', function() {
		var i = sockets.indexOf(socket);
		delete sockets[i];
	})
});

function increment(d) {
	var i = incomingData.findIndex(function(element) {
		return (element.data.toString() == d.toString());
	});

	console.log(d);

	if (i == -1) {
		incomingData.push({data: d, count:1});
		return "1";
	} else {
		incomingData[i].count++;
		return incomingData[i].count.toString();
	}
}

s.listen(8000);