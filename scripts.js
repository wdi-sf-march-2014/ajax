$(document).ready(function() {

  $( "#movie" ).submit(function( event ) {
    
    var movie_title = $('#movie_title').val();
    var url = "http://www.omdbapi.com?t=" + movie_title;

    $.ajax(url, {type: 'get'}).success(function(data) {
      var movieData = JSON.parse(data);
      $("#movie_title").val('');
      $('#title').html(movieData.Title);
      $('#movie_details').html("<p>Year:" + movieData.Year + "</p>"
        + "<p>Director:" + movieData.Director + "</p>");
    });

    event.preventDefault();
  });

});
