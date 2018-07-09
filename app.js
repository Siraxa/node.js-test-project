const http = require('http');

const LogFile = require('./LogFile');
const RedisDatabse = require('./RedisDatabse');
const processPost = require('./processPost');

const onRequest = (request, response) => {
	if(request.method.toUpperCase() == 'POST')
	{
		if(request.url == '/track')
		{
			processPost(request, response, function(data){
				log.addData(data);
				if ("count" in data){
					database.addCount(parseInt(data.count));
				}
				response.end('received POST request.');
				response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
				response.end();
			});
		}
	}
	else if(request.method.toUpperCase() == 'GET')
	{
		if(request.url.match('^[^?]*')[0] == '/count')
		{
			database.getCount(function(count){
				response.end('count: ' + count)
				console.log("count: "+count);
			});
		}
	}
}

const log = new LogFile('log.txt');
const database = new RedisDatabse();

const port = 8000;
const server = http.createServer(onRequest);

server.listen(port, (err) => {
	if (err) 
	{
	return console.log('something bad happened', err)
	}
	console.log('Server is listening on port: ' + port);
});