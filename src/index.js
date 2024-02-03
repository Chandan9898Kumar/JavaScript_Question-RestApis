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
axios.interceptors.response.use((response) => response,async (error) => {
    const originalRequest = error.config;
    
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        
        const response = await api.refreshToken(localStorage.getItem("Refresh_Token"))
        localStorage.setItem("Access_Token",response.data);

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

if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
