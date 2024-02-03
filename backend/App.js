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
//Here  setting attributes of the response header by updating the status code as 200, mime-type as ‘text/plain’,finally sends the message ‘Success’ to the browser.
    res.type('text/plain');
    res.send(200)
    res.send('Success')

//         OR Directly we can send like below:
            // res.status(200).send('Success')  // send itself have feature to estimate the type of file is being send,no need of res.type() 

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



//  Note :  app.use act as a super route or middleware meaning that it gets called on every route written below/after app.use.This middleware applied to all requests,either for specified paths or all paths:
//  "use" is used to apply some logic (middleware) to specific route or entire application, regardless of request method.



// This middleware will not allow the request to go beyond it
app.use(function (req, res, next) {
    console.log("Middleware called",req.url) // it will show urls whenever we hit the apis.
    next(); // It means pass control to the next handler
    //  if we remove next() method then below app.get() will not be called. 
});
 


// Requests will never reach this route if we remove middleware next() method from app.use()
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

    res.end()  // Terminate the connection without sending something to the client. if we don't want to send anything to the client,just use this instead of res.send()
});





/**
 app.use : it is useful for "middlewares", it will apply to all the GETs, POSTs, etc. you indicate afterwords. 
 For example, you can use a Middleware only before the GETs you want to be "with user/pass authentication".

1. Indicate the folder for static contents: app.use(express.static(__dirname + "/public"));

2. Including a parser for JSON contents: app.use(bodyParser.json());

3. Define the "Cookie Parser" signing string: app.use(cookieParser("Signing text example"));

4. Separate Routers for your URLs in different files: app.use("/api", apiRouter); or app.use("/news", newsRouter); or app.use("/", siteRouter);

5. For a custom error handler: app.use(sites404handler); or app.use(globalErrorHandler);



app.use basically used for :



1. Use for static path

//Set static path
app.use(express.static(__dirname + '/public'));



2. use as router
//user
app.use('/', require('./controllers/user'));



3. use for handling middleware
//Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));// Body parser use JSON data



4. Use for custom middleware
// force https
app.use ( (req, res, next) =>{
    if (req.secure) {
        // request was via https, so do no special handling
        next();
    } else {
        // request was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
    }
});



 */




//  NOTE : Important

//                                                              The Middleware Stack

/**
 In Express, everything is middleware. Internally, an Express app has a middleware stack, and calling use() adds a new layer to the stack. 
 Functions that define route handlers, like get() and post() also add layers to the stack. Express executes the middleware stack in order, 
 so the order in which you call use() function matters (will execute line by line meaning one after other).


For example :
one of the most common middleware functions is the cors middleware, which attaches CORS headers to your Express HTTP responses.
Make sure you call app.use(cors()) before defining any route handlers or anything else that sends an HTTP response, otherwise you won't get CORS headers!



EX: 1


const app = require('express')();

// This response will **NOT** have CORS headers, because order matters.Express will run the CORS middleware _after_ this route handler.

app.get('/nocors', (req, res) => {
  res.send('ok');
});

app.use(require('cors')());

// This response will have CORS headers, because this route handler is after the CORS middleware in the middleware list.

app.get('/cors', (req, res) => {
  res.send('ok');
});







EX: 2

Another common middleware function is Express' body parser. This middleware is responsible for parsing the request body and setting the req.body property. 
Make sure you call app.use(express.json()) before using req.body, otherwise it will be undefined!



const express = require('express');
const app = express();

// for this post method `body` will always be `undefined` in the HTTP response, because Express will run the JSON body parser _after_ this route handler.

app.post('/nobody', (req, res) => {
  res.json({ body: req.body });
});

app.use(express.json());

// for this post method `body` will contain the inbound request body.this route handler is after the json middleware in the middleware list
app.post('/body', (req, res) => {
  res.json({ body: req.body });
});





//  ----------------------------------------------------------------The path Parameter--------------------------------------------------------------------------------

Although the use() function is typically called with only 1 parameter, you can also pass it a path that tells Express to only execute the given middleware
when it receives a request for a URL that starts with the given path.

Ex: 3

const app = require('express')();

app.use('/cors', require('cors')());

// This response will **NOT** have CORS headers, because the path '/nocors' doesn't start with '/cors'
app.get('/nocors', (req, res) => {
  res.send('ok');
});


// This response will have CORS headers
app.get('/cors', (req, res) => {
  res.send('ok');
});


// This response will also have CORS headers, because '/cors/test' starts with '/cors'
app.get('/cors/test', (req, res) => {
  res.send('ok');
});


 */









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




// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



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




// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



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

//  Example 1:  it will set this to app level.

// app.set('title', 'GeeksforGeeks');
 
// app.get('/', (req, res) => {
//     res.send(app.get('title'));
// })
 

// Example 2:

// app.get('/', function (req, res) {
 
//   Setting the response in header. open network tab and check in response header it will reflect there.

//     res.set({
//         'Content-Type': 'text/plain',
//         'Content-Length': '123',
//         ETag: '12345'
//     });
 
//     console.log(res.get('Content-Type'));  o/p   -      "text/plain"
// });
 










/**                                         Express.js res.app Property
 * 
 * 
 The res.app property holds a reference to the instance of the Express application that is using the middleware. 

Syntax:
res.app

Parameter: No parameters. 
Return Value: Object 


example :

app.get('/getApp', function (req, res) {

    // Holds the reference to the instance of the Express application
    console.log(res.app);
    res.end();
});

 * 
 */









/**                                 Express.js res.headersSent Property
 * 
 * 
The res.headersSent property is a boolean property that indicates if the app sent HTTP headers for the response. 

Syntax:
res.headersSent

Parameter: No parameters. 
Return Value: This property returns a Boolean value either True or False. 
 * 

Example:

app.get('/', function (req, res) {
    res.send('OK');
    // After res.send()
    console.log(res.headersSent);
});

 */







/**                                     Express.js res.locals Property
 * 
 * 
 * The res.locals property is an object that contains response local variables scoped to the request and because of this, it is only available to the view(s) rendered during that request/response cycle (if any). 

Syntax:
res.locals

Parameter: No parameters. 
Return Value: Object 
 * 

Example:

app.get('/', function (req, res) {
 
    // Sending multiples locals
    res.locals.name = 'Gourav';
    res.locals.age = 13;
    res.locals.gender = 'Male'
 
    console.log(res.locals);
    res.end();
});

 */







/**                                     Express.js res.append() Function
 * 
 * 
The res.append() function appends the specified value to the HTTP response header field and if the header is not already set then it creates the header with the specified value. 

Syntax: 
res.append(field [, value])

Parameter: The field parameter describes the name of the field that need to be appended and the value parameter can be a string or an array.
Returns: It returns an Object.
 * 

Example:

// With middleware
app.use('/', function (req, res, next) {
    res.append('Warning', '201 Its a Warning');
    next();
})
 
app.get('/', function (req, res) {
    console.log(res.get('Warning'));
    res.send();
});


 */








/**                                     Express.js res.attachment() Function
 * 
 * 
 The res.attachment "Sets the HTTP response Content-Disposition header field to “attachment”."
 This essentially says, 'Hey, this file should be viewed as an attachment, not a webpage.'
 * 
 * 
 * 
 
The res.attachment() function is used to set the HTTP response Content-Disposition header field to ‘attachment’.
If the name of the file is given as a filename, then it sets the Content-Type based on the extension name through the res.type() function and finally sets the Content-Disposition ‘filename = ‘ parameter.

Syntax: 
res.attachment( [filename] )

Parameter: The filename parameter describes the name of the file.
Return Value: It returns an Object.



Example:

//   Place any file in the root directory of the project which can be attached, like here we have used Hello.txt.

app.get('/', function (req, res) {
    res.attachment('Hello.txt');
    res.send('hola')
    console.log(res.get('Content-Disposition'));
});

 */








/**                                            Express res.cookie() Function
 * 

The res.cookie() function is used to set the cookie name to value. The value parameter may be a string or object converted to JSON.

Syntax:
res.cookie(name, value [, options])
Parameters: The name parameter holds the name of the cookie and the value parameter is the value assigned to the cookie name. The options parameter contains various properties like encode, expires, domain, etc. 

Return Value: It returns an Object. 
 


Example:

app.use('/', function (req, res, next) {
    res.cookie('title', 'GeeksforGeeks');
    res.send("Cookie Set");
    next();
})


we see this cookie in network tab in response headers. it will be in Set-Cookie


 */









