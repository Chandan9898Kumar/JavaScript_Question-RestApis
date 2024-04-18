### Express :
`is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Express provides a thin layer of fundamental web application features, without obscuring Node.js features.`

`Express : It is basically a back-end web application framework for Node.js designed for building various web applications and APIs.`

OR

`Express.js is a small framework that works on top of Node.js web server functionality to simplify its APIs and add helpful new features. It makes it easier to organize your application’s functionality with middleware and routing. It adds helpful utilities to Node.js HTTP objects and facilitates the rendering of dynamic HTTP objects.`

`Helps in Creating a robust API quick and easy with a plethora of HTTP utility methods and middleware at your disposal. Express adds a thin layer of fundamental web application features without interfering with the Node.js. One of the main advantages of this framework is defining different routes or middleware to handle the client’s different incoming requests.`



`Note:`
1. Node js: It is an open-source JavaScript Back-End technology.
2. Express.js: It is a node.js server framework.It is a lightweight web application framework for node.js used to build the back-end of web applications relatively fast and easily. 

### Why Express(Web Framework) ?

1. Develops Node.js web applications quickly and easily.
2. It’s simple to set up and personalise.
3. Allows you to define application routes using HTTP methods and URLs.
4. Includes a number of middleware modules that can be used to execute additional requests and responses activities.
5. Simple to interface with a variety of template engines, including Jade, Vash, and EJS.
6. Allows you to specify a middleware for handling errors.


### Installing Express:


`We can install it with npm. Make sure that you have Node.js and npm installed.`

`Step 1: Creating a directory for our project and make that our working directory.`
$ mkdir backend
$ cd backend 

`Step 2: To create a nodejs application, because our express server will work inside the node application. Using npm init command to create a package.json file for our project`
$ npm init
This command describes all the dependencies of our project. The file will be updated when adding further Installing Express

1. Note: Use `npm init -y` for default initialization

Step 3: Now in your backend folder type the following command line
$ npm install express --save

Step 3: `Now install Express in the myapp directory and save it in the dependencies list. This Install necessary dependencies for our application. For example:`
$ npm install express.

Step 3: To install Express temporarily and not add it to the dependencies list:
$ npm install express --no-save

Step 4.  `Install node : npm i express nodemon` 

Step 5 . `Install cors : npm install express cors --save` 

Step 6.   `npm install cookie-parser`




###                                                         Using middleware
Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

1. Execute any code.
2. Make changes to the request and the response objects.
3. End the request-response cycle.
4. Call the next middleware function in the stack.
5. If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

1. Application-level middleware
2. Router-level middleware
3. Error-handling middleware
4. Built-in middleware
5. Third-party middleware


### Express has the following built-in middleware functions:

1. express.static serves static assets such as HTML files, images, and so on.
2. express.json parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
3. express.urlencoded parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+




### Why Express ‘app’ and ‘server’ files kept separately ?

Express is a simple and minimalistic framework for web applications in Node.js. Express provides a rich collection of features for development of both web and mobile applications. In any web or mobile application, each module or layer should be only responsible for a single task and should not deal with other tasks. This allows the application to be broken into smaller building blocks, which helps in reducing code complexity and data to be abstracted from other layers.

Applying a similar concept to the project structuring of Express, the separation of the application logic from the server allows the code to be modular and follow a MVC (Model-View-Controller) model. The separation is essential to reduce coupling and to encapsulate and abstract the inside logic of application.

Each of the components and their responsibilities in Express are discussed below:

Server: The server is responsible solely for the initialization of the middleware, setting up the engine, and the routes through which requests are made. These routes consist of the main application or function logic.


App: The ‘app’ file contain the main business logic of the web application and is responsible for its execution. It also contains access to the backend database and data models. The ‘app’ consists of two main components – routes and controllers. These are discussed below.

Routes: Routes, as the name suggests, are responsible for defining the routes within the application. Code snippet for defining routes in routes/index.js.

Controllers: The controllers contain the logic to be executed. They also control the views rendered. Code snippet for defining controllers.



### Advantages of ‘server’ and ‘app’ separation:

1. Data Abstraction and Encapsulation: While the server consists only of logic that deals with server configuration, setting up the middleware and initializing the routes, the app takes care of the application logic and abstracts the data model and business logic from the server layer. This ensures that the database/data is abstracted from the server layer and encapsulated by the application layer.

2. Modularity: By keeping the server and app functionalities separate, the code is divided into multiple modules, each having a single task or responsibility to perform. These can be individually used whenever required as there is a reduced dependency between modules. Duplicate code can be avoided through a clear separation of logic.

