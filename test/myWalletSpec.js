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
  var to = '1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq';
  var from = '1LRDHxrFcHNusQ2pWveKoMt7ryQc3gQv5t';

  function mockEndPoint(url, queryString) { 
    nock(url)
      .get('/' + queryString)
      .reply(200, json);
  };

  // need to refactor tests to DRY out code

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
                    'to': to,
                    'from': from,
                    'fee': 20000,
                    'note': 'heythere'
                  }
    mockEndPoint(rootUrl, 'merchant/' + guid + '/payment?password=' + pass 
                + '&second_password=' + pass2 + '&address=' + to 
                + '&amount=' + options.amount + '&from=' + from
                + '&fee=' + options.fee + '&note=' + options.note);
    wallet.send(options, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

  it('can send btc', function(done) { 
    var options = { 
                    'amount': 3,
                    'inBTC': true,
                    'to': to, 
                    'from': from,
                    'fee': 0.0002,
                    'note': 'heythere'
                  }
    var fee = options.fee * SATOSHI_PER_BTC;
    var satoshi = options.amount * SATOSHI_PER_BTC;
    mockEndPoint(rootUrl, 'merchant/' + guid + '/payment?password=' + pass 
                  + '&second_password=' + pass2 + '&address=' + to 
                  + '&amount=' + satoshi + '&from=' + from
                  + '&fee=' + fee + '&note=' + options.note);
    wallet.send(options, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

  it('can send to many addresses in satoshi', function(done) { 
    var options = { 'from': from,
                    'fee': 20000,
                    'note': 'heythere' 
                  }
    var recipients = { 
                        "1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq": 397899,
                        "15mSKoziUNLv28ZAHggdgo11vER3GgNCgH": 397899
                      }
    mockEndPoint(rootUrl, 'merchant/' + guid + '/sendmany?password=' + pass
                  + '&second_password=' + pass2 + '&recipients=' + '%7B%221A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq%22%3A39789'
                  + '9%2C%2215mSKoziUNLv28ZAHggdgo11vER3GgNCgH%22%3A397899%7D' + '&from=' + from
                  + '&fee=' + options.fee + '&note=' + options.note);

    wallet.sendMany(options, recipients, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

  it('can send to many addresses in btc', function(done) { 
    var options = { 'from': from,
                    'fee': 0.0002,
                    'note': 'heythere',
                    'inBTC': true
                  }
    var recipients = { 
                        "1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq": 1,
                        "15mSKoziUNLv28ZAHggdgo11vER3GgNCgH": 1
                      }
    mockEndPoint(rootUrl, 'merchant/' + guid + '/sendmany?password=' + pass
                  + '&second_password=' + pass2 + '&recipients=' + '%7B%221A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq%22%3A100000000'
                  + '%2C%2215mSKoziUNLv28ZAHggdgo11vER3GgNCgH%22%3A100000000%7D' + '&from=' + from
                  + '&fee=' + options.fee + '&note=' + options.note);
    wallet.sendMany(options, recipients, function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });
 
});