/**                        Express.js res.clearCookie() Function
 * 
The res.clearCookie() function is used to clear the cookie specified by name. This function is called for clearing the cookies which as already been set. For example, if a user cookie is set, then it can be cleared using this function. 

Syntax:
res.clearCookie(name, [ options ])
Parameters:

Name: It is the name of the cookie which is to be cleared. Like in the following example, we have cleared the title cookie.
Options: It is an object that can have various properties like domain, encode, path, secure, etc.


Example:

app.get('/', function (req, res) {
 
    // Setting cookie (key-value)
    res.cookie('title', 'geeksforgeeks');
 
    // Clearing the cookie
    res.clearCookie('title');
 
    console.log("Cookie cleared");
});



 */









/**                                 Express.js res.download() Function
 * 
 * 
 * The res.download() function transfers the file at the path as an ‘attachment’. Typically, browsers will prompt the user to download.

Syntax:

res.download(path [, filename] [, options] [, fn])
Parameters: The filename is the name of the file which is to be downloaded as an attachment and fn is a callback function. 

Return Value: It does not return anything. 
 * 
 
Example:

Place any file in the root directory of the project which can be downloaded, like here we have used Hello.txt. 

app.get('/', function (req, res) {
    res.download('hello.txt', function (error) {
        console.log("Error : ", error)
    });
});




 */








/**                            Express res.send() Function
 
The res.send() function sends the HTTP response. The body parameter can be a String or a Buffer object or an object or an Array.

Syntax: 

res.send( [body] )
Parameter: This function accepts a single parameter body that describes the body to be sent in the response.

Returns: It returns an Object.




Note:   
1. res.send() will check the structure of your output and set header information accordingly.

app.get('/',(req,res)=>{
       res.send('<b>hello</b>');
});


In Response headers:
content type: text/html




2.
  app.get('/',(req,res)=>{
         res.send({msg:'hello'});
});


In Response headers:
content type: application/json



3. res.send() will set "ETag" attribute in the response header while res.end() will NOT set this header attribute

Why is this tag important?
The ETag HTTP response header is an identifier for a specific version of a resource. It allows caches to be more efficient, and saves bandwidth, 
as a web server does not need to send a full response if the content has not changed.



The body parameter can be a Buffer object, a String, an object, or an Array. For example:

res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('<p>some html</p>');
res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });


 */









/**                                 Express.js res.end() Function

The res.end() function is used to end the response process. This method actually comes from the Node core, specifically the response.end() method of HTTP.ServerResponse. Use to quickly end the response without any data.

Syntax: 

res.end([data] [, encoding])
Parameters: The default encoding is ‘utf8’ and the data parameter is basically the data with which the user wants to end the response.

Return Value: It returns an Object.


                                        Note :  res.send() automatically call res.end() So you don't have to call or mention it after res.send()

Example :

app.get('/', function (req, res) {
    res.end();
});




with res.end() ,you can only respond with text and it will not set "Content-Type"

 app.get('/',(req,res)=>{
           res.end('<b>hello</b>');
      }); 

 */










/**                                        Express.js | res.format() Function
 

The res.format() function performs content negotiation on the Accept HTTP header on the request object if it is present. This function checks the Accept HTTP request header and then invokes the corresponding handler depending on the Accept value. 

Syntax:

res.format(object)


Example:


app.get('/', function (req, res) {
    res.format({
        html: function () {
            res.send('<p>Greetings from GeeksforGeeks</p>');
        },
        text: function () {
            res.send('Greetings from GeeksforGeeks');
        },
        json: function () {
            res.send({ message: 'Greetings from GeeksforGeeks' });
        }
    });
});



In the above example, the output will be { “message”: “Greetings from GeeksforGeeks” } when the user send request with Accept header field  set to ‘application/json’ and 
if the Accept header field is set to ‘text/plain’, we will get “Greetings from GeeksforGeeks” message in response.



 */










/**                                         Express.js res.get() Function 


The res.get() function returns the HTTP response header specified by the field. The match is case-insensitive.

Syntax: 

res.get( field )
Parameter: The field parameter describes the name of the field.

Return Value: It returns an Object.


Example:

app.get('/', function (req, res) {
 
    // Setting the response
    res.set({
        'Content-Type': 'text/plain',
        'Content-Length': '123',
        ETag: '12345'
    });
 
   
    console.log(res.get('Content-Type')); o/p   "text/plain"

Note : we can access whatever is in the response header here. by using res.get() method.

        console.log(res.get('Vary'));
});


 */








