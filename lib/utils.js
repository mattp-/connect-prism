'use strict';

var crypto = require('crypto');
var path = require('path');

function hash(blob) {
  var shasum = crypto.createHash('sha1');
  shasum.update(blob);
  return shasum.digest('hex');
}

module.exports = {
  getMockPath: function(proxy, req) {

    // maintain string as second param for backcompat
    var url;
    if (typeof req === 'string') {
      url = req;
    }
    else {
      url = req.url ? req.url : req.path;
      url = url ? url : '';

      console.log(req);
      if (req.body) {
        url += req.body;
      }
    }

    var hashed = hash(url);
    return path.join(proxy.config.mocksPath, proxy.config.name, hashed + '.json');
  },
  absoluteUrl: function(proxy, url) {
    return (proxy.config.https ? 'https://' : 'http://') + proxy.config.host + ':' + proxy.config.port + url;
  }
};
