const fs = require('fs');

class LogFile 
{
	constructor(fileName = "log.txt") 
	{			
		var validFilename = /^[a-z0-9_.@()-]+\.[^.]+$/i.test(fileName);
		if(!validFilename || typeof(fileName) !== 'string')
			throw new Error("File name is not valid.");

		this.stream = fs.createWriteStream(fileName, {flags: 'a'});
		this.stream.on('error', function(error) {
			throw new Error("Something went wrong."+ error);
		});
	}
	addData(data)
	{
		this.stream.write(JSON.stringify(data));
	}
}

module.exports = LogFile;