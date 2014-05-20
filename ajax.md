#AJAX

###Learning Objectives
- Make AJAX get requests to JSON Apis  
- Define Asynchronus  
- Use .done, .fail and .success callbacks  

use ajax to make http request
asynchronous - user is working else where

at that point we can do somethign 


##What is AJAX?  

Asynchronous Javascript and XML (replaced with JSON)
Asynchronous - non sequential; 
Dont need to wait for things to finish

FUNCTION in the JQUERY Library
is a way to send http requests with Javascript
outside of linear flow code 

**AJAX:** Asynchronous JavaScript And XML Allows for asynchronous requests in the browser. In other words, http requests can be made to the back end server, without reloading the page. AJAX gives the developer the ability to create more interactive and responsive pages which result in a better user experience.  

AJAX is a bit of a misnomer now. XML used to be a common data transfer format on the web, but JSON has replaced it in popularity.  

###HTTP Request - Response Life Cycle

![HTTP request-response](http://books.zkoss.org/images/8/8d/Performancemeter.png)

##Code Along - First Ajax Request

**First Request**  
```javascript
$(document).ready(function() {

  var url = "http://www.omdbapi.com/?i=tt1611224";
  //grab the url

  $.ajax(url, {type: 'get' }).done(function(data) { alert(data); });
});
//send our request to the URL and do the get request
//part 1: url is grabbed in get
//part 2: .done - asynchronous callback (executed when we get our response back)
//part 3: data is stored as everythign that the http request sends back

});
});
```

**Parsed JSON**  
```javascript
var url = "http://www.omdbapi.com/?i=tt1611224";

$.ajax(url, { type: 'get' }).done(
  function(data) {
    movieData = JSON.parse(data);
    alert(movieData.Title);
  });
```

**With .fail Callback**  

```javascript

var url = "http://www.omdbapi.com/fake/path";

var success = function(data) {
              movieData = JSON.parse(data);
              alert(movieData.Title);
            };

var failure = function(jqXHR) {
              alert("HTTP Status Code = " + jqXHR.status);
            };

$.ajax(url, { type: 'get' }).done(success).fail(failure);

```

**With .success Callback**  

```javascript
var url = "http://www.omdbapi.com/?i=tt1611224";

var success = function(data) {
              movieData = JSON.parse(data);
              alert(movieData.Title);
            };

var failure = function(jqXHR) {
              alert("HTTP Status Code = " + jqXHR.status);
            };


$.ajax(url, { type: 'get' }).success(success).fail(failure);
```

### Exercise 1 - Reddit API

**1.** Write an ajax GET request for `http://http://www.reddit.com/search.json?q=cats&limit=1`.  

Upon a successful GET, the page should alert the title of the article.  

__HINT__ *Reddit's reqponse is a slightly different format so you will not have to call `JSON.parse` before accessing it's attributes.*  

**2.** Once you have completed that, change the code such that instead of alerting the title, a new H2 tag is added to the document at the top of the page with the title of the article.  

__HINT__ *Look through the jQuery docs to find the method to insert the new h2 tag into the document.*  


## Get

jQuery provides a shorthand way of writing an ajax GET request.  The [jQuery.get](https://api.jquery.com/jQuery.get/) method allows the caller to make the same request but without specifying the type.  Here is a similar query rewritten with .get:

```
var url = "http://www.omdbapi.com/?i=tt1611224";

$.get(url).done(function(data) {
                   movieData = JSON.parse(data);
                   alert(movieData.Title);
                 });

```

Similarly to the ```.ajax``` method, errors can be handled with ```.fail```.  Try the following:

```
var url = "http://www.omdbapi.com/bad/route";

$.get(url).done(function(respData) {
              movieData = JSON.parse(respData);
              alert(movieData.Title);
            })
           .fail(function(jqXHR) {
              alert("You Got An Error, SON! " + jqXHR.status )
           });

```

###Exercise 2 - .then

**1.** Look up jQuery.then *(http://api.jquery.com/deferred.then/)*. Read about how .then is used. Write a get request to Reddit using jQuery.get and handle the result with .then, instead of .done.  

$(document).ready(function() {
  
  var url = "http://www.reddit.com/search.json?q=cats&limit=1"
  var url2 = "http://www.reddit.com/failure"

  $.get ( url).then( 
    function(data) {
      var redditData = data
      $("h1").append("<h2>" + redditData.data.children[0].data.title + "<br>" + "<img src='" + redditData.data.children[0].data.thumbnail + "'/>" + "</h2>");
    }, 
  
  function(jqXHR) 
  	{ alert("You Failed! " + jqXHR.status )
	});
});


**2.** Use .then to handle both successful and non successful requests.  

## Same Origin Policy

The same origin policy is important to understand when making ajax requests.  It states that you can only make AJAX requests to an endpoint with the same protocol, domain and port number as the site in which the script originated from.  In other words, say you have a javascript file running on http://www.mysite.com.  Here are some examples that will, or will not allow ajax requests:

| URL Requested                |  Allowed?               |
| ----------------------------           | :---------------------: |
| http://www.mysite.com/tests  |Allowed, protocol, domaina and port match|
| __https__://www.mysite.com/tests | __NOT ALLOWED__, protocol does not match |
| http://__home.mysite__.com/tests    | __NOT ALLOWED__, domain does not match |
| http://www.mysite.com:__3000__/tests | __NOT ALLOWED__, port does not match |
| http://www.mysite.com/?query=string | Allowed, protocol, domain and port match |


## JSONP


JSONP is a hacky way of circumventing the same origin policy.  It uses a script tag that is dynamically added to the page as a work around to making a request to a different origin.  The server that receives the request must know that the request is JSONP and it must wrap the result in a callback method that is defined by the caller.  Check the resources section for more reading.

THIS IS WHAT YOU DO WHEN YOUR JSON DOESNT WORK
**Example of JSONP**

```javascript
var url = "http://www.omdbapi.com/?i=tt1611224";

  $.ajax(url, { type: 'get', dataType: 'jsonp' }
    ).done(function(data) {
      alert(data.Title);
    });
```

###Exercise 3 - Using a form

**1.** Add a form on your index.html page to take in the title of a movie.  

**2.** When the form is submitted, use ajax to call `http://www.omdbapi.com?t=<your_movie_title>` passing in the movie title from your form.  

**3.** On success, append the movie title, and data of your choosing to your page.  

__HINT__ *These will be some helpful jQuery links: http://api.jquery.com/submit/, http://api.jquery.com/click/, http://api.jquery.com/append/*  

## Resources

[jQuery AJAX api Reference](http://api.jquery.com/jQuery.ajax/)

[Same Origin Policy](http://en.wikipedia.org/wiki/Same-origin_policy)

[JSONP](http://en.wikipedia.org/wiki/JSONP)
