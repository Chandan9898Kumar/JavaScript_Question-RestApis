//                                                   Note : Here we are covering Express other features.

const express = require('express');
const app = express();  // The main app
const student = express();
const teacher = express();
const PORT = 3000;

// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
 

//  Express.js express.text() Function : 
// The express.text() function is a built-in middleware function in Express. It parses the incoming request payloads into a string and is based on body-parser.

// Syntax: 

// express.text( [options] )
// Parameter: The options parameter contains various properties like defaultCharset, inflate, limit, verify, etc.

// Return Value: It returns an Object.

app.use(express.text());

// Note :Now make a POST request with header set to ‘content-type: text/plain’ and body {“title”:”Geeky”}.



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Express express.Router() Function : 

// The express.Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests. 

// Syntax:
// express.Router( [options] )

// Optional Parameters:-
// case-sensitive: This enables case sensitivity.
// mergeParams:    It preserves the req.params values from the parent router.
// strict:         This enables strict routing.
// Return Value:   This function returns the New Router Object. 


 
// Multiple routing
const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();
 
router1.get('/user', function (req, res, next) {
    console.log(app.mountpath)
    console.log("User Router Working");
    res.end();
});
 
router2.get('/admin', function (req, res, next) {
    console.log("Admin Router Working");
    res.end();
});
 
router3.get('/student', function (req, res, next) {
    console.log("Student Router Working");
    res.end();
});
 
app.use(router1);
app.use(router2);
app.use(router3);
 

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Multiple mounting : Mount Event
teacher.on('mount', function (parent) {
    console.log('Teacher Mounted');
});
 
student.on('mount', function (parent) {
    console.log('Student Mounted');
});
 
app.use('/student', student);
app.use('/teacher', teacher);



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------





// Setting multiple locals variable for app.locals.
app.locals.domain = 'www.sample.com'
app.locals.age = '24'
app.locals.company = 'ABC Ltd'
 
console.log(app.locals);


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//                                                                          app.all() Function

//  Example: So instead of writing app.get we can use app.all ,it automatically accept all type of HTTP request (POST, GET, PATCH, DELETE,).we just have make get call with axios.get() where we have defined our apis.

app.get('/user', function (req, res, next){
    res.send('Success')

})


app.all('/user', function (req, res, next) {
    console.log('USER API CALLED');
    res.send('Success')
});


app.post('/post', function (req, res, next){
    res.status(200).send('Success')  
})

//  instead we can use app.all ,in frontend we  have make get/post call and here in backend app.all automatically identify which http method is being called.

app.all('/post', function (req, res, next){
    res.status(200).send('Success')  
})


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                   app.delete()

// The app.delete() function is used to route the HTTP DELETE requests to the path which is specified as a parameter with the callback functions being passed as a parameter.

// Syntax: 

// app.delete(path, callback)

// Parameters: 
// path: It is the path for which the middleware function is being called.
// callback: It is a middleware function or a series/array of middleware functions. 



app.delete('/delete', (req, res) => {
    res.send("DELETE Request Called successfully")
})
 


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                      app.use()

// This middleware will not allow the
// request to go beyond it
app.use(function (req, res, next) {
    console.log("Middleware called")
    next(); // It means pass control to the next handler
    //  if we remove next() method then below app.get() will not be called. 
});
 
// Requests will never reach this route
app.get('/user', function (req, res) {
    console.log("/user request called");
    console.log(req.app);  // The req.app property holds the reference to the instance of the Express application that is using the middleware. 

    console.log(req.baseUrl); // The req.baseUrl property is the URL path on which a router instance was mounted.

    //  The req.cookies property is used when the user is using cookie-parser middleware.
    req.cookies.name = 'Gourav';
    req.cookies.age = 12;
    console.log(req.cookies);

    console.log(req.fresh);

    console.log(req.ip); // t is useful when the user wants the IP address of the incoming request made to the application. 

    console.log(req.ips); // It returns an array of IP addresses.

    console.log(req.path); // o/p - /user

    console.log(req.protocol); // o/p -  http  == The req.protocol property contains the request protocol string which is either HTTP or (for TLS requests) https.

    res.send('Welcome to GeeksforGeeks');
});









// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                            Express app.listen() Function