/**                           Express res.json() Function

The res.json() function sends a JSON response. This method sends a response (with the correct content-type) 
that is the parameter converted to a JSON string using the JSON.stringify() method.

Syntax:  

res.json( [body] )
Parameters: The body parameter is the body that is to be sent in the response.

Return Value: It returns an Object.


Example:

Note : It's important that you set the Content-Type header to application/json.

app.get('/', function (req, res) {

    res.setHeader('Content-Type', 'application/json'); // This is to set the response header for the client. you can check in network tab under response header. 

    res.json({ user: 'geek' });
});


 */








/**                                         Express.js res.jsonp() Function 

The res.jsonp() function is used to send a JSON response with JSONP support and this function is similar to the res.json() function
except that it opts-in to the support of JSONP callback.

Syntax: 

res.jsonp( [body] )
Parameter: The body parameter describes the body type which can be sent in response.

Return Value: It returns an Object.


Example:


app.get('/', function (req, res) {
    res.jsonp({ title: 'GeeksforGeeks' });
});
 
 */








/**                                             Express.js res.links() Function


The res.links() function is used to join the links provided as properties of the parameter to populate the response’s Link HTTP header field.

Syntax: 
res.links( links )

Parameter: The link parameter describes the name of the link to be joined.

Return Value: It returns an Object.


Example:


app.get('/', function (req, res) {
    res.links({
        next: 'http://demo.com?page=2',
        middle: 'http://demo.com?page=4',
        last: 'http://demo.com?page=6'
    });
 
    console.log(res.get('link'));
});




*/
 







/**                                         Express.js res.location() Function 


The res.location() function is used to set the response Location HTTP header to the path parameter which is being specified. 
Basically,it is used to set the response header(in network tab) . It doesn’t end the response, after using it you can write a response body if you want to write.

Syntax:

res.location( path )
Parameter:

path: It refers to the URL which is specified in the Referrer header of the request.



Example:

.it is used to set the response header.

app.get('/', function (req, res) {
    res.location('India');
    console.log(res.get('location'));
});



Note :  we can also Try res.setHeader() instead of res.location.

it is used to set the response header.

app.get('/', function (req, res) {
  res.setHeader('Location', foo); // it allows you to set only single header.
});


                                                    OR we can use res.set() method as well.

app.get('/', function (req, res) {
  res.set({'Location': 'Nepal',date:'12/12/12'}); // it allows you to set multiple headers
});

                                                    
Note :

The only difference is res.setHeader() allows you only to set a singular header and res.set() will allow you to set multiple headers.

 */












/**                                 Express JS res.redirect() Function 


The res.redirect() function redirects to the URL derived from the specified path, with specified status, an integer (positive) which corresponds to an HTTP status code.
The default status is “302 Found”. 

Syntax:

res.redirect([status] path)
Parameter: This function accepts two parameters as mentioned above and described below:

status: This parameter holds the HTTP status code
path: This parameter describes the path.



Type of paths we can enter:
1. We can enter the whole global URL e.g: https://www.geeksforgeeks.org/ 
2.cThe path can be relative to the root of the hostname e.g : /user with relative to http://hostname/user/cart will redirect to http://hostname/user
3. The path can be relative to the current URL e.g: /addtocart with relative to http://hostname/user/ will redirect to http://hostname/user/addtocart





Example:

app.use('/verify', function (req, res, next) {
    console.log("Authenticate and Redirect")
    res.redirect('/user');
    next();
});
 
app.get('/user', function (req, res) {
    res.send("User Page");
});




 */





/**                                     Express res.render() Function
 

The res.render() function in Express is used to render a view and sends the rendered HTML string to the client. 

Syntax: 

res.render(view [, locals] [, callback])
Parameters: This function accepts two parameters as mentioned above and described below:  

Locals: It is an object whose properties define local variables for the view.
Callback It is a callback function.




Example:

app.set('view engine', 'ejs');
 
// With middleware
app.use('/', function (req, res, next) {
    res.render('User')
    next();
});
 
app.get('/', function (req, res) {
    console.log("Render Working")
    res.send();
});



 */






/**                         Express.js res.sendStatus() Function
The res.sendStatus() function is used to set the response HTTP status code to statusCode and send its string representation as the response body.

Syntax: 
res.sendStatus( statusCode )

Parameter: The statusCode parameter describes the HTTP status code.
Returns: It returns an Object.


Example:

app.get('/', function (req, res) {
 
    // Equivalent to res.status(200).send('OK')
        res.sendStatus(200);
});


 
 */








