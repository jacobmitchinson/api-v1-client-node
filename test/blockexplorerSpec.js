var expect        = require('chai').expect;
var nock          = require('nock');
var blockExplorer = require('../lib/blockexplorer');

describe('blockExplorer', function() { 

  var blockID = '000000000';
  var apiCode = '1234';
  var apiQuery = '&api_code=' + apiCode;
  var height  = '1234';
  var txId    = 'tr4n64ct1on';
  var rootURL = 'https://blockchain.info/';
  var json = {'success': 'true'}

  function mockEndPoint(url, queryString) { 
    nock(url)
      .get('/' + queryString)
      .reply(200, json);
  };

  it('should get a block', function(done) { 
    mockEndPoint(rootURL + 'rawblock/', blockID 
                  + '?a=1' + apiQuery);
    blockExplorer.getBlock(blockID, apiCode, function(err, data) { 
      expect(data).to.eql(json);
      done();
    })
  });

  it('should get a transaction', function(done) { 
    mockEndPoint(rootURL + 'rawtx/', txId + '?a=1' 
                  + apiQuery);
    blockExplorer.getTx(txId, apiCode, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

  it('should get block height', function(done) { 
    mockEndPoint(rootURL + 'block-height/', height 
                  + '?format=json' + apiQuery);
    blockExplorer.getBlockHeight(height, apiCode, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });



}); 