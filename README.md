# REST API Introduction.

`RESTful web services are very popular because they are light weight, highly scalable and maintainable and are very commonly used to create APIs for web-based applications.`

There are numerous types of APIs, making it difficult for new developers to differentiate between each kind. In particular, Representational State Transfer (REST) is a software architectural style that developers apply to web APIs. REST APIs provide simple, uniform interfaces because they can be used to make data, content, algorithms, media, and other digital resources available through web URLs. Essentially, REST APIs are the most common APIs used across the web today.

To make the API service RESTful, six guiding constraints must be satisfied:

1. Use of a uniform interface (UI): To have a uniform interface, multiple architectural constraints are required to guide the behavior of components. Additionally, resources should be unique so they are identifiable through a single URL.

2. Client-server based: The uniform interface separates user concerns from data storage concerns. The client’s domain concerns UI and request-gathering, while the server’s domain concerns focus on data access, workload management, and security. The separation of client and server enables each to be developed and enhanced independently of the other.

3. Stateless operations: Request from client to server must contain all of the information necessary so that the server can understand and process it accordingly. The server can’t hold any information about the client state.

4. RESTful resource caching: Data within a response to a request must be labeled as cacheable or non-cacheable.

5. Layered system: REST allows for an architecture composed of hierarchical layers. In doing so, each component cannot see beyond the immediate layer with which they are interacting.

6. Code on demand: Because REST APIs download and execute code in the form of applets or scripts, there’s more client functionality. Oftentimes, a server will send back a static representation of resources in the form of XML or JSON. Servers can also send executable codes to the client when necessary.


`Working:  A request is sent from client to server in the form of a web URL as HTTP GET or POST or PUT or DELETE request. After that, a response comes back from the server in the form of a resource which can be anything like HTML, XML, Image, or JSON. But now JSON is the most popular format being used in Web Services. `



### How do REST APIs work?

To understand how REST APIs work, it is critical to understand resources. A resource can be any information that could be named, such as a document or image, a collection of other resources, a non-virtual object, and more. Meanwhile, REST uses a resource identifier to recognize the specific resource involved in an interaction between components.

The method is the type of request you send to the server. The four main resource methods that are associated with REST APIs are:

1. GET: This method allows for the server to find the data you requested and sends it back to you.
2. PUT: If you perform the ‘PUT’ request, then the server will update an entry in the database.
3. POST: This method permits the server to create a new entry in the database.
4. DELETE: This method allows the server to delete an entry in the database.



In HTTP there are five methods that are commonly used in a REST-based Architecture i.e., POST, GET, PUT, PATCH, and DELETE. These correspond to create, read, update, and delete (or CRUD) operations respectively. There are other methods which are less frequently used like OPTIONS and HEAD.  

1. GET: The HTTP GET method is used to read (or retrieve) a representation of a resource. In the safe path, GET returns a representation in XML or JSON and an HTTP response code of 200 (OK). In an error case, it most often returns a 404 (NOT FOUND) or 400 (BAD REQUEST). 
 
2. POST: The POST verb is most often utilized to create new resources. In particular, it’s used to create subordinate resources. That is, subordinate to some other (e.g. parent) resource. On successful creation, return HTTP status 201, returning a Location header with a link to the newly-created resource with the 201 HTTP status. 
( Request for Posting/Creating/Inserting Data )

3. PUT: It is used for updating the capabilities(Used to update the entire fields("Object")). However, PUT can also be used to create a resource in the case where the resource ID is chosen by the client instead of by the server. In other words, if the PUT is to a URI that contains the value of a non-existent resource ID. On successful update, return 200 (or 204 if not returning any content in the body) from a PUT. If using PUT for create, return HTTP status 201 on successful creation. PUT is not safe operation but it’s idempotent. 

4. PATCH: It is used to modify capabilities(Used to update only certain fields). The PATCH request only needs to contain the changes to the resource, not the complete resource. This resembles PUT, but the body contains a set of instructions describing how a resource currently residing on the server should be modified to produce a new version. This means that the PATCH body should not just be a modified part of the resource, but in some kind of patch language like JSON Patch or XML Patch. PATCH is neither safe nor idempotent. ( Request for Updating Data )

DELETE: It is used to delete a resource identified by a URI. On successful deletion, return HTTP status 200 (OK) along with a response body. 




### What are REST APIs used for?
One of the key advantages of REST is that they provide a lot of flexibility, which enables you to do more with this particular API. Listed below are examples of what REST APIs are useful for:

`Cloud applications`
REST APIs are useful in cloud applications because their calls are stateless. If something fails, stateless components can smoothly redeploy and scale to accommodate load changes. Document sharing, storage, finance and accounting, customer relationship management (CRM), inventory control, and gathering information are some of the jobs performed with cloud-based applications.

`Cloud services`
REST is also helpful in cloud services because you’d need to control how the URL is decoded to bind to a service through an API. That being said, cloud computing and microservices will undoubtedly make RESTful API design the rule of the future.

`Web use `
Since REST is not tied to client-side technology, these APIs can be accessible from a client-side web project, an iOS app, an IoT device, or a Windows Phone. You are able to build the infrastructure for your organization without worrying about being stuck to a particular client-side stack.



### The benefits of using REST APIs

REST is preferable to SOAP for several reasons. Here are a few advantages that REST APIs have:

1. Scalability: Due to the separation between client and server, the product can be scaled by development teams without much difficulty.

2. Flexibility and Portability: Since REST-style APIs require data from one of the requests to be sent properly, it’s possible to perform a migration from one server to another. It’s also possible to carry out changes on the database at any time.

3. Independence: With the separation between client and server, the protocol makes it easier for developments across a project to take place independently. REST APIs are also adaptable to the working syntax and platform, which offers opportunities to test several environments at a time while developing.

