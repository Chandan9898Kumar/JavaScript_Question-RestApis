// Steps -
//   Create a file app.js or index.js (Can give any name),we will write the whole express code in that file.

//   🔽Import express with require keyword and create an app by calling the express() function provided by the express framework.
const express = require("express");
const cors = require("cors"); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const bodyParser = require("body-parser");

// Creating express app 
const app = express();



//  Note : The app.use() function adds a new middleware to the app. Essentially, whenever a request hits your backend, Express will execute the functions you passed to app.use() in order.
//  It is mostly used to set up middleware for your application. 


//  These are working as a MIDDLEWARES : 
app.use(express.json()); // The express.json() middleware is used to parses the incoming request object as a JSON object. It parses incoming JSON requests and puts the parsed data in req.body.The app.use() is the syntax to use any middleware.

//  To enable CORS. do app.use(cors()); Now all requests received by the server will have cors enabled in them. 
app.use(cors());         // Calling use(cors()) will enable the express server to respond to preflight requests.A preflight request is basically an OPTION request sent to the server before the actual request is sent, in order to ask which origin and which request options the server accepts.

//  Cors can be enabled for multiple methods and not just the GET method. You can also enable it for methods like PATCH, POST, DELETE.etc. using the below code.
//  app.use(cors({methods: ['PATCH', 'DELETE','POST','GET']})); 


// Express.js express.raw() Function : The express.raw() function is a built-in middleware function in Express. It parses incoming request payloads into a Buffer and is based on body-parser. 
app.use(express.raw()); // Make a POST request with header set to ‘content-type’ – ‘application/octet-stream’ 



app.use(cookieParser());


//  The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with URL-encoded payloads and is based on a body parser.
app.use(express.urlencoded({ extended: true})); // Parse x-www-form-urlencoded request into req.body. make a POST request with header set to ‘content-type: application/x-www-form-urlencoded’ and body {“name”:”Geeky”}.and do  console.log(req.body)


app.use(express.text()); // It parses the incoming request payloads into a string and is based on body-parser.make a POST request with header set to ‘content-type: text/plain’ and body {“title”:”Geeky”}.



//  Note :  bodyParser (in newer version of express it is not needed) instead use  app.use(express.json());.

//  Depending on Content-Type in your client request the server should have different, one of the below app.use():

// app.use(bodyParser.text({ type: 'text/html' }))
// app.use(bodyParser.text({ type: 'text/xml' }))
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// app.use(bodyParser.json({ type: 'application/*+json' }))

// express.bodyParser() needs to be told what type of content it is that it's parsing. 
// Therefore, you need to make sure that when you're executing a POST request, that you're including the "Content-Type" header.
// Otherwise, bodyParser may not know what to do with the body of your POST request.






const data = require("./products.json");
const PORT = 5000; // Set the port for our local application, 3000 is the default but you can choose any according to the availability of ports.





//  Enabling CORS for specific origins only.
const corsOPtions = {
  origin: '*' // if you need to enable cors on all the sites and make the data available across then you can change the origin to a star which means that you can use cors enabled for all websites. 
              // which means now you can got to any website and if you want to access "http://localhost:5000/api/products" api  at line 64.then it will not throw an error.

//                                                              OR
//  origin: ["https://www.wikipedia.org", "https://www.google.com"] 
//  Use the following code adding the origin as the website.now if we go wikipedia page or google page 
//  there inside console tab and try to access this api (http://localhost:5000/api/products) using fetch method then you will will see entire data without any cors error.
//  But other than these two website you can't access this api data, It will throw CORS error.

}




// REST API to get all products details at once With this api the frontend will only get the data .The frontend cannot modify or update the data Because we are only using the GET method here.

/**
 *                                                             Step 4: Now we will set all the routes for our application.

Routes are the endpoints of the server, which are configured on our backend server and 
whenever someone tries to access those endpoints they respond accordingly to their definition at the backend. 
If you’re a beginner you can consider route as a function that gets called when someone requests the special path associated with that function 
and return the expected value as a response. We can create routes for HTTP methods like get, post, put, and so on. 

Syntax: The basic syntax of these types of routes looks like this, the given function will execute when the path and the request method resemble.:  
                                                                    app.anyMethod(path, function)
 * 
 */

