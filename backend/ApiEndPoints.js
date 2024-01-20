
const express = require('express');
const bodyParser = require('body-parser');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(express.json({limit:'50mb'})); 
app.use(cors());     
app.use(cookieParser)



//                                              "/articles" represents a REST API resource.
app.get('/articles', (req, res) => {
  const articles = [];
  // code to retrieve an article...
  res.json(articles);
});

app.post('/articles', (req, res) => {
  // code to add a new article...
  res.json(req.body);
});

app.put('/articles/:id', (req, res) => {
  const { id } = req.params;
  // code to update an article...
  res.json(req.body);
});

app.delete('/articles/:id', (req, res) => {
  const { id } = req.params;
  // code to delete an article...
  res.json({ deleted: id });
});


/**
 * In the code above, we defined the endpoints to manipulate articles. As we can see, the path names do not have any verbs in them. 
 * All we have are nouns. The verbs are in the HTTP verbs.

   The POST, PUT, and DELETE endpoints all take JSON as the request body, and they all return JSON as the response, including the GET endpoint.

 */




// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//                                                                          Use logical nesting on endpoints


// When designing endpoints, it makes sense to group those that contain associated information. That is, if one object can contain another object, 
// you should design the endpoint to reflect that. This is good practice regardless of whether your data is structured like this in your database.
//  In fact, it may be advisable to avoid mirroring your database structure in your endpoints to avoid giving attackers unnecessary information.


// For example, if we want an endpoint to get the comments for a news article, we should append the /comments path to the end of the /articles path. 
// We can do that with the following code in Express:


app.get('/articles/:articleId/comments', (req, res) => {
    const { articleId } = req.params;
    const comments = [];
    // code to get comments by articleId
    res.json({comments: comments,articleId:articleId});
  });




/**
In the code above, we can use the GET method on the path '/articles/:articleId/comments'. We get comments on the article identified by articleId and 
then return it in the response. We add 'comments' after the '/articles/:articleId' path segment to indicate that it's a child resource of /articles.

This makes sense since comments are the children objects of the articles, assuming each article has its own comments. 
Otherwise, it’s confusing to the user since this structure is generally accepted to be for accessing child objects. 
The same principle also applies to the POST, PUT, and DELETE endpoints. They can all use the same kind of nesting structure for the path names.
However, nesting can go too far. After about the second or third level, nested endpoints can get unwieldy. Consider, instead, 
returning the URL to those resources instead, especially if that data is not necessarily contained within the top level object.

For example, suppose you wanted to return the author of particular comments. You could use /articles/:articleId/comments/:commentId/author. 
But that's getting out of hand. Instead, return the URI for that particular user within the JSON response instead:

"author": "/users/:userId"

 */






// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//                                                              Handle errors gracefully and return standard error codes


/**
                                                              Common error HTTP status codes include:

400 Bad Request - This means that client-side input fails validation.
401 Unauthorized - This means the user isn't not authorized to access a resource. It usually returns when the user isn't authenticated.
403 Forbidden - This means the user is authenticated, but it's not allowed to access a resource.
404 Not Found - This indicates that a resource is not found.
500 Internal server error - This is a generic server error. It probably shouldn't be thrown explicitly.
502 Bad Gateway - This indicates an invalid response from an upstream server.
503 Service Unavailable - This indicates that something unexpected happened on server side (It can be anything like server overload, some parts of the system failed, etc.).
 */


// existing users
const users = [
    { email: 'abc@foo.com' }
  ]
  
  
  
  app.post('/users', (req, res) => {
    const { email } = req.body;
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' })
    }
    res.json(req.body);
  });





/**                                           Note
 * 
 * Above if we try to submit the payload with the email value that already exists in users, we'll get a 400 response status code with a 'User already exists' message 
 * to let users know that the user already exists. With that information, the user can correct the action by changing the email to something that doesn't exist.
 * 
 */






// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//                                                      Allow filtering, sorting, and pagination                                                                     


/**
The databases behind a REST API can get very large. Sometimes, there's so much data that it shouldn’t be returned all at once because it’s way too slow 
or will bring down our systems. Therefore, we need ways to filter items.

We also need ways to paginate data so that we only return a few results at a time. We don't want to tie up resources for too long by trying to get all the requested data at once.

Filtering and pagination both increase performance by reducing the usage of server resources. As more data accumulates in the database, the more important these features become.

Here’s a small example where an API can accept a query string with various query parameters to let us filter out items by their fields:
 * 
 */


// employees data in a database
const employees = [
    { firstName: 'Jane', lastName: 'Smith', age: 20 },
    { firstName: 'John', lastName: 'Smith', age: 30 },
    { firstName: 'Mary', lastName: 'Green', age: 50 },
  ]
  
  
  app.get('/employees', (req, res) => {
    const { firstName, lastName, age } = req.query;
    let results = [...employees];
    if (firstName) {
      results = results.filter(r => r.firstName === firstName);
    }
  
    if (lastName) {
      results = results.filter(r => r.lastName === lastName);
    }
  
    if (age) {
      results = results.filter(r => +r.age === +age);
    }
    res.json(results);
  });



//  Once we have done that, we return the results as the response. Therefore,when we make a GET request to the following path with the query string: /employees?lastName=Smith&age=30



