import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const MyApp = lazy(() => import("./Component/MyApp"));
function App() {
  return (
    <>
      <Suspense fallback={<Loading />}> 
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MyApp />} />
        </Routes>
      </BrowserRouter>
      </Suspense>
    </>
  );
}
export default App;

export const Loading = () => {
  return <div>Loading ...</div>;
};

/**
 * 
 *  Open two terminals and then “cd backend” & “cd frontend“.

1. In frontend
    npm start
2. In backend
    nodemon index.js   oR node index.js
 * 
 */

//  Nodemon is a popular tool for the development of node.js-based applications. It simply restarts the node application whenever it notices changes in the file in your project’s working directory.
