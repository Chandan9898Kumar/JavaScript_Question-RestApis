// Steps -
//   Create a file app.js or index.js (Can give any name),we will write the whole express code in that file.

//   🔽Import express with require keyword and create an app by calling the express() function provided by the express framework.
const express = require('express');
const app = express();

app.use(express.json()) // The express.json() middleware is used to parses the incoming request object as a JSON object. The app.use() is the syntax to use any middleware.
app.use(cors());

const cors = require('cors');
const data = require('./products.json')
const PORT = 5000  // Set the port for our local application, 3000 is the default but you can choose any according to the availability of ports. 






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
    res.status(200)
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

app.get('/hello', (req, res)=>{ 
    res.set('Content-Type', 'text/html'); 
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

app.post('/', (req, res)=>{ 
    const {name} = req.body; 
    res.send(`Welcome ${name}`); 
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