/**                                     Express res.status() Function 

The res.status() function sets the HTTP status for the response. It is a chainable alias of Node’s response.statusCode. 

Syntax:
res.status( code )

Parameter: This function accepts a single parameter code that holds the HTTP status code. 

Return Value: It returns an Object. 


Example:

app.get('/user', function (req, res) {
    res.status(200).send("User Page");
})


 */











/**                                         Express.js res.set() Function

The res.set() function is used to set the response HTTP header field to value. To set multiple fields at once, pass an object as the parameter.

Syntax: 
res.set(field [, value])

Parameters: The field parameter is the name of the field and the value parameter is the value assigned to the field parameter.
Return Value: It returns an Object.


Example:

app.get('/', function (req, res) {
 
    // Setting the response . check in network tab
    res.set({
        'Content-Type': 'application/json',
        date:'12/12/12,
        Location:'USA
    });
 
    // "application/json"
    console.log(res.get('Content-Type'));
    res.end();
});



 */










/**                                          Express.js res.type() Function 

The res.type() function is used to set the Content-Type HTTP header to the MIME type determined by the mime.lookup() function for the specified type. 

Syntax: 
res.type( type )

Parameters: The type parameter describes the MIME type.

Return Value: It returns an Object.



Example:

app.get('/', function (req, res) {
    res.type('.png').send();
 
    // image/png
    console.log(res.get('Content-type'));
});



 */









/**                                 Express.js res.vary() Function


The res.vary() function is used to add the field to the Vary response header, if it is not there already. The Vary header indicates which headers it’s basically used for content negotiation.

Syntax: 
res.vary( field )

Parameter: The field parameter describes the name of the field.

Return Value: It returns an Object.


Example:

app.get('/', function (req, res) {
    res.consty('User-Agent').send(
        "Field added to the consty response header");


                                OR  we can set Vary with set() method as well

    res,set({'Vary:'Origin'})                            


});
 


 */









/**                                         Express.js router.METHOD() Function


The router.METHOD() method provides the routing functionality in Express, where METHOD is one of the HTTP methods, such as GET, PUT, POST, and so on, in lowercase. 

Syntax:
router.METHOD(path, [callback, ...] callback)

Parameter: The path parameter specifies the path on the URL and callback is the function that is executed when this path is called.

Return Value: Since, it provides the routing functionality, so it can return responses. 



Example 1:

const router = express.Router();
app.use(router);

// Single route
router.get('/user', function (req, res, next) {
    console.log("GET request called");
    res.end();
});
 
Note: Now make a GET request to http://localhost:3000/user, 




Example 2:

const router = express.Router();
app.use(router);


// Multiple routes
router.get('/user', function (req, res, next) {
    console.log("GET request called");
    res.end();
});
 
router.post('/user', function (req, res, next) {
    console.log("POST request called");
    res.end();
});
 
router.delete('/user', function (req, res, next) {
    console.log("DELETE request called");
    res.end();
})


Note : Now make GET, POST, and DELETE request to http://localhost:3000/user, 


 */










/**                                         Express.js router.all() Function


router.all: What this means is, it doesn't matter the method of the request.. (post, get, put), if the url matches, execute the function.
ex- router.all("/abc",fn) will be work for all request to /abc


The router.all() function is just like the router.METHOD() methods, except that it matches all HTTP methods (verbs). It is very helpful for mapping global logic for arbitrary matches or specific path prefixes. 

Syntax:
router.all(path, [callback, ...] callback)

Parameter: The path parameter is the path of the specified URL and the callback is the function passed as a parameter. 

Return Value: It returns responses. 



Example 1:


const router = express.Router();
app.use(router); 


// Setting single route

router.all('/user', function (req, res) {
    console.log("User Page Called");
    res.end();
});
 
Note : Now make any request to http://localhost:3000/user like POST, PUT, DELETE, or any other type of request.





Example 2:

const router = express.Router();
app.use(router);

// Setting multiple routes
router.all('/user', function (req, res) {
    console.log("User Page Called");
    res.end();
});
 
router.all('/student', function (req, res) {
    console.log("Student Page Called");
    res.end();
});
 
router.all('/teacher', function (req, res) {
    console.log("Teacher Page Called");
    res.end();
});
 


Note : Now make a GET request to http://localhost:3000/user, http://localhost:3000/student, and http://localhost:3000/teacher 



 */










