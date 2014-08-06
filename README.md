Tinder Pro
==========
A wrapper for the Tinder API

Installation
------------
via `npm`

`npm install tinder_pro`

via `git`

`git clone https://github.com/tranhungt/tinder_pro.git`

Getting the Facebook OAUTH Tokens
---------------------------------
In order to use the API, you will need the facebook oauth token. To get the facebook oauth token, it's best to use a proxy service such as [Charles Proxy](http://www.charlesproxy.com/). You can set up Charles Proxy by following a simple walkthrough here:

[http://hungtran.co/discovering-tinders-private-api/](http://hungtran.co/discovering-tinders-private-api/)

After setting up the proxy, initiate the tinder app on your phone, and you will see the http request to `https://api.gotinder.com/auth`. Check the request json body, and you will see something like

```javascript
{
  "facebook_token": "CAAGm0PX4ZCps............",

  "facebook_id": "761..."
}
```

Usage
-----

###Authenticating
With the facebook auth token, you can plug it into the app's auth.

```javascript
var FACEBOOK_ID = "761..."

var FACEBOOK_TOKEN = "BAAGm0PX4ZCps............"

var TinderPro = require('tinder_pro')
var tinder = new TinderPro()

tinder.sign_in(FACEBOOK_ID, FACEBOOK_TOKEN, function(err, res, body){})
```

Every function is an asynchronous request to Tinder's API, therefore takes a callback with the params `callback(err, res, body)` that reflects the API's response.

###Interacting with Users
`.get_nearby_users(callback)`

Returns an array of json user objects.

`.like(user_id, callback)`

Likes a user, equivalent of swiping right.


`.dislike(user_id, callback)`

Passes on the user.

###Updating preferences
`.update_search_distance(distance, callback)`

Takes an integer distance in miles and updates your search distance preference.

`.update_location(latitude, longitude, callback)`

Updates your current position. Latitude and longitude are float precision.


Credits
-------
Copyright &copy; 2014 Hung Tran

Released under the MIT License, which can be found in the repository in `LICENSE.txt`.
