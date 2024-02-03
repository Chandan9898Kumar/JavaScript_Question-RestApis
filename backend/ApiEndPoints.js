
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

//here we cached our employees route only.  It will cache the response on this route for 5 minutes.

//  Here we have given 5 minutes time to cache responses (Basically it store this response in its memory for 5 minutes). 
// within this 5 minutes no matter how many times you call this api, it will give response data from its memory,it will not get the response from server.
// even if you have update something and calling this api to get updated response,then also it will give old response which you set here here.
//  but when the 5 mins time gets over(cache will remove the stored data from its memory) and after that if you call this get method then it will actually call this method
//  and give you fresh data. and again it will save data in cache for next 5 minutes,and this process will keep on going. 

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




// Note :  Initially, you will see a long response time. If you send the GET request several times, 
// you will notice that data is retrieved much faster than the initial response time due to response caching. When we request a resource for the first time, 
// the data gets cached and on requesting it again, the cached data is returned instead of hitting the API endpoint, resulting in faster response times. 

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



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  How to add a 404 error page i.e not found using the express server. 404 is the status code which means not found in the server.



  
// Handling GET /hello request 
app.get("/hello", (req, res, next) => { 
  res.send("This is the hello response"); 
}) 

// Handling non matching request from the client , we can use and http methods here as well.
app.use((req, res, next) => { 
  res.status(404).send( "<h1>Page not found on the server</h1>") 
}) 







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



// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//                                                                  ###  Authentication strategies available in Express.

// Authentication is an important aspect of web development, which ensures that users accessing an application are who they claim to be.


// There are two types of authentication patterns:


//                                                                       1. Stateless Authentication
// The server does not store any data or state of the user between requests. It means each request from the client/ User to the server contains all the data needed to authenticate the user.

// Some Stateless authentication strategies in ExpressJS are

// a. Basic Authentication
// b. Token-Based Authentication
// c. OAuth Authentication (when implemented with stateless tokens)





/** //                                                                  A. Basic Authentication
// Basic Authentication is one of the simplest and most widely used auth strategy across the web.
// In express, it involves sending the user’s credentials i.e username, and password with each HTTP request coded in “base64-encoded format”
// Though it is easy to implement, its base64-encoded format can be easily decoded so it is recommended to use this method only when coupled with a secure transport layer
   such as HTTPS.


You can use "express-basic-auth" middleware in Express to implement this authentication method.

Example :

const express = require("express");
const basicAuth = require("express-basic-auth");
const app = express();
 
app.use(
    basicAuth({
        users: { username: "password" },
        challenge: true,
        unauthorizedResponse:
            "Unauthorized access. Please provide valid credentials.",
    })
);
 
app.get("/secure-data", (req, res) => {
    res.send("This is secure data that requires valid credentials.");
});
 
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



 */




/**                                                             B. Token-Based Authentication:
 * 
1. It is a more secure and scalable alternative to basic authentication.
2. JSON Web Tokens(JWT) are commonly used in Express to implement token-based authentication.
3. When the user logs in, the server generates a token containing the user’s information.
4. Then the server sends the token to the client in response.
5. The client stores the token in the form of a cookie or local storage.
6. In the subsequent request, the client includes this token in the header, enabling the server to validate the user.
7. The features of token-based auth include expiration time and digital signatures enhancing the security and integrity of the data.


Example :


const jwt = require("jsonwebtoken");
 
// Generating a token
const token = jwt.sign({ userId: "246" }, "secretKey", { expiresIn: "2h" });
 



// Verifying the token
jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
        // Token is invalid
    } else {
        // Token is valid, and decoded contains user information
    }
});



 */






/**                                                                   C. OAuth Authentication
1. OAuth (Open Authorization) is an industry-standard protocol for authentication.
2. OAuth enables users to grant third-party applications limited access to their resources without sharing credentials (passwords).
3. In Express JS with the help of Passport.JS, one can integrate OAuth authentication strategies for popular providers such as Google, Twitter, or Facebook.
4. OAuth leverages the existing credentials from trusted providers, offering a secure user experience.



Example:

//app.js

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: "your-id",
			clientSecret: "your-secret",
			callbackURL: "http://app/callback",
		},
		(accessToken, refreshToken, profile, done) => {
			// Use profile information to create or authenticate a user
			// Call done(null, user) upon success
		}
	)
);

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "/dashboard",
		failureRedirect: "/login",
	})
);



 */



//                                                                  2. Stateful Authentication

/**In this authentication pattern, the Server stores the state or data of the user about the user session or authentication state. 
 * The server uses this information/ Data to authenticate the user. Stateful authentication uses cookies to identify the user with their request. 
 * 
 * In Express.js Authentication strategies such as Passport.js and Middleware-based authentication can be both stateful or stateless depending on the use case 
 * and implementation chosen by developers.




                                                                    A. Passport.js Middleware
1. Passport.js is the authentication middleware for Node.js applications, especially for frameworks like ExpressJS.
2. It supports various strategies such as local authentication, OAuth, OpenID, and others.
3. It’s flexible to allow developers to choose the strategies that align with their web app the best.
4. Passport.JS delegates the intricacies of different strategies to specialized modules.
5. This modular design makes it easy to integrate for changing requirements.


Example:

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	(username, password, done) => {
		// Validate user credentials
		// If valid, call done(null, user)
		// Otherwise, call done(null, false, { message: 'Incorrect credentials.' })
	}
));

app.post('/login', passport.authenticate('local', {
	successRedirect: '/dashboard',
	failureRedirect: '/login',
	failureFlash: true
}));







                                                                  B. Middleware-Based Authentication
1. Middleware-based authentications involve using custom middleware functions for authorization
2. Middleware functions are the functions that have access to the request, response, and the next function in the application’s request-response cycle
3. They can modify request and response objects, call the next function, and end the request-response cycle in the stack.
4. Middleware-based authentication offers maximum flexibility among others. It allows developers to customize authentication logic to specific application requirements.



Example:


function authenticate(req, res, next) {
	// Custom authentication logic
	if (req.headers.authorization === 'valid-token') {
		return next(); // User is authenticated
	} else {
		return res.status(401).json({ message: 'Unauthorized access.' });
	}
}

app.get('/protected-route', authenticate, (req, res) => {
	// Route handling logic for authenticated users
});


 */