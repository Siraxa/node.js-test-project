const redis = require('redis');

class RedisDatabse
{
	constructor()
	{
		this.client = redis.createClient(); 
		this.client.on('error', function(error){
			throw new Error('Something went wrong ', error);
		});
		this.client.set('count', 0, 'NX'); 
		this.cacheCount = 0;
		this.lock = false;
		this.runningCacheSaver = false;
	}
	
	//private
	runCacheSaver(){
		if(!this.runningCacheSaver)
		{	
			var _this = this;
			this.runningCacheSaver = true;

			function saveCacheToDatabase(countToDatabase)
			{
				_this.client.get('count', function(error, result) {
					if (error) throw error;

					_this.client.set('count', parseInt(result)+countToDatabase, function(){
						_this.cacheCount -= countToDatabase;
						if(countToDatabase === 0)
							_this.runningCacheSaver = false;
						else
							saveCacheToDatabase(_this.cacheCount);
					}.bind(this));
				}.bind(this));
			}
			saveCacheToDatabase(this.cacheCount);
		}
	}
	
	addCount(count){
		if(typeof count !== 'number')
			throw new Error("Invalid input.");

		if(count !== 0){
			this.cacheCount += count;
			this.runCacheSaver();
		}
	}
	
	getCount(callback){
		if(typeof callback !== 'function') 
			throw new Error("Invalid input.");

		this.client.get('count', function(error, result) {
			if (error) throw error;
			return callback(parseInt(result) + this.cacheCount);
		}.bind(this));
	}
}

module.exports = RedisDatabse;