app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});


/**
 * app.listen() in Express is like telling your app to start listening for visitors on a specific address and port, much like how Node listens for connections. 
 * The app, created by `express()`, is just a handy function that handles different types of requests, making it easy to serve both HTTP and 
 * HTTPS versions of your app without extra complexity.

Syntax: 
app.listen([port[, host[, backlog]]][, callback])

Parameters:

Port: It specifies the port on which we want our app to listen.

Host (Optional): It specifies the IP Address of the host on which we want our app to listen. You can specify the host if and only if you have already specified the port.
(since you have a closing(‘]’) bracket after ([, host[, backlog]]) as you can see in the above syntax, so this means the port must be specified before specifying host and backlog).

Backlog (Optional): It specifies the max length of the queue of pending connections. You can specify the backlog if and only if you have already specified the port and host. 
(since you have a closing bracket after ([, backlog]), so this means you will have to specify the host before specifying backlogs)

Callback (Optional):  It specifies a function that will get executed, once your app starts listening to the specified port. You can specify callback alone i.e.,
 without specifying port, host, and backlogs.( since this is a separate set of arguments in opening and closing brackets([, callback]),
 this means you can specify these arguments without specifying the argument of previous opening and closing square brackets.
 * 
 */










// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------







//                                                      Express.js app.locals Property

/**
 * The app.locals object has properties that are local variables within the application. These variables are local to the application and are very useful. 
 * This means you can declare a variable in your app.js with locals and access it within that script or pass it to the response object

Syntax:
app.locals

Parameter: No parameters. 
 *

res.locals
With this you can set or send variables to client side html/view and it is only available in that view/html.

e.g:
app.get('/view', function(req, res) {
  res.locals.user = req.user;
});
Here the user variable is available in your html page requesting the view route.

req.app.locals :
Locals are available in middleware via req.app.locals;
 * 
 */




//                                                      Express.js app.mountpath Property
/**
 * The app.mountpath property contains one or more path patterns on which a sub-app was mounted. 
 * 
 * Ex - 
 * app.get('/', function (req, res) {
    console.log(app.mountpath)
    res.send("OK")
});
 * 
 */




//                                                     Express.js Mount Event

/**
 * The mount event is fired on a sub-app when it is mounted on a parent app and the parent app is basically passed to the callback function. 

Syntax:
app.on('mount', callback(parent))

Parameter: It is an event named ‘mount’, and the callback function is called when this event is called. 
Return Value: Since it’s an event so it doesn’t have any return value. 

 * 
 */




//                                                   Express.js | app.all() Function


//  The app.all() function is used to route all types of HTTP requests. Like if we have POST, GET, PUT, DELETE, etc, requests made to any specific route,
//  let’s say /user, so instead of defining different APIs like app.post(‘/user’), app.get(‘/user’), etc, we can define single API app.all(‘/user’) 
//  which will accept all type of HTTP request. 

// Syntax:
// app.all( path, callback )

// Parameters:

// Path: It is the path for which the middleware function is called.
// Callback: It can be a middleware function or a series/array of functions.






//                                                 app.disable

//  The app.disable() function is used to set the boolean setting name to false. It is basically the shorthand for the app.set(name, false). 
// So instead we can use app.disable(name) function to set the false boolean value to some system Express.js settings. 

// Syntax:

// app.disable(name)


//  Example :  
// app.disable('trust proxy');
 
// console.log(app.get('trust proxy')); //  o/p - false



//                                                  app.enable

// The app.enable() function is used to set the boolean value i.e. name to true. It is basically the shorthand for the app.set(name, true) or app.set(name, false).
//  So instead we can use app.enable(name) function to set boolean values to some system Express.js settings.

// Syntax:
// app.enable(name)


// Example :

// app.enable('trust proxy')
 
// console.log(app.get('trust proxy')) // o/p :  true







//                                                 app.use()

// The app.use() function is used to mount the specified middleware function(s) at the path that is being specified. It is mostly used to set up middleware for your application. 

// Syntax:

// app.use(path, callback)
// Parameters:

// path: It is the path for which the middleware function is being called. It can be a string representing a path or path pattern or a regular expression pattern to match the paths.
// callback: It is a middleware function or a series/array of middleware functions.








