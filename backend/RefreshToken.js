//  this                                                          Covering JWT

// ------------------------------------------------------------JWT Authentication with Node.js---------------------------------------------------------------------------

// Step 1.    npm install express dotenv jsonwebtoken

// Step 2.    Create Configuration File (.env). This files contains those variables that we need to pass to our application’s environment.

// Step 3.   Create Route for Generating JWTCreating a ‘post’ request that sends the JWT token in the response.

// Step 4.   Create Route for Validating JWT Creating a ‘get’ request that contains the JWT token in the header and sends verification status as a response.

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// Set up Global configuration access
dotenv.config();

// Main Code Here  //
// Generating JWT
app.post("/user/generateToken", (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  let payload = {
    time: Date(),
    userId: 12,
  };

  //  this sign() method of the jsonwebtoken library is used for creating a token that accepts certain information as parameter objects and returns the generated token.
  const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "60s" });

  res.send(token);
});

// Verification of JWT
app.get("/user/validateToken", (req, res) => {
  // Tokens are generally passed in header of request
  // Due to security reasons.

  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
      return res.send("Successfully Verified");
    } else {
      // Access Denied
      return res.status(401).send("<h1>Page not found on the server</h1>");
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
});

// ======================================================== How long JWT token valid ?====================================================================================

/**
JSON web token is an efficient, secured as well mostly used method of transferring or exchanging data on the internet.
Generally, it is used for authentication and authorization in applications. The workflow of the authentication is we generate the token at the server and send back it to the client 
which is used for further requests on the server.


 Now the point of discussion is how long this jwt token will be valid? that means after which duration the server will not consider the token sent by the client. 
 Let’s first understand how a JWT token gets created.   :-


The sign() method of the jsonwebtoken library is used for creating a token that accepts certain information as parameter objects and returns the generated token.  


Syntax:

jwt.sign(payload, secretOrPrivateKey, [options, callback])


Parameters: 

1. payload: It is the information to be encrypted in the token
2. secretKey: It is the signature or can say a code that is used to identify the authenticity of the token.
3. options: In the option, we pass certain information about the token and that’s the place where we provide the duration of the token up to which it will be valid.


Return type: 
This method will return JWT token



There are two methods of registering the expiry of the token both are shown below with an explanation. 

1. Creating an expression of an expiry time.
2. Providing expiry time of JWT token in the options argument of the method.

 */

// Approach 1: There exists a key exp in which we can provide the number of seconds since the epoch and the token will be valid till those seconds.

const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10 * 60, data: "Token Data" }, "secretKey");

const date = new Date();

console.log(`Token Generated at:- ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

// Printing the JWT token
console.log(token);

// Approach 2: In this method, we can pass the time to expiresIn key in the options, it requires the number of seconds till the token will remain valid or the string of duration
// as ‘1h’,  ‘2h’, ’10m’, etc.

const tokens = jwt.sign({ data: "Token Data" }, "secretKey", { expiresIn: "10m" });

const dates = new Date();

console.log(`Token Generated at:- ${dates.getHours()}:${dates.getMinutes()}:${dates.getSeconds()}`);

// Printing JWT token
console.log(tokens);

// ======================================================JWT Authentication With Refresh Tokens=============================================================================

/**
When building a web application, authentication is one of the important aspects, and we usually implement authentication using JWT tokens (You can learn more about JWT here). 
We create an access token and store it in the local storage or session or cookie. But there is a more secure way to implement this using Refresh Tokens.


Refresh Tokens:
It is a unique token that is used to obtain additional access tokens. This allows you to have short-lived access tokens without having to collect credentials every time one expires.

Access tokens, with brief validity, carry user details, while refresh tokens, stored as HTTP-only cookies, enable prolonged re-authentication without exposing
sensitive information to client-side JavaScript.


Auth Persistence:
We can easily persist users between refreshes and login without any credentials. We can create a new route called refresh, whenever a token expires or
a user refreshes we can get a new access token by sending a request to this route

 */

const express = require("express");
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

// Setting up middlewares to parse request body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

const userCredentials = {
  username: "admin",
  password: "admin123",
  email: "admin@gmail.com",
};

app.post("/login", (req, res) => {
  // Destructuring username & password from body
  const { username, password } = req.body;

  // Checking if credentials match
  if (username === userCredentials.username && password === userCredentials.password) {
    //creating a access token
    const accessToken = jwt.sign(
      {
        username: userCredentials.username,
        email: userCredentials.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10m",
      }
    );

    // Creating refresh token not that expiry of refresh token is greater than the access token

    const refreshToken = jwt.sign(
      {
        username: userCredentials.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Assigning refresh token in http-only cookie. we have stored Refresh token in Cookie.
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // It is the Expiry time of this cookie.
    });

    return res.json({ accessToken });
  } else {
    // Return unauthorized error if credentials don't match
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }
});

//  If token is in cookies then access from there else if it is coming from req.body then access from there.Accessing refresh token from cookie.
app.post("/refresh", (req, res) => {
  if (req.cookies?.jwt) {
    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt;

    // Verifying refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // Wrong Refresh Token
        return res.status(406).json({ message: "Unauthorized" });
      } else {
        // Correct token we send a new access token
        const accessToken = jwt.sign(
          {
            username: userCredentials.username,
            email: userCredentials.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10m",
          }
        );
        return res.json({ accessToken });
      }
    });
  } else {
    return res.status(406).json({ message: "Unauthorized" });
  }
});

app.get("/", (req, res) => {
  res.send("Server");
  console.log("server running");
});

app.listen(8000, () => {
  console.log(`Server active on http://localhost:${8000}!`);
});

