module.exports = {
  resolve_url: function(base_uri, path){
    return base_uri + path;
  },
  interpolate_string: function(url, data){
    regex = /#{.+}/;
    return url.replace(regex, data);
  }
}