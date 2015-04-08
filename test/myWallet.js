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
});
