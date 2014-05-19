$(document).ready(function() {
  
  var url = "http://www.reddit.com/search.json?q=cats&limit=1";

  var success = function(data) {
    $('body').append("<h2>" + data.data.children[0].data.title + "</h2>");
  };

  var failure = function(jqXHR) {
    alert("HTTP Status Code = " + jqXHR.status);
  };

  $.ajax(url, { type: 'get' }).success(success).fail(failure);
});