/**                                         Express.js router.param() function 



The parameters of router.param() are a name and function. Where the name is the actual name of the parameter and the function is the callback function. Basically, the router.param() function triggers the callback function whenever the user routes to the parameter. This callback function will be called only a single time in the request-response cycle, even if the user routes to the parameter multiple times.

Syntax:
router.param(name, function)

Parameters of the callback function are: 

req: the request object
res: the response object
next: the next middleware function
id: the value of the name parameter




router.param('coolParamName') essentially registers a callback that will get called for any route (in that router) that uses the :coolParamName parameter and
matches the current request. The callback will get called once per request BEFORE the route that matches the request that contains the :coolParamName parameter.

It's kind of like middleware for a matching parameter. It allows you to automatically configure some setup code anytime that particular parameter is matched in a route.

Note : router.param() may be one of the least used features of Express.

 */









/**                                         Express.js router.route() Function 

The router.route() function returns an instance of a single route that you can then use to handle HTTP verbs with optional middleware. You can also use the router.route() function to avoid duplicate route naming as well as typing errors. 

Syntax:
router.route( path )

Parameter: The path parameter holds the path of the specified URL. 

Return Value: It returns responses. 



Example 1:

app.use(router);

// Single routing
router.route('/user').get(function (req, res, next) {
        console.log("GET request called");
        res.end();
    });
 

Example 2:

 
app.use(router);

// Multiple routing

router.route('/user')
    .get(function (req, res, next) {
        console.log("GET request called");
        res.end();
    })
    .post(function (req, res, next) {
        console.log("POST request called");
        res.end();
    })
    .put(function (req, res, next) {
        console.log("PUT request called");
        res.end();
    });



 Note : Now make GET, POST, and PUT requests to http://localhost:3000/user



Note :


router.route(): this is nice way to define the different Method implementations for a single url end point.

lets just say you have two api end points. router.get("/jkl") and router.post("/jkl"), with router.route() you can sort of combine these different api handlers..

you can say router.route("/jkl").get(fn1).post(fn2)




 */



   





/**                             Express.js | router.use() Function




The router.use() function uses the specified middleware function or functions. It basically mounts middleware for the routes which are being served by the specific router. 

Syntax:
router.use( path, function )

Parameters:
Path: It is the path to this middleware, if we can have /user, now this middleware is called for all API’s having /user of this router.
function: This function is passed as a callback, it is called when the specified path is called in this router.



Example :

// All requests to this router will
// first hit this middleware

router.use(function (req, res, next) {
    console.log("Middleware Called");
    next();
})
 
// Always invoked
router.use(function (req, res, next) {
    res.send("Greetings from GeeksforGeeks");
})
 
app.use('/user', router);


Note:

router.use() : router.use() helps you write modular routes and modules.. You basically define a middle ware for routes.

router.use("/pqr", pqrRoutes)

now for all requests that start with /pqr like /pqr/new or /pqr/xyz can be handles inside the pqrRoutes.


 */









/**                                                             For UnderStanding


Note :



router.get is only for defining subpaths. Consider this example:

var router = express.Router();

app.use('/first', router); // Mount the router as middleware at path /first

router.get('/sud', smaller);

router.get('/user', bigger);
If you open /first/sud, then the smaller function will get called.
If you open /first/user, then the bigger function will get called.

In short, app.use('/first', router) mounts the middleware at path /first, then router.get sets the subpath accordingly.







But if we instead use the following:

app.use('/first', fun);

app.get('/sud', bigger);

app.get('/user', smaller);

If you open /first in your browser, fun will get called,
For /sud, bigger will get called
For /user, smaller will get called
But remember for /first/sud, no function will get called.




 */





/**                                         middleware for use in Express apps 


Middleware functions are functions that have access to the request object (req), the response object (res), and 
the next function in the application’s request-response cycle. The next function is a function in the Express router which, 
when invoked, executes the middleware succeeding the current middleware.

Middleware functions can perform the following tasks:

1.Execute any code.
2.Make changes to the request and the response objects.
3.End the request-response cycle.
4.Call the next middleware in the stack.
5.If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function.
    Otherwise, the request will be left hanging.


 */