//                                                            Example 1.
//  Note: instead of app.use(cors({methods: ['PATCH', 'DELETE','POST','GET']})) above we have done line 20, here  We have passed cors as a parameter to the route as a middleware function .which in turn will make the checks to enable cors or not for a specific method.
//  We don't need put cors(corsOptions) here explicitly because,we have already used : app.use(cors()); which will enabled cors in all apis automatically and any website can access these apis.
//  But if you want this  api to be accessed by some specific website then you can put cors inside api like this. 
app.get("/api/products",cors(corsOPtions) ,(req, res) => {
  res.status(200);
  res.send(data);   // Send a response of various types.
  // res.json(data) // Send a JSON response.
  res.end()         // End the response process

//  Note :
// 1.  Here req is request, when the client/user call api/make request to the server and pass data in  apis url then this req will be called and have those data in req.body.
// 2.  Here res is response when the client/user call api/make request to the server after that server(backend) send data to client/user as a response. 


});

/**
 * 1. With app.get() we are configuring our first route, it requires two arguments first one is the path and,
 * the second one is a function that will be executed when anyone requests this path with GET method.
 * The express provides the request and response object as a parameter to all such types of functions.
 *
 * 2. The req is a giant object which will be received from the user and res is an object which will be sent to the user after the function finishes execution.
 *
 * 3. Later we are calling status() method it takes an HTTP status code as an argument and when the response is returned, the status will be sent along.
 *
 * 4. Finally, we are returning the response to the user. The send() method takes a string, object, array, or buffer as an argument
 * and is used to send the data object back to the client as an HTTP response,
 * also there are lots of types of response in express like res.json() which is used to send JSON object, res.sendFile() which is used to send a file, etc.
 */






//                                                         Example 2: Setting up one more get request route on the ‘/hello’ path.

// Most of the things are the same as the previous example.
// The set() function is used to set HTTP header’s content type as HTML. When the browser receives this response it will be interpreted as HTML instead of plain text.
// Also in this example, we are not explicitly setting status, it is now concatenated with the statement of sending the response.
// This is another way to send status along with a response.

app.get("/hello", (req, res) => {
  res.set("Content-Type", "text/html");
  res.status(200).send("<h1>Hello  Learner!</h1>");
});






//                                                          Example 3: Now we will see how to send data to server.

// Sometimes we have to send our data to the server for processing, for example when you try to log in on Facebook you send a password and email to the server,
// Here we will see how to receive data from the user request. We can send data with the request object on the specified path with appropriate HTTP methods.
//  Till now we were using the browser to interact with the server, but in this step, any tool or frontend form is must be needed to send data
// because the browser search bar can only send get requests to receive resources from the server.

// Example: Setting up a route to be accessed by users to send data with post requests.

// Before creating a route for receiving data, we are using an inbuilt middleware, Middleware is such a broad and more advanced topic so we are not going to discuss it here, just to understand a little bit you can think of this as a piece of code that gets executed between the request-response cycles.
// The express.json() middleware is used to parses the incoming request object as a JSON object. The app.use() is the syntax to use any middleware.
// After then we have created a route on path ‘/’ for post request.
// const {name}, which is the syntax in ES6 to extract the given property/es from the object. Here we are extracting the name property which was sent by the user with this request object.
// After that, we are simply sending a response to indicate that we have successfully received data. If this `${} ` is looking weird to you then let me tell you that it is the syntax in ES6 to generate strings with javascript expression in ES6. We can inject any javascript expression inside ${}.

app.post("/posting", (req, res) => {
  const { name } = req.body;
  res.send(`Welcome ${name},now you are can access data.`);
});


// The app.set() function is used to assign the setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server. 
app.set('title', 'Please confirm your presence');
//  we can set any values this application and can send this client/user like below we did.

app.post("/posting", (req, res) => {
  const { name } = req.body;
  res.send(`Welcome ${name},now you are can access data.${app.get('title')}`);
});



//                                                               Example 4:   Sending Files from Server
//  Now we will see how to send files from the server.
// Several times we need to transfer the resources from the server as per user request, there are majorly two methods to send files one is sending static files using middleware
// and the other one is sending a single file on a route.





//                                                               Method  1: Serving entire directory using middleware.

// Express provides us a middleware express.static(), it accepts two arguments first one is the absolute root path of the directory whose files we are going to serve.
// We can simply use it to serve static files, by providing to app.use().

// Syntax:
//          app.use(path, express.static(root, [options]));

