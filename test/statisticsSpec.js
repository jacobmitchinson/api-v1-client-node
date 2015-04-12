var expect = require('chai').expect;
var nock = require('nock');
var statistics = require('../lib/statistics');

describe('PushTX', function() { 

  var rootURL = 'https://blockchain.info/';
  var transaction = 'transaction'; 
  var json = {
              "n_btc_mined": 780000000000
              }
  var chart = {
                "values" : [
                  {
                    "x" : 1290602498, //Unix timestamp
                    "y" : 1309696.2116000003
                  }]
              }
  var apiCode = '1234';

  function mockEndPoint(url, queryString, response) { 
    nock(url)
      .get('/' + queryString)
      .reply(200, response);
  };

  it('should get stats', function(done) { 
    mockEndPoint(rootURL, 'stats?format=json', json);
    statistics.get(function(err, data) { 
      expect(data).to.eql(json);
      done();
    });
  });

  it('should get a specific stat', function(done) { 
    mockEndPoint(rootURL, 'stats?format=json', json);
    var options = { 
                    stat: "n_btc_mined"
                  }
    statistics.get(options, function(err, data) { 
      expect(data).to.equal(780000000000);
      done();
    });
  }); 

  it('should get chart data', function() { 
    var chartType = "total-bitcoin";
    mockEndPoint(rootURL, 'charts/' + chartType + '?format=json', chart);
    statistics.getChartData(chartType, function(err, done) { 
      expect(chart).to.eql(chart);
      done();
    });
  });

  it('should get chart data with domain');
});