3. Scalability: Each individual component is assigned a unique responsibility. This allows changes to be made quickly without having to make changes everywhere in the code. For example, consider the logic of a module that is to be changed, which is being used as a submodule in several other functions. If the logic is a separate module, the change would only have to be made in that one module, instead of all the functions in which the usage of logic occurs.

4. Reusability: Since the application is divided into multiple modules that are assigned a single task, they can be reused in the application multiple times whenever the need be. For example, an application requiring the conversion of minutes into seconds multiple times might define this conversion as a separate function, to avoid the hassle of re-writing the logic throughout the application again and again.







<!--                                                                JWT                                                                 -->


###                                            JWT Authentication with Node.js

JSON Web Token is an open standard for securely transferring data within parties using a JSON object. JWT is used for stateless authentication mechanisms for users and providers,
this means maintaining sessions on the client side instead of storing sessions on the server. 

                                              Token-Based Authentication:
It is a more secure and scalable alternative to basic authentication.
JSON Web Tokens(JWT) are commonly used in Express to implement token-based authentication.
When the user logs in, the server generates a token containing the user’s information.
Then the server sends the token to the client in response.
The client stores the token in the form of a cookie or local storage.
In the subsequent request, the client includes this token in the header, enabling the server to validate the user.
The features of token-based auth include expiration time and digital signatures enhancing the security and integrity of the data.


`Note :`
JSON web token is an efficient, secured as well mostly used method of transferring or exchanging data on the internet. Generally, it is used for authentication and authorization in applications. The workflow of the authentication is we generate the token at the server and send back it to the client which is used for further requests on the server.



###                                     What is JSON Web Token?

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

Although JWTs can be encrypted to also provide secrecy between parties.

`Signed tokens` can verify the integrity of the claims contained within it, while encrypted tokens hide those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.


###                                    When should you use JSON Web Tokens?

`Here are some scenarios where JSON Web Tokens are useful:`

1. `Authorization:` This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.

2. `Information Exchange:` JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed—for example, using public/private key pairs—you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.


###                                     What is the JSON Web Token structure?

In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:

1. Header
2. Payload
3. Signature

Therefore, a JWT typically looks like the following.

xxxxx.yyyyy.zzzzz

Let's break down the different parts.


1. `Header`
The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.
For example:

{
  "alg": "HS256",
  "typ": "JWT"
}

Then, this JSON is Base64Url encoded to form the first part of the JWT.


2. `Payload`

Payload
The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data.
There are three types of claims: 
1. registered
2. public.
3. private claims.


1. Registered claims:
These are a set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims. Some of them are: iss (issuer), exp (expiration time), sub (subject), aud (audience), and others.

`NOTE `: Notice that the claim names are only three characters long as JWT is meant to be compact.

2. Public claims:
These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision resistant namespace.


3. Private claims: 
These are the custom claims created to share information between parties that agree on using them and are neither registered or public claims.

An example payload could be:

