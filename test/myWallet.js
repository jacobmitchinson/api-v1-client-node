var expect = require('chai').expect;
var nock = require('nock');
var Wallet = require('../lib/MyWallet');

describe('Wallet', function() {

  var guid = 'guid';
  var pass = 'pass1';
  var pass2 = 'pass2';
  var wallet  = new Wallet(guid, pass, pass2);
  var rootUrl = 'https://blockchain.info/'; 
  var json = {'success': 'true'};
  var SATOSHI_PER_BTC = 100000000;
  var BTC_PER_SATOSHI = 0.00000001;

  function mockEndPoint(url, queryString) { 
    nock(url)
      .get('/' + queryString)
      .reply(200, json);
  };

  it('can initialize with a guid', function() { 
    expect(wallet.guid).to.equal('guid');
  });

  it('can initialize with a password', function() { 
    expect(wallet.pass).to.equal('pass1');    
  });

  it('can initialize with a second password', function() { 
    expect(wallet.pass2).to.equal('pass2'); 
  }); 

  it('can send satoshi', function(done) { 
    var options = { 
                    'amount': 397899,
                    'to': '1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq'
                  }
    mockEndPoint(rootUrl, 'merchant/' + guid + '/payment?password=' + pass 
                + '&second_password=' + pass2 + '&address=' + options.to 
                + '&amount=' + options.amount);
    wallet.send(options, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

  it('can send btc', function(done) { 
    var options = { 
                    'amount': 3,
                    'inBTC': true,
                    'to': '1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq'
                  }
    var satoshi = options.amount * SATOSHI_PER_BTC;
    mockEndPoint(rootUrl, 'merchant/' + guid + '/payment?password=' + pass 
            + '&second_password=' + pass2 + '&address=' + options.to 
            + '&amount=' + satoshi);
    wallet.send(options, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });
});