/**
Explanation: 
Authentication logic involves creating an Express app with login and refresh routes. The login route validates credentials, responding with a refresh token 
and access token on a successful match, while the refresh route verifies the token for a new access token or raises an authorization error.
 */

/**
.env: The below code is for .env which is used to store your sensitive credentials like API keys:

PORT = 8000
ACCESS_TOKEN_SECRET=MYSECRETACCESS
REFRESH_TOKEN_SECRET=MYREFRESHTOKENSECRET

 */

/**                                         Details on refresh token
 * 
1. When you do log in, send 2 tokens (Access token, Refresh token) in response to the client.
2. The access token will have less expiry time and Refresh will have long expiry time.
3. The client (Front end) will store refresh token in an http-only cookie and access token in local storage.
4. The client will use an access token for calling APIs. But when it expires, you call auth server API to get the new token (refresh token is automatically added to http request
   since it's stored in cookies).
5. Your auth server will have an API exposed which will accept refresh token and checks for its validity and return a new access token.
6. Once the refresh token is expired, the User will be logged out.



                                                    OR

A JWT architecture usually has two parts one is authToken(Access token) and others are refreshToken. 
Where authToken is responsible for authenticating the user and refreshToken is responsible for getting the new authToken from the backend without asking
for username and password from the user.Yes! authTokens(Access token) expires. Well for security purposes we set up our authToken in such as way that it expires in a while 
and uses the refresh token to fetch the authToken back.



1. User Logins: User logins with username (email) and password which then goes back to the server to create a new JWT token. 
   A simple JWT token contains JWT authToken and JWT refreshToken both tokens have an expiry generally and refreshToken should always have a greater expiry date than authToken.

2. Token Received: Once the JWT token is received by the front end they can save that JWT token into local storage or to an in-memory store like Redux. 
   Depends on preferences but there are some standard ways to do that.

3. Making Calls: Once the JWT token is saved, all calls which use authentication/authorisation ( Yes mate both are different concepts) uses 
   this JWT token to successfully validate the request.

4. Token expiry: Once the JWT token is expired which as we already know going to happen the JWT refresh token is used to authenticate the API call and
   used to fetch the new JWT tokens. (Note: Refresh token can only authenticate the API route which is used to get the new tokens)

5. Using the new Auth Tokens: Once you get the new JWT tokens you can use the authTokens to make the API calls to the server.

6. Repeat the Process: Keep repeating the process to get the new authTokens and making the API call.




 */

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/**                                                                Use cookies securely
 * 
 * 
To ensure cookies don’t open your app to exploits, don’t use the default session cookie name and set cookie security options appropriately.

There are two main middleware cookie session modules:

1. express-session that replaces express.session middleware built-in to Express 3.x.
2. cookie-session that replaces express.cookieSession middleware built-in to Express 3.x.

The main difference between these two modules is how they save cookie session data. The express-session middleware stores session data on the server; 
it only saves the session ID in the cookie itself, not session data. By default, it uses in-memory storage and is not designed for a production environment. 
In production, you’ll need to set up a scalable session-store; see the list of compatible session stores.

In contrast, cookie-session middleware implements cookie-backed storage: it serializes the entire session to the cookie, rather than just a session key.
Only use it when session data is relatively small and easily encoded as primitive values (rather than objects).
Although browsers are supposed to support at least 4096 bytes per cookie, to ensure you don’t exceed the limit, don’t exceed a size of 4093 bytes per domain. 
Also, be aware that the cookie data will be visible to the client, so if there is any reason to keep it secure or obscure, then express-session may be a better choice.




                                                  Don’t use the default session cookie name
Using the default session cookie name can open your app to attacks. The security issue posed is similar to X-Powered-By: 
a potential attacker can use it to fingerprint the server and target attacks accordingly.

To avoid this problem, use generic cookie names; for example using express-session middleware:
Example:

const session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))



Set cookie security options
Set the following cookie options to enhance security:

1. secure - Ensures the browser only sends the cookie over HTTPS.
2. httpOnly - Ensures the cookie is sent only over HTTP(S), not client JavaScript, helping to protect against cross-site scripting attacks.
3. domain - indicates the domain of the cookie; use it to compare against the domain of the server in which the URL is being requested. If they match,
   then check the path attribute next.
4. path - indicates the path of the cookie; use it to compare against the request path. If this and domain match, then send the cookie in the request.
5. expires - use to set expiration date for persistent cookies.

Here is an example using cookie-session middleware:

const session = require('cookie-session')
const express = require('express')
const app = express()

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
  }
}))




                                                                                Note :

Cookie Parser parses the incoming cookies from request to JSON value.
Whereas cookie-session or express-session is to maintain session on your server.

When your frontend sends a request, if cookies are set up, it will send some cookies based on usage, which by default are hard to interpret by server,
so here cookie parser will parse those for easy understand ability. Which in turn could be used to create/maintain sessions or Authenticate (Depends upon cookie usage).



cookie-session :

A user session can be stored in two main ways with cookies: on the server or on the client. This module stores the session data on the client within a cookie, 
while a module like express-session stores only a session identifier on the client within a cookie and stores the session data on the server, typically in a database.

The following points can help you choose which to use:

1. cookie-session does not require any database / resources on the server side, though the total session data cannot exceed the browser’s max cookie size.
2. cookie-session can simplify certain load-balanced scenarios.
3. cookie-session can be used to store a “light” session and include an identifier to look up a database-backed secondary store to reduce database lookups.

Install : npm install cookie-session

Examples :

// 
var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.use(cookieSession({
  name: 'session',
  // keys: [secret keys]

  // Cookie Options
  // maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))




cookieSession(options) : 

Create a new cookie session middleware with the provided options. This middleware will attach the property session to req, which provides an object representing the loaded session. 
This session is either a new session if no valid session was provided in the request, or a loaded session from the request.

The middleware will automatically add a Set-Cookie header to the response if the contents of req.session were altered. 
Note that no Set-Cookie header will be in the response (and thus no session created for a specific user) unless there are contents in the session, 
so be sure to add something to req.session as soon as you have identifying information to store for the session.

Options
Cookie session accepts these properties in the options object.

name
The name of the cookie to set, defaults to session.

keys
The list of keys to use to sign & verify cookie values, or a configured Keygrip instance. Set cookies are always signed with keys[0], 
while the other keys are valid for verification, allowing for key rotation. If a Keygrip instance is provided, it can be used to change signature parameters like the algorithm of the signature.

secret
A string which will be used as single key if keys is not provided.

Cookie Options
Other options are passed to cookies.get() and cookies.set() allowing you to control security, domain, path, and signing among other settings.

The options can also contain any of the following (for the full list, see cookies module documentation:

1. maxAge: a number representing the milliseconds from Date.now() for expiry
2. expires: a Date object indicating the cookie’s expiration date (expires at the end of session by default).
3. path: a string indicating the path of the cookie (/ by default).
4. domain: a string indicating the domain of the cookie (no default).
5. sameSite: a boolean or string indicating whether the cookie is a “same site” cookie (false by default). This can be set to 'strict', 'lax', 'none', or true (which maps to 'strict').
6. secure: a boolean indicating whether the cookie is only to be sent over HTTPS (false by default for HTTP, true by default for HTTPS). If this is set to true and Node.js is not directly over a TLS connection, be sure to read how to setup Express behind proxies or the cookie may not ever set correctly.
7. httpOnly: a boolean indicating whether the cookie is only to be sent over HTTP(S), and not made available to client JavaScript (true by default).
8. signed: a boolean indicating whether the cookie is to be signed (true by default).
9. overwrite: a boolean indicating whether to overwrite previously set cookies of the same name (true by default).

 */


// Note :
// Browsers store cookies ,it's browser's default behaviors. When user send any type of request (get,patch,post,delete) to the server these cookies will go along with that request.
//  This is done by browser itself.

// Cookies are domain specific. meaning you to go facebook.com then facebook will create a separate cookie for your browser and if you go to flipkat.com then flipkart will generate
// separate cookies for you.now if you send a request(get,put,post,patch) to facebook then that cookie will be send by browser which was generated by facebook not by flipkat.