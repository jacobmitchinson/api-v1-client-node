var expect = require('chai').expect;
var include = require('../lib/include.js');

describe('include', function() { 

  it('should return an empty string if there is no value to append', function() { 
    var url = include.appendToURL('api_code');
    expect(url).to.equal('');
  });


});