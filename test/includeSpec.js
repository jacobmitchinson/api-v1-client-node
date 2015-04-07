var expect = require('chai').expect;
var include = require('../lib/include.js');

describe('include', function() { 

  var root = 'https://blockchain.info/';

  it('should return an empty string if there is no value to append', function() { 
    var url = include.appendToURL('api_code');
    expect(url).to.equal('');
  });

  it('should append the correct query string to the url', function() { 
    var query = include.appendToURL('api_code', '12345');
    expect(query).to.equal('&api_code=12345');
  });


});