4. Lightweight: REST APIs are lightweight and fast, as they utilize the HTTP standard that supports multiple formats including JSON, XML, and HTML. This feature makes it ideal for mobile app projects, IoT devices, and much more.




### Challenges of using REST APIs
Along with design and architectural constraints, individuals will have to deal with some challenges when using REST APIs. These challenges may include:

1. `REST endpoint consensus `
It doesn’t matter how you format your URLs, but consistency across your API is crucial. Unfortunately, the number of combinations increases further with more complex operations. As a result, consistency can be difficult to achieve on large codebases with many developers.

2. `REST API versioning` 
API versioning is the practice of creating multiple versions of an API to accommodate changes or updates without disrupting consumers. To prevent compatibility issues, APIs are often versioned. However, old endpoints remain active, which leads to an increase in workload, as multiple APIs are maintained.

3. `REST API authentication`
API authentication will vary depending on the context of its use. Some third-party applications are considered to be logged-in users with specific rights and permissions. Other third-party applications can be used by registered users where they can only access their data such as looking for email or documents. There could be upwards of 20 different authorization approaches in use, dramatically increasing the difficulty of ever getting to make your first API call. With so much friction from the start, developers sometimes end up walking away.

4. `REST API security` 
Even though RESTful APIs provide a simpler way to access and manipulate your application, security issues can still happen. For example, a client can send thousands of requests every second and crash your server. Other REST API security challenges include:
a. Absence of rate limiting and throttling
b. Failure to encrypt payload data
c. Incorrect implementation of HTTPS
d. Weak API keys that are easily compromised
e. Lack of proper authentication

5. `Multiple requests and unnecessary data`
A response can contain more data than you need or require further requests to access all of the data.



`REpresentational State Transfer (REST) :` is a software architectural style of delivering APIs dependent on the HTTP specification the web is built upon. REST APIs utilize the uniform resource locator (URL) to make data available using the web. This helps to ultimately maximize usage of HTTP methods, headers, and other essential web building blocks. Unlike SOAP, REST is a common starting place for most teams when they begin investing in APIs because it provides a simple and widely recognized set of design patterns.


### REST API : It is an architecture style to develop web applications. It uses HTTP protocol as a communication interface and transport data through HTTP method.
REST APIs should accept JSON for request payload and also send responses to JSON. JSON is the standard for transferring data.

### API Status Codes
Status codes are returned with every request that is made to a web server. Status codes indicate information about what happened with a request. Here are some codes that are relevant to GET requests:

1. 200: Everything went okay, and the result has been returned (if any).
2. 301: The server is redirecting you to a different endpoint. This can happen when a company switches domain names, or an endpoint name is changed.
3. 400: The server thinks you made a bad request. This can happen when you don’t send along the right data, among other things.
4. 401: The server thinks you’re not authenticated. Many APIs require login credentials, so this happens when you don’t send the right credentials to access an API.
5. 403: The resource you’re trying to access is forbidden: you don’t have the right permission to see it.
6. 404: The resource you tried to access wasn’t found on the server.
7. 503: The server is not ready to handle the request.




### What is RESTful API?
REST API stands for Representational State Transfer Application Programming Interface. It is a collection of architectural guidelines and best practices for creating web services that enable various systems to interact and communicate with one another over the Internet. Due to their simplicity, scalability, and usability, RESTful APIs are a popular choice for developing web applications and services.

### Why should we use REST API in our web apps and services?

1. Resources: In REST API, everything is treated as resources. Such as data objects or services. These resources are uniquely identified by URLs (Uniform Resources Locators).

2. Statelessness: Each request made by a client to a server must provide all the details required to comprehend and handle the request. The API is simple to scale and administer because the server does not save any data regarding the client’s state between queries.
HTTP Methods: RESTful APIs use standard HTTP methods to perform CRUD(Create, Read, Update, Delete) operations on resources. The common methods are GET(read), POST(create), PUT(update), and DELETE(delete).

3. Representations: Resources can have multiple representations, such as JSON, XML, HTML, or others. Clients can specify the desired representation using the HTTP “Accept” header.

4. Stateless Communication: Each request made by the client to the server must include all required data. The client’s state in-between queries is not recorded by the server. This approach makes it easier to implement the server and improves scalability.




### NOTE :
To make sure that when our REST API app responds with JSON that clients interpret it as such, we should set Content-Type in the response header to "application/json" after the request is made. Many server-side app frameworks set the response header automatically. Some HTTP clients look at the Content-Type response header and parse the data according to that format.

### Note : always try to generate your URL in lowercase. EX: /data



### Important Note about                                        "--legacy-peer-deps" Error :   

<!--
The concept of peer dependencies can cause challenges when installing packages. Consider the following scenario:

Package A requires Package B, and both have a common peer dependency, Package C. However, Package A requires Package C in version 1.x, while Package B requires Package C in version 2.x.

When you try to install Package A and Package B together in your project, npm might encounter a conflict due to the different peer dependency versions required by each package. This can lead to installation failures, and it becomes challenging to resolve the conflicts manually.

"npm config set legacy-peer-deps true"

To alleviate the complications caused by conflicting peer dependencies, npm introduced the "legacy-peer-deps" configuration flag. When set to true, this flag instructs npm to revert to the older behavior of installing packages with peer dependencies.

The "legacy-peer-deps" flag works as follows:

If a package declares a peer dependency, npm will install the specified version without verifying if it satisfies the version range expected by the dependent package.

The flag disables the strict version checking for peer dependencies, making it more permissive during the installation process. 
 -->

 `To set/fix this error make "legacy-peer-deps" flag to true, open your terminal and run the following commands:`
1. npm config set legacy-peer-deps true
2. npm instal