/**
We can also specify the fields to sort by in the query string. For instance, we can get the parameter from a query string with the fields we want to sort the data for.
Then we can sort them by those individual fields.

For instance, we may want to extract the query string from a URL like:

http://example.com/articles?sort=+author,-datepublished

Where + means ascending and - means descending. So we sort by author’s name in alphabetical order and datepublished from most recent to least recent.

 */







// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//                                                                      Cache data to improve performance


// We can add caching to return data from the local memory cache instead of querying the database to get the data every time we want to retrieve some data that users request.
//  The good thing about caching is that users can get data faster. However, the data that users get may be outdated.
//  This may also lead to issues when debugging in production environments when something goes wrong as we keep seeing old data.
// There are many kinds of caching solutions like Redis, in-memory caching, and more. We can change the way data is cached as our needs change.

// For instance, Express has the apicache middleware to add caching to our app without much configuration. We can add a simple in-memory cache into our server like so:





const apicache = require('apicache');
let cache = apicache.middleware;


// Note :  we imported the apicache module and accessed its middleware. we can cache our API in two ways.

// One is to cache each route separately and the second is to cache all API routes. I will show you both.

// In order to cache the API, we will call the cache middleware function as follows:
// cache(“[time unit]”)
// time: can be any number
// unit: can be seconds, minutes, hours, or days
// The time will determine how long we want to keep the response of a request in cache storage.



// Method 1.  By Cache a single Route:


// employees data in a database
const employee = [
  { firstName: 'Jane', lastName: 'Smith', age: 20 },
  { firstName: 'John', lastName: 'Smith', age: 30 },
  { firstName: 'Mary', lastName: 'Green', age: 50 },
]

//here we cached our employees route only.  It will cache the response on this route for 5 minutes
app.get('/employees',cache('5 minutes'),(req, res) => {
  res.json(employee);
});

app.post('/post',(req, res) => {
    res.json(employee);
  });


// The code above just references the apicache middleware with apicache.middleware and then we have: app.use(cache('5 minutes'))
// to apply the caching to the whole app. We cache the results for five minutes, for example. We can adjust this for our needs.
// If you are using caching, you should also include Cache-Control information in your headers. This will help users effectively use your caching system.






// Method 2.    By Cache all Routes:


//  Here we cached all routes (get,post delete,patch) by using app.use()
app.use(cache('5 minutes'));

app.get('/employees',(req, res) => {
  res.send('Hello World!')
})

app.post('/post',(req, res) => {
    res.json(employee);
  });


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//                                                          Cache new example


// There are several ways to implement caching in an Express API. Here are some common techniques:

//  1. In-memory caching: In this technique, the data is stored in memory, which allows for quick retrieval of data.
//  This technique is useful for frequently accessed data that doesn’t change frequently.
//  You can use a caching library like “memory-cache” or “lru-cache” to implement in-memory caching in your Express API.

// 2. Redis caching: Redis is an in-memory data store that can be used to cache data in a scalable and high-performance way.
//  You can use the “redis” package to implement Redis caching in your Express API.

// 3. Browser caching: You can configure your API to set appropriate cache headers in the HTTP response, which allows the client’s browser to cache the response. 
// This technique is useful for responses that don’t change frequently and can be safely cached by the client.



const cache = require('memory-cache');



app.get('/api/data', (req, res) => {
  const data = cache.get('data');
  
  if (data) {
    console.log('Serving from cache');
    return res.json(data);
  } else {
    console.log('Serving from API');
    const newData = // fetch data from API
    cache.put('data', newData, 60 * 1000); // cache for 1 minute
    return res.json(newData);
  }
});



/**
 * In this example, the API endpoint “/api/data” checks if the data is available in the cache. If it is, it serves the response from the cache, otherwise, 
 * it fetches the data from the API and caches it for 1 minute using the “memory-cache” package. 
 * This technique can be used for any API endpoint that returns frequently accessed data that doesn’t change frequently.
 * 
 */







// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//                                                             Versioning our APIs


/**
We should have different versions of API if we're making any changes to them that may break clients.
 The versioning can be done according to semantic version (for example, 2.0.6 to indicate major version 2 and the sixth patch) like most apps do nowadays.

This way, we can gradually phase out old endpoints instead of forcing everyone to move to the new API at the same time. 
The v1 endpoint can stay active for people who don’t want to change, while the v2, with its shiny new features, can serve those who are ready to upgrade. 
This is especially important if our API is public. We should version them so that we won't break third party apps that use our APIs.

Versioning is usually done with /v1/, /v2/, etc. added at the start of the API path.



For example, we can do that with Express as follows:
 
 */


const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/v1/employees', (req, res) => {
  const employees = [];
  // code to get employees
  res.json(employees);
});

app.get('/v2/employees', (req, res) => {
  const employees = [];
  // different code to get employees
  res.json(employees);
});







//   We just add the version number to the start of the endpoint URL path to version them.




// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.listen(PORT, (error) => {
    if (!error) {
      console.log(
        "Server is Successfully Running,and App is listening on port " + PORT
      );
    } else {
      console.log("Error occurred, server can't start", error);
    }
  });