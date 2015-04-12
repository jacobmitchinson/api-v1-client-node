var expect = require('chai').expect;
var nock = require('nock');
var Receive = require('../lib/Receive');

describe('Receive', function() { 

  var url = 'http://url.com';
  var rootURL = 'https://blockchain.info/';
  var address = '1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq'; 
  var json = {'success': 'true'};

  function generateReceive() { 
    var options = {
                    'apiCode': 1234,
                    'confirmations': 12
                  };
    var receive = new Receive(options, url);
    return receive;
  };

  function mockEndPoint(url, queryString, response) { 
    nock(url)
      .get('/' + queryString)
      .reply(200, response);
  };

  it('can initialize with an apiCode', function() { 
    var receive = generateReceive();
    expect(receive.apiCode).to.equal(1234);
  });

  it('can initialize with confirmations', function() { 
    var receive = generateReceive();
    expect(receive.confirmations).to.equal(12);
  });

  it('can initialize with a callback url', function() { 
    var url = 'http://url.com';
    var receive = generateReceive();
    expect(receive.callbackURL).to.equal(url);
  });

  it('can set confirmations', function() { 
    var receive = generateReceive(); 
    receive.setConfirmations(9);
    expect(receive.confirmations).to.equal(9);
  });

  it('cannot set the set confirmation lower than 0', function() { 
    var receive = generateReceive();
    receive.setConfirmations(-1);
    expect(receive.confirmations).to.equal(12);
  });

  it('can generate a receive address', function(done) { 
    var receive = generateReceive();
    url = encodeURIComponent(url);
    var format = encodeURIComponent('?format=json');
    mockEndPoint(rootURL, 'api/receive?method=create' + '&address=' + address + '&callback='
                            + url + format + '&api_code=' + 1234, json);
    receive.create(address, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

  it('can generate a receive address with parameters', function(done) { 
    var receive = generateReceive();
    var customParams = {
                        'param1': 'param1' 
                        };    
    url = encodeURIComponent(url);
    var format = encodeURIComponent('?format=json');
    var params = encodeURIComponent('&param1=' + customParams.param1);
    mockEndPoint(rootURL, 'api/receive?method=create' + '&address=' + address + '&callback='
                            + url + format + params + '&api_code=' + 1234, json);
    receive.create(address, customParams, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

  it('can listen for changes on the callbackURL');
});