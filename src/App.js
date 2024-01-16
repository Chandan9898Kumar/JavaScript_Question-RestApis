import React, { useState, useEffect } from "react";
import "./App.css";
import api from "./Apis/Api";
function App() {
  const [data, setData] = useState();
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");
  const [deleteMessage, setDeleteSuccess] = useState("");

  useEffect(() => {
    //   Calling get api
    getProductDetails()
    
    //     making post api call. 
    PostingContent()

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


  const getProductDetails=()=>{
    api
      .getallData()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const PostingContent=async()=>{
    //  making post api call. here in body we are sending name:'GeekyAnt' so in backend we can access it through req.body.name
    let response = await api.postingBody({name:'GeekyAnt'})
    let responseTwo = await api.postingBodyTwo({name:'Sir'})

    setResult(response.data +  responseTwo.data);
  }

  const deleteItem = async (params) => {
    try {
      const deleteResult = await api.deleteItem(params);
      setDeleteSuccess(deleteResult.data.status);
      getProductDetails()
    } catch (error) {
    } finally {
      setDeleteSuccess("");
    }
  };

  const addItems = async () => {
    const token = String(Math.round(Date.now() / 1000)).slice(-2);
    const payload = {
      id: token,
      name: `Product ${token}`,
      description: `Description of Product ${token}`,
      price: Date.now(),
      image:"https://media.geeksforgeeks.org/wp-content/uploads/20230728155224/images.jfif",
    };
    const createdItemsSuccess = await api.createItem(payload);
    getProductDetails()
    console.log(createdItemsSuccess);
  };




const updateItem= async(params)=>{
  const updatedItems = await api.updateItemTwo(params)
  getProductDetails()
}

const GetItem=async(params)=>{
  const getSpecificItem= await api.getSpecificItem(params)
  //                    OR
  const getSpecificItemData= await api.getSpecificItemByParams(params)
//                      OR
  const  getSpecificItemWithQuery = await api.getSpecificItemByQuery(params)

}

  return (
    <div className="App">
      <h1> {result && result}</h1>
      <h2>
        <button onClick={addItems}>Create Item</button>
      </h2>
      {
        <div className="products">
          {data?.map((data) => {
            return (
              <div key={data.id}>
                <img className="img" src={data.image} alt="img" />
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                <p>Rs. {"  "}{data.price}</p>
                <div>
                  <button onClick={() => deleteItem(data)} style={{marginLeft:'5px',marginRight:'5px'}}>Delete Item</button>
                  <button onClick={()=>updateItem(data)} style={{marginLeft:'5px',marginRight:'5px'}}>Update Item</button>
                  <button onClick={()=>GetItem(data)} style={{marginLeft:'5px',marginRight:'5px'}}>Get Item</button>
                </div>
              </div>
            );
          })}
        </div>
      }
      <div>
        <img src={`data:;base64,${image}`} alt="Ref_Image" height='300px'  loading="eager"/>
      </div>
      <div>{deleteMessage && deleteMessage}</div>
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

//  Nodemon is a popular tool for the development of node.js-based applications. It simply restarts the node application whenever it notices changes in the file in your project’s working directory.