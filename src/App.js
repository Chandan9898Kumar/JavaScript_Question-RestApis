import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import api from './Apis/Api'
function App() {
  const [data, setData] = useState();
  const [image, setImage] = useState("");
  const [result,setResult] = useState('')
  const [deleteMessage,setDeleteSuccess] = useState('')

  useEffect(() => {

    //   Calling get api
      api.getallData().then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    //     making post api call. here in body we are sending name:'GeekyAnt' so in backend we can access it through req.body.name
      api.postingBody().then((response) => {
        setResult(response.data); // o/p -  Welcome GeekyAnt,now you are can access data.
      })
      .catch((error) => {
        console.error(error);
      });


    //    To get image from api
    const getImage = () => {
        api.getImage().then((res) => {
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          setImage(base64);
        });
    };

    getImage();
  }, []);



const deleteItem= async(params)=>{
  const deleteResult = await api.deleteItem(params)
  setDeleteSuccess(deleteResult)


}



  return (
    <div className="App">
    <h1> {result && result}</h1>
      {
        <div className="products">
          {data?.map((data) => {
            return (
              <div key={data.id}>
                <img className="img" src={data.image} alt="img" />
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                <div>
                <button onClick={()=>deleteItem(data)}>Delete Item</button>
                </div>
              </div>
            );
          })}
        </div>
      }
      <div>
        <img src={`data:;base64,${image}`} alt="Ref_Image" />
      </div>
    </div>
  );
}
export default App;

/**
 * 
 *  Open two terminals and then “cd backend” & “cd frontend“.

1. In frontend
    npm start
2. In backend
    nodemon index.js
 * 
 */
