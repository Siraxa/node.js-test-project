var expect = require('chai').expect;

var RedisDatabse = require('../RedisDatabse');

describe('RedisDatabse', function () {
	
	var database = new RedisDatabse();
	var numberToAdd = 457;
	database.client.set('count', 0); 

    describe('.constructor()', function () {
		it('should create connection', function () {
            expect( database ).to.be.an.instanceof(RedisDatabse);
        });
    });
	
	describe('.addCount()', function () {
		it('should accept only number', function () {	
			expect(function(){database.addCount('foo');}).to.throw();
		});	
		
		it('should add number', function () {	
			expect(function(){database.addCount(numberToAdd);}).to.not.throw();
		});	
	});

	describe('.getCount()', function () {
	
		it('should get correct value', function(done){
			database.getCount(function(data) { 
				expect(data).to.eql(numberToAdd);
				done();
			});
		});
		
		it('data should be in RedisDatabase immediately', function () {	
			setTimeout(function() {
				database.client.get('count', function(error, result) {
					expect(parseInt(result)).to.eql(numberToAdd);
					done();
				});
			}, 10);
		});	
	});
});