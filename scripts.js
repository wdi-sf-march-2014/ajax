$(document).ready(function() {

    $('input').keypress(function(e) {
        if (e.which == 13) {
            e.preventDefault();
            var movie = $('input').val();
            searchMovie(movie);
        };
    });

    var searchMovie = function(title) {
        var url = "http://www.omdbapi.com?t=" + title;
        var success = function(data) {
            var movieData = JSON.parse(data);
            $('body').append("<li>" + movieData.Title + "</li>").fadeIn(500);
            $('input').val("");
        };
        $.get(url).then(success);
    };
});

//   $('input').keypress(function(e) {
//     if(e.which == 13) {
//       e.preventDefault();
//       var movieTitle = $('input').val();
//       callAPI(movieTitle);
//     };
//   });

//   var callAPI = function(title) {
//     var url = "http://www.omdbapi.com?t=" + title;
//     var success = function(data) {
//                     var movieData = JSON.parse(data);
//                     if(movieData.Response == "False") { 
//                       $('h2').empty()
//                       $('h4').empty()
//                       $('body').append('<h2>Movie not found</h2>');
//                       $('input').val("");
//                     }
//                     else {
//                       $('h2').empty()
//                       $('h4').empty()
//                       $('body').append('<h2> Title: ' + movieData.Title + '</h2>');
//                       $('body').append('<h4> Year: ' + movieData.Year + '</h4>');
//                       $('body').append('<h4> Rated: ' + movieData.Rated + '</h4>');
//                       $('body').append('<h4> Director: ' + movieData.Director + '</h4>');
//                       $('body').append('<h4> Genre: ' + movieData.Genre + '</h4>');
//                       $('input').val(""); // resets the value of the data
//                     };
//     };
//     $.get(url).then(success);
//   };

// });