// First of all, we are importing an inbuilt module `path`, because later we are going to use one of the functions provided by this module.
// We are simply mounting a middleware at the ‘/static’ route.
// The static() middleware requires an absolute path so we use the path module’s join method.
// The join() method takes two parameters and joins them as a path, in NodeJS we have a global attribute __dirname which contains the path of the directory in which the current file exists.
// We are providing that joined path to middleware so that it can start serving the files inside that directory on the given path.

const path = require("path");
const { request } = require("http");
app.use("/static", express.static(path.join(__dirname, "Static file")));





//                                                                 Method 2: Sending a single file on a route with the sendFile() function.

// This function accepts an absolute URL of the file and whenever the route path is being accessed the server provides the file as an HTTP response.
// This process can be thought of as a single endpoint of the express.static(). It can be useful when we have to do some kind of processing before sending the file.

// Syntax:
//         res.sendFile(fileUrl)

// We are creating a 'get request route' on the ‘/file’ path
// After then we are creating the absolute path by joining the path of current __dirname and the name of the file we want to send and then passing it to sendFile().
// Then route sends the image.jpg file to the user as an HTTP response.

app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "RefreeTwo.jpg"));
});







// The app.METHOD() function is used to route an HTTP request, where METHOD is the HTTP method of the request, such as GET, PUT, POST, and so on, in lowercase.
// Thus, the actual methods are app.get(), app.post(), app.patch(),app.delete() and so on. 

//                                                              Post api to create a new item

app.post("/create", (req, res) => {
  const { payload } = req.body;
  data.push(payload);
  res.status(200).json({ status: "Successfully created item." });
});






//                                                              Delete Api

app.delete("/delete", (request, response) => {
  const { id } = request.body;

  const condition = data.some((item) => item.id === id);
  if (condition) {
    data.forEach((item, index) => {
      if (item.id === id) {
        data.splice(index, 1);
      }
    });
    response.status(200).json({ status: "successfully deleted item" });
  } else {
    response.status(400).json({ status: "Something went wrong..." });
  }
});






//                                                               Patch api to update item

app.patch("/update", (request, response) => {
  //  Here we are matching id of the product whose details we want to update.

  // const {id} = request.query      OR Below

  const {payload: { id }} = request.body;
  let findById = data.some((item) => item.id === id);
  const random = Math.floor(Math.random() * 20 + 1);

  if (findById) {
    data.forEach((item, index) => {
      if (item.id === id) {
        item.name = `Product ${random}`;
        item.description = `Description of Product ${random}`;
        item.price = random * 10;
      }
    });
    response.status(200).json({ status: "Successfully created item" });
  } else {
    response.status(400).json({ status: "Something went wrong." });
  }
});


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//                                              Note : we can access data of a particular item with get api by passing unique values  to get api.we have 2 method.

//  Method 1: by simply defining route and access the data through query.                                     

//                          Call get api to access specific item by passing params in api in frontend side.and in backend side we can access it through query.

app.get('/api/products/item',(request,response) => {
  const {Id} = request.query
  const fetchedProduct = data.filter((item)=>item.id == Id)
  if(fetchedProduct){
    response.status(200).send(fetchedProduct)
  }else{
    response.status(400).json({statusbar: 'Something went wrong.',})
  }

})

//                                            Below method is good for accessing data from request.query


//                                        Express.js req.query Property

// The req.query property is an object containing the property for each query string parameter in the route. 

// Syntax:
// req.query

//  Note: In frontend we are calling like this- 
// axios.get(`http://localhost:5000/api/product?name=${payload.name}&Id=${payload.id}`,{headers:{'Content-Type': 'application/json',"Authorization":"***"}})



//  Here in backend we just have to write till here -  /api/product.  in frontend we have used ? so after this query it will take automatically the rest of url parts.
app.get('/api/product',(request,response) => {
  const {Id,name} = request.query
  
  console.log(request.url,request.originalUrl) // /product/name=mobile&Id=1    . when open your network in browser the api with this type of url will be shown. 

  console.log(req.route);                    //  The req.route property contains the currently-matched route which is a string. 
  
  console.log(req.secure);                    //  The req.secure property is a Boolean property that is true if a TLS connection is established else returns false. 
  
  const fetchedProduct = data.filter((item)=>item.id == Id)
  if(fetchedProduct){
    response.status(200).send(fetchedProduct)
  }else{
    response.status(400).json({statusbar: 'Something went wrong.',})
  }

})


