var request = require('request')
var request = request.defaults({jar: true})
var _ = require('underscore')
var jsesc = require('jsesc')  
var utils = require('./utilities')
var util = require('util')

var Requester = function(){
  this.auth_token = '';
  this.base_uri = 'https://api.gotinder.com/';
}

Requester.prototype.auth_request =  function(facebook_id, facebook_token, callback){
  var data = {
    facebook_id: facebook_id,
    facebook_token: facebook_token
  }
  var that = this
  this.post_request(
    'auth', data,
    function(err, res, body){
      that.auth_token = body.token
      if(callback) callback(err, res, body)
    } 
  )
}

Requester.prototype.get_request = function(endpoint, callback){
  url = utils.resolve_url(this.base_uri, endpoint)
  request({method: 'GET', url: url, headers: this.all_headers(), json:true}, 
    function(err, res, body){
      if(callback) callback(err, res, body)
  })
}

Requester.prototype.post_request = function(endpoint, data, callback){
  url = utils.resolve_url(this.base_uri, endpoint)
  request({method: 'POST', url: url, body: data, headers: this.all_headers(), json: true},
    function(err, res, body){
      if(callback) callback(err, res, body)
  })
}

Requester.prototype.all_headers = function(){
  return _.extend(this.default_headers(), this.auth_headers())
}

Requester.prototype.auth_headers = function(){
  if(this.auth_token){
    return {
      "X-Auth-Token": this.auth_token,
      "Authorization": jsesc(
        'Token token="' + this.auth_token + '"', 
        {quotes: 'double'}
        )
    }
  }
  else{
    return {}
  }
}

Requester.prototype.default_headers = function(){
  return {
    'User-Agent': 'Tinder/4.0.4 (iPhone; iOS 7.1.1; Scale/2.00)'
  }
}

module.exports = Requester