{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
The payload is then Base64Url encoded to form the second part of the JSON Web Token.

`NOTE :`Do note that for signed tokens this information, though protected against tampering, is readable by anyone. Do not put secret information in the payload or header elements of a JWT unless it is encrypted.




###                                         Signature
To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:

HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key,it can also verify that the sender of the JWT is who it says it is.




###                                     How do JSON Web Tokens work?

In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned. Since tokens are credentials,great care must be taken to prevent security issues. In general, you should not keep tokens longer than required.
You also should not store sensitive session data in browser storage due to lack of security.

`Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the Authorization header using the Bearer schema. The content of the header should look like the following:`

Authorization: Bearer <token>

This is a stateless authentication mechanism as the user state is never saved in the server memory.The server’s protected routes will check for a valid JWT in the Authorization header, and if there is, the user will be allowed. As JWTs are self-contained, all the necessary information is there, reducing the need of going back and forward to the database.

This allows to fully rely on data APIs that are stateless and even make requests to downstream services. It doesn’t matter which domains are serving your APIs,
as Cross-Origin Resource won’t be an issue as it doesn’t use cookies.
If the token is sent in the Authorization header, Cross-Origin Resource Sharing (CORS) won't be an issue as it doesn't use cookies.


Note that if you send JWT tokens through HTTP headers, you should try to prevent them from getting too big. Some servers don't accept more than 8 KB in headers. If you are trying to embed too much information in a JWT token, like by including all the user's permissions, you may need an alternative solution, like Auth0 Fine-Grained Authorization.



`The following shows how a JWT is obtained and used to access APIs or resources:`

1. The application or client requests authorization to the authorization server. This is performed through one of the different authorization flows. For example, a typical OpenID Connect compliant web application will go through the /oauth/authorize endpoint using the authorization code flow.

2. When the authorization is granted, the authorization server returns an access token to the application.

3. The application uses the access token to access a protected resource (like an API).


`NOTE:` 
With signed tokens, all the information contained within the token is exposed to users or other parties, even though they are unable to change it.This means you should not put secret information within the token.





###                                                 Why should we use JSON Web Tokens?

Let's talk about the benefits of JSON Web Tokens (JWT) when compared to Simple Web Tokens (SWT) and Security Assertion Markup Language Tokens (SAML).


1. As JSON is less verbose than XML, when it is encoded its size is also smaller, making JWT more compact than SAML. This makes JWT a good choice to be passed in HTML and HTTP environments.

2. Security-wise, SWT can only be symmetrically signed by a shared secret using the HMAC algorithm. However, JWT and SAML tokens can use a public/private key pair in the form of a X.509 certificate for signing. Signing XML with XML Digital Signature without introducing obscure security holes is very difficult when compared to the simplicity of signing JSON.


3. JSON parsers are common in most programming languages because they map directly to objects. Conversely, XML doesn't have a natural document-to-object mapping. This makes it easier to work with JWT than SAML assertions.

Regarding usage, JWT is used at Internet scale. This highlights the ease of client-side processing of the JSON Web token on multiple platforms, especially mobile.





<!--                                                                                                                                                                             -->
###                                                       What is API authentication?

API authentication verifies that a user is who they claim to be.But no matter what method you use, you want to make sure that each user (or client application) connecting to your API proves their identity.

1. Basic authentication
Basic HTTP authentication is the simplest method of API authentication. It involves adding a username and password to the request in every API call.

2. Token Authentication
Token authentication is also known as bearer authentication. To use it, you just specify -  Authorization: Bearer <token>, where the token is a string that represents the user’s identity and permissions. If you have (bear) the token, you can get the appropriate access to the API.

3. OAuth authentication
OAuth is an open authorization framework that uses a type of token authentication, but it leverages credentials from one service provider to log into other service providers.



###                                                       What is API authorization?

After you prove the user's identity, you can check which data that user is allowed to access. That process is authorization. Authorization ensures that the user is authorized to view or edit a specific set of data.






###                                                     Caching
`Caching is the ability to store copies of frequently accessed data in several places along the request-response path.`

When a consumer requests a resource representation, the request goes through a cache or a series of caches (local cache, proxy cache, or reverse proxy) toward the service hosting the resource.

If any of the caches along the request path has a fresh copy of the requested representation, it uses that copy to satisfy the request. If none of the caches can satisfy the request, the request travels to the service (or origin server as it is formally known).

By using HTTP headers, an origin server indicates whether a response can be cached and, if so, by whom, and for how long.

Caches along the response path can take a copy of a response, but only if the caching metadata allows them to do so.


<!--                                                     OR                                                                                                            -->

###                                                      Cache

`A cache is a temporary storage that provides quick access to frequently used data. And it’s usually stored in memory for low latency. But available memory is limited. So it’s important to update the cache the right way.`

                                                          OR

A cache is a storage location where data can be stored for quick and easy access. Caches are used in a variety of applications, including computers, web browsers, and web servers.
When data is stored in a cache, it is stored in a temporary location so that it can be quickly accessed.
Caching is important because it helps improve the speed and performance of a system.
When data is cached, it can be quickly accessed, which reduces the amount of time that a system must wait for data to be retrieved from the main memory.


###                                                      Cache Data
Caching stores copies of frequently accessed data. Caching response data can :

1. Reduce bandwidth usage
2. Reduce response latency
3. Reduce load on servers
4. Temporarily hide network failures

`NOTE :` GET requests are automatically cached. PUT and DELETE are not.Caching can be controlled using cache control headers in a request.


### Note :                                                Cache Control

`Cache-control is an HTTP header used to specify browser caching policies in both client requests and server responses. Policies include how a resource is cached, where it’s cached and its maximum age before expiring (i.e., time to live).`

1. `Cache-Control: Max-Age`
The max-age request directive defines, in seconds, the amount of time it takes for a cached copy of a resource to expire. After expiring, a browser must refresh its version of the resource by sending another request to a server.

For example, cache-control: max-age=120 means that the returned resource is valid for 120 seconds, after which the browser has to request a newer version.

2. `Cache-Control: No-Cache`
The no-cache directive means that a browser may cache a response, but must first submit a validation request to an origin server.

3. `Cache-Control: No-Store`
The no-store directive means browsers aren’t allowed to cache a response and must pull it from the server each time it’s requested. This setting is usually used for sensitive data, such as personal banking details.

4. `Cache-Control: Public`
The public response directive indicates that a resource can be cached by any cache.

5. `Cache-Control: Private`
The private response directive indicates that a resource is user specific—it can still be cached, but only on a client device. For example, a web page response marked as private can be cached by a desktop browser, but not a content delivery network (CDN).



###                                                       Caching in REST APIs
Being cacheable is one of the architectural constraints of REST.

1. GET requests should be cachable by default – until a special condition arises. Usually, browsers treat all GET requests as cacheable.
2. POST requests are not cacheable by default but can be made cacheable if either an Expires header or a Cache-Control header with a directive,to explicitly allows caching, is added      
   to the response.
3. Responses to PUT and DELETE requests are not cacheable at all.







###                                           How do sessions work in Express.js with Node.js?


`Overview`
Express.js uses a cookie to store a session id (with an encryption signature) in the user's browser and then, on subsequent requests, uses the value of that cookie to retrieve session information stored on the server. This server side storage can be a memory store (default) or any other store which implements the required methods.

                                                                        OR

Express.js, a Node.js framework, enhances web applications with express-session for session management. This middleware overcomes the stateless nature of HTTP by enabling persistent user sessions, stored in server memory or a database. It transforms HTTP interactions into stateful experiences, allowing the server to recognize and track users across requests with unique session IDs, ensuring continuous user-state monitoring and enhanced security.


`Details`
Express.js/Connect creates a 24-character Base64 string using utils.uid(24) and stores it in req.sessionID. This string is then used as the value in a cookie.



`Client Side`
Signed cookies are always used for sessions, so the cookie value will have the following format.

[sid].[signature]

Where [sid] is the sessionID and [signature] is generated by signing [sid] using the secret key provided when initializing the session middleware. The signing step is done to prevent tampering. It should be computationally infeasable to modify [sid] and then recreate [signature] without knowledge of the secret key used. The session cookie is still vulnerable to theft and reuse, if no modification of [sid] is required.

The name for this cookie is :-  connect.sid


`Server Side`
If a handler occurs after the cookieParser and session middleware it will have access to the variable req.cookies. This contains a JSON object whose keys are the cookie keys and values are the cookie values. This will contain a key named connect.sid and its value will be the signed session identifier.

###                                                Working

`The Flow of Cookie-based Session Management : -`
1. New login request is sent by the browser to the server.
2. The server will then determine if any cookies have been sent by the browser.
3. There isn't going to be a cookie value inside the server database for this request because it is a new one.
4. As a result, the server will send a cookie to your browser and store its ID there.
5. The browser will then create the cookie for the domain of that server.
6. Your browser should deliver the cookie in the HTTP header with each request for that server's website.
7. The ID given by the browser will then be checked by Server. Then, the server will use the session indicated by the cookie if that is the case.


`Format :-`

app.use(session({
 secret: 'keyboardcat',
 resave: false,
 saveUninitialized: true,
 cookie: { secure: true }
}))


`Parameters Description : `

1. `Cookie.secure` : For automatic alignment with the connection's security level, the cookie.the secure option can optionally be set to the unique value "auto". If the site is accessible via both HTTP and HTTPS, use caution when utilizing this setting because after the cookie is placed on HTTPS, it is no longer visible over HTTP.

Name: The term to set in the response for the session ID cookie. The value by default is connect.sid.

2. `Resave`: Regardless of whether the express session was modified during the request, it is forced to be saved back to the session store. This may be required depending on your store, depending on the store you use. It can also lead to race conditions where the server receives two parallel requests from the client side. Even if the other request did not make any changes, any modifications made to the session in the first request might be overridden when it concludes. True is the default value, although using the default has been discouraged because it may change in the future.

3. `Rolling`: Constrain all responses to set the express session identifier cookie. The expiration countdown is reset, and the expiration is set to the initial maxAge. False is the default setting.

4. `saveUninitialized`: makes it necessary to save an uninitialized session to the store. When a session is created but not yet updated, it is uninitialized. False is a good option if you want to implement login sessions, utilize less server storage, or adhere to rules that demand consent before setting a cookie. False will also help in race-condition situations where a client sends out many requests concurrently without using a session. True is the default value, although using the default has been discouraged because it may change in the future.

5. `Secret`: That is a necessary choice. The express session ID cookie is signed using this secret. This could be an array of many secrets or a string for a single secret. Only the first member of an array of secrets will be used to sign the session ID cookie; however, all elements will be taken into account for determining whether the signature in requests is valid.

6. `store`: A new MemoryStore object by default serves as the session store instance.

7. `unset`: Control the outcome of req.session being unset (through delete, setting to null, etc.). Keep is the default value.

8. `cookie`: { maxAge: oneDay } : this determines when cookies expire. Following the specified period, the browser will remove the cookie. In the future, no requests will have the cookie associated with them. The following math was used to calculate the maxAge in this situation, which was set to one day.

9. `cookie.path`: Specifies the Path Set-Cookie value. This is set to '/' by default, which is the domain's base path.

10. `cookie.httpOnly`: The HttpOnly Set-Cookie attribute's conditional value is specified. The HttpOnly property is set when truthy; otherwise, it is not. The HttpOnly attribute is enabled by default. Be careful when setting this to true, as compliant clients will not allow client-side JavaScript to see the cookie in document.cookie.

11. `cookie.domain`: Specifies the Domain Set-Cookie property value. By default, no domain is specified, and most clients will interpret the cookie to only pertain to the current domain.

12. `cookie. expires`: The Date object is specified as the value for the Expires Set-Cookie property. By default, no expiration date is set, and most clients will regard this as a "non-persistent cookie" and delete it when a circumstance such as exiting a web browser application occurs.

13. `cookie.sameSite`: Specifies whether the SameSite Set-Cookie property should be boolean or string. This is set to untrue by default.
    true will set the SameSite attribute to Strict for strict same-site enforcement. false will not set the SameSite attribute.
    `lax` :   will set the SameSite attribute to Lax for lax same-site enforcement.
    `none` :  will set the SameSite attribute to None for an explicit cross-site cookie.
    `strict`: will set the SameSite attribute to Strict for strict same-site enforcement.


`When Should I Use Cookies?`
As the HTTP protocol is stateless, cookies let us monitor the status of the application using small files kept on the user's machine.


`When Should I Use Sessions?`
To more securely keep sensitive data on the server, out of the reach of malevolent users, such as the user id. Values are transferred across pages using express session.


`The Major Difference Between Cookies and Session : `

                      `Cookie`                                                                                      `Session`

1. Cookies are client-side files stored locally on a computer that contain user data.	             |    User data stored in the server side is called sessions.

2. Cookies expire when the user-defined lifespan expires.	                                         |    The session ends when the user closes the browser or logs out of the software.

3. It has a limited capacity for information storage.	                                             |    It has a practically infinite capacity for data storage.

4. We don't need to run a function to start cookies because they are stored locally on the machine.|	  The session start() function must be used to start the session.

5. Cookies are not secured.	                                                                       |    When compared to cookies, sessions are more secure.

6. Cookies save information to a text file.	                                                       |    Session saves data in encrypted form.




###                                                                   Session Store Implementation
Every express session store needs to implement certain methods and be an EventEmitter. The mandatory suggested and optional techniques are listed in the paragraphs that follow.
This module will always call the required methods on the store.
If applicable, this module will call for recommended methods for the store.

Optional methods are those that this module does not use at all but that aid in the user presentation of consistent stores.

`store.all(callback) : optional`
All express sessions in the store can be obtained as an array using this optional function. The callback should be used to refer to as callback(error, sessions).

`store.destroy(sid, callback) : required`
With a session ID, this necessary function is used to remove/destroy a session from the storage (sid). Once the session is terminated, the callback should be invoked as a callback(error).

`store.clear(callback) : optional`
All express sessions in the store can be deleted using this optional technique. Once the store has been cleaned, the callback should be invoked as callback(error).

`store.length(callback) : optional`
The number of all sessions in the shop can be obtained using this callback. The callback should be invoked as callback(error, len).

`store.get(sid, callback) : required`
When a session ID is provided, this necessary method is used to retrieve a session from the store (sid). The callback should be invoked as a callback(error, session).

`store.set(sid, session, callback) : required`
With an express session ID (sid) and session (session) object, this necessary function is used to upsert a session into the store. Once the session has been set up in the store, the callback should be invoked as callback(error).



###                                                                   Conclusion

1. HTTP is a stateless protocol, the client and server forget about one another after each request and response cycle.
2. The stateless HTTP protocol is used by a website to transport data from a client to a server.
3. Sessions enable the HTTP protocol to go from being stateless to stateful.
4. A session can be thought of as the period between logging in and logging out.
5. As the HTTP protocol is stateless, cookies let us monitor the status of the application using small files kept on the user's machine.
6. Cookies stored by the browser can hold a maximum of 4 KB.
7. This npm install command is used for express-session installation : $ npm install express-session
8. Every express session store needs to implement certain methods and be an EventEmitter.