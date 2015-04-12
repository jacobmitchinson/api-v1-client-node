var expect = require('chai').expect;
var nock = require('nock');
var pushTX = require('../lib/pushtx');

describe('PushTX', function() { 

  var rootURL = 'https://blockchain.info/';
  var transaction = 'transaction'; 
  var json = {'success': 'true'};
  var apiCode = '1234';

  function mockEndPoint(url, queryString, response) { 
    nock(url)
      .get('/' + queryString)
      .reply(200, response);
  };

  it('should register a transaction', function(done) { 
    var payload = {
                    'tx': transaction, 
                    'api_code': apiCode
                  };
    var payload = encodeURIComponent(JSON.stringify(payload));
    mockEndPoint(rootURL, 'pushtx/' + payload, json);
    pushTX.pushtx(transaction, apiCode, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

});