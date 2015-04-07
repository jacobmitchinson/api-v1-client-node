var expect        = require('chai').expect;
var nock          = require('nock');
var blockExplorer = require('../lib/blockexplorer');

describe('blockExplorer', function() { 

  var blockID = '000000000';
  var apiCode = '1234';
  var apiQuery = '&api_code=' + apiCode;
  var height  = '1234';
  var txId    = 'tr4n64ct1on';
  var address = "1AJbsFZ";
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

  it('should get address', function(done) { 
    var limit = 1; 
    var offset = 2;
    var options = { 'limit': limit,
                    'offset': offset,
                    'apiCode': apiCode
                  }
    mockEndPoint(rootURL + 'address/', address + '?format=json' + '&limit=' + limit 
                  + '&offset=' + offset + apiQuery);
    blockExplorer.getAddress(options, address, function(err, data) {
      expect(data).to.eql(json);
      done();
    });
  });

  it('should get multiple addresses', function(done) {
    multiAddress = ['address1', 'address2'];
    mockEndPoint(rootURL, 'multiaddr?active=' 
                  + multiAddress[0] + '%7C' + multiAddress[1] + apiQuery);
    blockExplorer.getMultiAddress(multiAddress, apiCode, function(err, data) {
      expect(data).to.eql(json);
      done();
    });
  });

  it('should get unspent outputs', function(done) { 
    var unspent = ['unspent1', 'unspent2'];
    mockEndPoint(rootURL, 'unspent?active=' 
                  + unspent[0] + '%7C' + unspent[1] + apiQuery);
    blockExplorer.getUnspentOutputs(unspent, apiCode, function(err, data) { 
      expect(data).to.eql(json);
      done();
    }); 
  });

  it('should get latest block', function(done) { 
    mockEndPoint(rootURL, 'latestblock?a=1' + apiQuery);
    blockExplorer.getLatestBlock(apiCode, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

  it('should get unconfirmed transactions', function(done) { 
    mockEndPoint(rootURL, 'unconfirmed-transactions?format=json' + apiQuery);
    blockExplorer.getUnconfirmedTx(apiCode, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });
}); 