//                                          Express.js | app.set() Function

// The app.set() function is used to assign the setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server. 

// Syntax:

// app.set(name, value)


//  Example:

// app.set('title', 'GeeksforGeeks');
 
// app.get('/', (req, res) => {
//     res.send(app.get('title'));
// })
 





//                                          Express.js req.app Property


// The req.app property holds the reference to the instance of the Express application that is using the middleware. 

// Syntax:
// req.app

// Parameter: No parameters. 




//                                          Express.js req.baseUrl Property

//   The req.baseUrl property is the URL path on which a router instance was mounted. The req.baseUrl property is similar to the mount path property of the app object, except app.mountpath returns the matched path pattern(s). 

// Syntax:
// req.baseUrl

// Parameter: No parameters. 







/**                                         Express req.body Property
 * 
The req.body property contains key-value pairs of data submitted in the request body. By default, it is undefined and is populated when you use a middleware called body-parsing such as express.urlencoded() or express.json(). 
Syntax:

req.body
Parameter: No parameters. 
 * 
 * 
 */



/**                                         Express.js req.cookies Property
 * 
 * The req.cookies property is used when the user is using cookie-parser middleware. This property is an object that contains cookies sent by the request. 

Syntax:
req.cookies

Parameter: No parameters. 
 * 
 */






/**                                         Express.js req.fresh Property
 * 
 * The req.fresh property returns true if the response is still ‘fresh’ in the client’s cache else it will return false. 

Syntax:
req.fresh

Parameter: No parameter 

Return Value: True or False 
 * 
 */




/**                                        Express.js req.fresh Property
 * 
 * The req.fresh property returns true if the response is still ‘fresh’ in the client’s cache else it will return false. 

Syntax:
req.fresh

Parameter: No parameter 

Return Value: True or False 
 * 
 */




/**                                     Express.js req.accepts() Function
 * 
 * The req.accepts() function checks if the specified content types are acceptable on the basis of the requests Accept HTTP header field. 
 * The method returns the best match, else it returns false if none of the specified content types is acceptable. 

Syntax:
req.accepts( types )
Parameter: The type value is a single MIME type string. 

Return Value: String 

 */




/**                                   Express req.params Property
 * 
The req.params property is an object containing properties mapped to the named route “parameters”.
For example, if you have the route /student/:id, then the “id” property is available as req.params.id. This object defaults to {}. 

Syntax:
req.params

Parameter: No parameters. 

Return Value: Object 
 * 

Example :

const express = require('express');
const e = require('express');
const app = express();
const PORT = 3000;
 
const student = express.Router();
app.use('/student', student);
 
student.get('/profile/:start/:end', function (req, res) {
    console.log("Starting Page: ", req.params['start']);
    console.log("Ending Page: ", req.params['end']);
    res.send();
})
 
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

 */








/**                                         Express.js req.ip Property
 * 
 * The req.ip property contains the remote IP address of the request. It is useful when the user wants the IP address of the incoming request made to the application. 

Syntax:
req.ip

Parameter: No parameter. 

Return Value: String 
 * 
 * 
 * Note : make a GET request with the header set to x-forwarded-for: 203.0.113.195, and in console.log(request.ip) you will see this.
 * 
 */



/**                                         Express.js req.ips Property

The req.ips property contains an array of IP addresses specified in the X-Forwarded-For request header. It returns an array of IP addresses. 

Syntax:
req.ips

Parameter: No parameter. 

Return Value: Array
 * 
 * 
 * 
 * Note :  make a GET request  with header set to x-forwarded-for: 203.0.113.195, 70.41.3.18, 150.172.238.178, 


 */






/**                                       Express.js req.path Property

The req.path property contains the path of the request URL. This property is widely used to get the path part of the incoming request URL. 

Syntax:
req.path

Parameter: No parameters. 

Return Value: String 
 *
 * 
 */





/**                                         Express.js req.protocol Property

The req.protocol property contains the request protocol string which is either HTTP or (for TLS requests) https. When the trust proxy setting does not evaluate to false, 
this property will use the X-Forwarded-Proto header field value if it is present. 

Syntax:
req.protocol

Parameter: No parameters. 

Returns: String. 
 * 
 */