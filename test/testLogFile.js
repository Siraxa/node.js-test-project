var expect = require('chai').expect;

var LogFile = require('../LogFile');
var fs = require('fs');

describe('LogFile', function () {
    describe('.constructor()', function () {
		it('should accept a strict file name (test.txt)', function () {
            expect( new LogFile('test.txt') ).to.be.an.instanceof(LogFile);
        });
		
		it('should create file test.txt', function () {
			expect(fs.readFileSync('test.txt').toString()).to.equal('');
			fs.unlinkSync('test.txt');
		}); 
 
        it('should accept empty file name', function () {
            expect( new LogFile() ).to.be.an.instanceof(LogFile);
        });
		
		it('should create file with default name log.txt', function () {
			expect(fs.readFileSync('log.txt').toString()).to.equal('');
		}); 
 
        it('should not accept number as file name', function () {
			expect(function () { new LogFile(2.0) }).to.throw()
		});

		it('should not accept plain text as file name', function () {
			expect(function () { new LogFile('test') }).to.throw()
		});
	
		it('should not accept special characters in file name', function () {
			expect(function () { new LogFile('test#.txt') }).to.throw()
		});  
    });
	
	describe('.addData()', function () {
	
	    it('should accept JSON', function () {
			expect(function () { 
				var logFile = new LogFile();
				logFile.addData({'foo': 'bar'}); 
			}).to.not.throw()
		});
		
		it('should be ({"foo": "bar"}) content in log.txt', function () {
			expect(fs.readFileSync('log.txt').toString()).to.equal("{\"foo\":\"bar\"}");
			fs.unlinkSync('log.txt');
		});	
	});
});