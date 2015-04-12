var expect = require('chai').expect;
var nock = require('nock');
var createWallet = require('../lib/CreateWallet');

describe('CreateWallet', function() { 

  var json = {'success': 'true'};
  var rootURL = 'https://blockchain.info/';
  var apiCode = 1234;
  var apiQuery = '&api_code=' + apiCode;
  var password = 'password';
  var options = {
                  'privateKey': 'ultrastrongkey',
                  'label': 'label',
                  'email': 'test@test.com'
                }

  function mockEndPoint(url, queryString) { 
    nock(url)
      .get('/' + queryString)
      .reply(200, json);
  };

  it('should send a request to create a wallet', function(done) {  
    var wallet = new createWallet(password, apiCode, options);
    mockEndPoint(rootURL, 'api/v2/create_wallet?password='
                  + password + apiQuery + '&priv=' + options.privateKey
                  + '&label=' + options.label + '&email=' + options.email)
    wallet.create(function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

  it('should open a wallet');
});