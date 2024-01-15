### Express :
`is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Express provides a thin layer of fundamental web application features, without obscuring Node.js features.`

`Express : It is basically a back-end web application framework for Node.js designed for building various web applications and APIs.`

OR

`Express.js is a small framework that works on top of Node.js web server functionality to simplify its APIs and add helpful new features. It makes it easier to organize your application’s functionality with middleware and routing. It adds helpful utilities to Node.js HTTP objects and facilitates the rendering of dynamic HTTP objects.`

`Helps in Creating a robust API quick and easy with a plethora of HTTP utility methods and middleware at your disposal. Express adds a thin layer of fundamental web application features without interfering with the Node.js`

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












### Note :                                                  Cache Control

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

