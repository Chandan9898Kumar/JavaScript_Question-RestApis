// Steps -
//   Create a file app.js or index.js (Can give any name),we will write the whole express code in that file.

//   🔽Import express with require keyword and create an app by calling the express() function provided by the express framework.
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json()); // The express.json() middleware is used to parses the incoming request object as a JSON object. The app.use() is the syntax to use any middleware.
app.use(cors());

const data = require("./products.json");
const PORT = 5000; // Set the port for our local application, 3000 is the default but you can choose any according to the availability of ports.

// REST API to get all products details at once With this api the frontend will only get the data .The frontend cannot modify or update the data Because we are only using the GET method here.

/**
 *                                                                  Step 4: Now we will set all the routes for our application.

Routes are the endpoints of the server, which are configured on our backend server and 
whenever someone tries to access those endpoints they respond accordingly to their definition at the backend. 
If you’re a beginner you can consider route as a function that gets called when someone requests the special path associated with that function 
and return the expected value as a response. We can create routes for HTTP methods like get, post, put, and so on. 

Syntax: The basic syntax of these types of routes looks like this, the given function will execute when the path and the request method resemble.:  
                                                                    app.anyMethod(path, function)
 * 
 */

//                                                            Example 1.
app.get("/api/products", (req, res) => {
  res.status(200);
  res.send(data);
  // res.json(data)
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








//                                                              Post api to create a new item

app.post("/create", (req, res) => {
  const { payload } = req.body;
  data.push(payload);
  res.status(200).send({ status: "Successfully created item." });
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
    response.status(200).send({ status: "successfully deleted item" });
  } else {
    response.status(400).send({ status: "Something went wrong..." });
  }
});






//                                                               Patch api to update item

app.patch("/update", (request, response) => {
  //  Here we are matching id of the product whose details we want to update.

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
    response.status(200).send({ status: "Successfully created item" });
  } else {
    response.status(400).send({ status: "Something went wrong." });
  }
});





//                                              Note : we can access get api for specific item by 2 method.

//  Method 1: by simply defining route and access the data through query.                                     

//                          Call get api to access specific item by passing params in api in frontend side.and in backend side we can access it through query.

app.get('/api/products/item',(request,response) => {
  const {Id} = request.query
  const fetchedProduct = data.filter((item)=>item.id == Id)
  if(fetchedProduct){
    response.status(200).json(fetchedProduct)
  }else{
    response.status(400).send({statusbar: 'Something went wrong.',})
  }

})


//  Method 2: by  defining data in route for specific item. Note: when we define anything in route then we can access it through params ( request.params ) not query( request.query ).  

app.get('/api/products/item/:Id',(request,response) => {
  const {Id} = request.params
  const fetchedProduct = data.filter((item)=>item.id == Id)
  if(fetchedProduct){
    response.status(200).json(fetchedProduct)
  }else{
    response.status(400).send({statusbar: 'Something went wrong.',})
  }

})







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

//  Step to run the application: Now as we have created a server we can successfully start running it to see it’s working,
//  write this command in your terminal to start the express server.  -:  node index.js OR nodemon index.js

//                                                  Notes

//  The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// Syntax:
// express.json( [options] )
// Parameters: The options parameter has various properties like inflate, limit, type, etc.
