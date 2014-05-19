$(document).ready(function() {
  
  var url = "http://www.omdbapi.com?i=tt1611224";

  $.get(url).then(function(data) {
      var movieData = JSON.parse(data);
      alert(movieData.Title);
    },
   function(jqXHR) {
      alert("You Got An Error, SON! " + jqXHR.status )
   });
});