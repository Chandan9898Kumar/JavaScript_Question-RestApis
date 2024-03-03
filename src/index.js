import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import api from "./Apis/Api";

const root = ReactDOM.createRoot(document.getElementById("root"));

//    Setting Up Axios Interceptor for the JWT tokens.

//                            NOTE:
// In this step, we set up Axios Interceptor so that in every API call Axios automatically append(add) the header with the bearer ${authToken}, which is used to
// authenticate and authorize the API calls to the backend. we don;t need to go to api and add the header:authorization there.

axios.defaults.baseURL = "/";
axios.defaults.withCredentials = true;

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Access_Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**                                                           Refresh the Token if it is expired
The above code solves the problem of authenticating each request but what about the JWT token expiration? What will we do when the JWT authToken expires?
Now we can ask users to log in again but that is not a good UX, a better way is to automatically fetch the new JWT authToken if the JWT refreshToken exists.
To do that we will again use Axios interceptor but not at request but at response.
 */

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.refreshToken(localStorage.getItem("Refresh_Token"));
        localStorage.setItem("Access_Token", response.data);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${response.data}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);

/**
                          So let me explain the code above so that we understand why we need interceptors and how the above code is working.

On each response error with the status code 401 which is the status code for Unauthorized and no "retry" Flag means that the JWT token has expired. 
Hence we need to fetch the new token using the JWTrefreshToken and then we set the newly generated JWT authToken and send the request again for the failed request.
In case of any JWT refreshToken error we can redirect to log in so that we can fetch new JWT authToken and JWTrefreshToken.
 */

/**                                                                         NOTE
To implement authentication in a React application, one popular approach is to use JSON Web Tokens (JWT). Here's a summary of the steps involved:

1. Create a Login component that handles the login form and makes an API call to authenticate the user. Store the received JWT authToken and JWT refreshToken in localStorage.

2. Set up an Axios instance with request interceptors to automatically include the JWT authToken in the headers of authenticated API requests.(just like above )

3. Add a response interceptor to handle JWT token expiration. If a request receives a 401 error (Unauthorized) and there is a JWT refreshToken available, 
   use it to fetch a new JWT authToken and update it in localStorage. Then retry the original request with the new authToken.

4. Use the configured Axios instance in your components to make authenticated API calls.

5. Remember to handle errors, redirect to login on refreshToken failure, and consider security aspects when storing tokens.

By implementing JWT authentication with refresh tokens and using Axios interceptors, you can create a secure and efficient authentication system in your React application.
 */

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

// Opt-in to Webpack hot module replacement
// if (module.hot) module.hot.accept();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




/**                                                     NOTE :  CORS 
 * 
 * PUT  :-        axios.defaults.withCredentials = true;
 * With these settings, your app will be able to exchange cookies with the back-end server.

One gotcha for me getting CORS working was to make sure the front-end host is properly added to the back-end servers header "Access-Control-Allow-Origin". 
This includes the port number if it's specified in your URL when accessing the front-end.

In terms of cookie exchange, the "Access-Control-Allow-Credentials" and "Access-Control-Allow-Methods" headers must be set correctly as shown above. 
Using a wildcard on "Access-Control-Allow-Methods" will not work.
 */