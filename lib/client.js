var Requester = require('./requester')
var utils = require('./utilities')

var URLS = {
  update_location: 'user/ping',
  like: 'like/#{user_id}',
  dislike: 'pass/#{user_id}',
  get_nearby_users: 'user/recs',
  get_user_info: 'user/#{user_id}',
  send_message: 'user/matches/#{user_id}',
  profile: 'profile'

}

var Client = function(){
  this.requester = new Requester()
}

Client.prototype.fetch_updates = function(last_activity_time, callback){
  var url = URLS.update_location
  var date = new Date()
  return this.requester.post_request(
    url, 
    {
      last_activity_date: date.toISOString()
    },
    callback
  )
}

Client.prototype.get_user_info = function(user_id, callback){
  var url = URLS.get_user_info
  url = utils.interpolate_string(url, user_id)
  return this.requester.get_request(url, callback)
}

Client.prototype.get_nearby_users = function(callback){
  var url = URLS.get_nearby_users
  return this.requester.get_request(url, callback)
}

Client.prototype.like = function(user_id, callback){
  var url = URLS.like
  url = utils.interpolate_string(url, user_id)
  return this.requester.get_request(url, callback)
}

Client.prototype.update_search_distance = function(distance, callback){
  var url = URLS.profile
  var data = {distance_filter: distance}
  return this.requester.post_request(url, data, function(err, res, body){
    if(callback) callback(err, res, body)
  })
}

Client.prototype.send_message = function(user_id, message, callback){
  var url = URLS.send_message
  url = utils.interpolate_string(url, user_id)
  var data = {message: message}
  return this.requester.post_request(url, data, callback)
}

Client.prototype.dislike = function(user_id, callback){
  var url = utils.interpolate_string(URLS.dislike, user_id)
  return this.requester.get_request(url, callback)
}

Client.prototype.sign_in = function(facebook_id, facebook_token, callback){
  return this.requester.auth_request(facebook_id, facebook_token, callback)
}

Client.prototype.update_location = function(latitude, longitude, callback){
  var data = {lat: latitude, lon: longitude}
  return this.requester.post_request(URLS.update_location, data, callback)
}

module.exports = Client