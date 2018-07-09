const querystring = require('querystring');

function processPost(request, response, callback) 
{
	var queryData = "";
	if(typeof callback !== 'function') 
		return null;

	if(request.method == 'POST')
	{
		request.on('data', function(data)
		{
			queryData += data;
			if(queryData.length > 1e6) 
			{
				queryData = "";
				response.writeHead(413, {'Content-Type': 'text/plain'}).end();
				request.connection.destroy();
			}
		});
		request.on('end', function(){
			callback(querystring.parse(queryData));
		});
	} 
	else
	{
		response.writeHead(405, {'Content-Type': 'text/plain'});
		response.end();
	}
}

module.exports = processPost;