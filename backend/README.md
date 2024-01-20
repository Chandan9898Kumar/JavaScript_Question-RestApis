### Express :
`is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Express provides a thin layer of fundamental web application features, without obscuring Node.js features.`

`Express : It is basically a back-end web application framework for Node.js designed for building various web applications and APIs.`

OR

`Express.js is a small framework that works on top of Node.js web server functionality to simplify its APIs and add helpful new features. It makes it easier to organize your application’s functionality with middleware and routing. It adds helpful utilities to Node.js HTTP objects and facilitates the rendering of dynamic HTTP objects.`

`Helps in Creating a robust API quick and easy with a plethora of HTTP utility methods and middleware at your disposal. Express adds a thin layer of fundamental web application features without interfering with the Node.js`



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