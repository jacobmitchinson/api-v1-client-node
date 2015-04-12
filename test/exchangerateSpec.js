var expect = require('chai').expect;
var nock = require('nock');
var exchangeRates = require('../lib/exchangerates');

describe('Exchange rates', function() { 

  var rootUrl = 'https://blockchain.info/'; 
  var json = {'success': 'true'};

  function mockEndPoint(url, queryString, response) { 
    nock(url)
      .get('/' + queryString)
      .reply(200, response);
  };

  it('should get the latest exchange rates', function(done) { 
    mockEndPoint(rootUrl, 'ticker', json);
    exchangeRates.getTicker(function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

});