//  Method 2: by  defining data in route for specific item. Note: when we define anything in route then we can access it through params ( request.params ) not query( request.query ).  

//  Enable CORS(cross-origin resource sharing) for a Single Route.  CORS is basically a set of headers sent by the server to the browser.
app.get('/api/products/item/:Id',cors(),(request,response) => {
  const {Id} = request.params
  const fetchedProduct = data.filter((item)=>item.id == Id)
  if(fetchedProduct){
    response.status(200).send(fetchedProduct)
  }else{
    response.status(400).json({statusbar: 'Something went wrong.',})
  }

})

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// when you want to create a new router object in our program to handle requests. We can do it by using : express.Router() Function. It create a new router object.

// Single routing
const router = express.Router();
router.get('/', function (req, res, next) {
  console.log("Router Working");
  res.end();
})

app.use(router);




//  Call the listen() function, It requires path and callback as an argument. It starts listening to the connection on the specified path,
// the default host is localhost, and our default path for the local machine is the localhost:5000, here 5000 is the port which we have set earlier.
// The callback function gets executed either on the successful start of the server or due to an error.
app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});

// The app.listen() function is used to bind and listen to the connections on the specified host and port. This method is identical to Node’s http.Server.listen() method.







//  Step to run the application: Now as we have created a server we can successfully start running it to see it’s working,
//  write this command in your terminal to start the express server.  -:  node index.js OR nodemon index.js








//                                              The word CORS stands for “Cross-Origin Resource Sharing”. 
// CORS is an acronym that stands for “Cross-Origin Resource Sharing.” Cross-Origin Resource Sharing (CORS) is a browser-implemented HTTP-header-based mechanism that allows a server or an API (Application Programming Interface)
//  to indicate any origins (different in terms of protocol, hostname, or port) other than its origin from which the unknown origin gets permission to access and load resources.

// Note : if don't user cors here then apis will fail and show cors error.

//  Steps: 1. comment cors.
//         2. go to any website example : wikipedia.com and inspect it and in console tab try to access its any api by using fetch method (example :  fetch('http://localhost:5000/api/products') ) then you will see cors error.

// Basically  The browser will block our request because our front end( origins: http://localhost:3000 ) and back end (http://localhost:5000) are on different origins.
// Every HTTP request comes with request headers and response headers that contain information about the request and response.   Check this network tap by clicking on any api.

//                                              Why Would You Want to Implement CORS?
// From a security standpoint, browsers assume that your server doesn't want to share resources with websites it doesn't know.
// However, there are many situations where you explicitly want to enable CORS on your server. 

// If you make a request to your app, you will notice a new header being returned:
// Access-Control-Allow-Origin: *
// The Access-Control-Allow-Origin header determines which origins are allowed to access server resources over CORS (the * wildcard allows access from any origin).






//                                               Point to remember about express.json() and express.urlencoded()

/**
 *What is Middleware? It is those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.

When talking about express.json() and express.urlencoded() think specifically about POST requests (i.e. the .post request object) and PUT Requests (i.e. the .put request object)

You DO NOT NEED express.json() and express.urlencoded() for GET Requests or DELETE Requests.

You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request

Express provides you with middleware to deal with the (incoming) data (object) in the body of the request.

a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());

b. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded()); 
 
* 
                                                  Examples of these builtin ExpressJS middlewares are
1. express.json() :  is a built express middleware that convert request body to JSON.
2. express.urlencoded : just like express.json() converts request body to JSON, it also carries out some other functionalities like: converting form-data to JSON etc.
 * 
 *
 */





//                                                Cookies

// A cookie is a piece of data that is sent to the client-side with a request and is stored on the client-side itself by the Web Browser the user is currently using. With the help of cookies –
// It is easy for websites to remember the user’s information
// It is easy to capture the user’s browsing history
// It is also useful in storing the user’s sessions



//                                              Express.js req.route Property

// The req.route property contains the currently-matched route which is a string. 

// Syntax:
// req.route

// Parameter: No parameters. 





//                                              Express.js req.secure Property

// The req.secure property is a Boolean property that is true if a TLS connection is established else returns false. 

// Syntax:
// req.secure

// Return Value: It returns a Boolean value either True or False. 