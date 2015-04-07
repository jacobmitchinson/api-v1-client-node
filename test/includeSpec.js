var expect  = require('chai').expect;
var nock    = require('nock');
var include = require('../lib/include.js');
var appendToURL = include.appendToURL;
var makeRequest = include.makeRequest;

describe('include', function() { 

  var url = 'https://blockchain.info/';
  var json = {
              "hash":"00000000000000",
              "time":1428398380,
              "block_index":829202,
              "height":351097,
              "txIndexes":[82937058,82937904]
              }
  var correcRequest = nock(url)
                        .get('/')
                        .reply(200, json);

  it('should return an empty string if there is no value to append', function() { 
    var url = appendToURL('api_code');
    expect(url).to.equal('');
  });

  it('should create the correct query string', function() { 
    var query = appendToURL('api_code', '12345');
    expect(query).to.equal('&api_code=12345');
  });

  it('should return the correct data for the request', function(done) { 
    makeRequest(url, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

  it('should return an error if the request cannot be handled', function(done) { 
    makeRequest('http://idontexist.com', function(err, data) { 
      expect(err).to.be.ok;
      done();
    });
  });

});