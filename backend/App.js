//                                                   Note : Here we are covering Express other features.

const express = require('express');
const app = express();
const PORT = 3000;








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
 





//  Express.js express.text() Function : 
// The express.text() function is a built-in middleware function in Express. It parses the incoming request payloads into a string and is based on body-parser.

// Syntax: 

// express.text( [options] )
// Parameter: The options parameter contains various properties like defaultCharset, inflate, limit, verify, etc.

// Return Value: It returns an Object.

app.use(express.text());

// Note :Now make a POST request with header set to ‘content-type: text/plain’ and body {“title”:”Geeky”}.















app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});