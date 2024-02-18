import React, { useState, useEffect } from "react";
import "../App.css";
import api from "../Apis/Api";
function MyApp() {
  const [data, setData] = useState();
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");
  const [deleteMessage, setDeleteSuccess] = useState("");
  const [token, setToken] = useState({ accessToken: "", refreshToken: "" });
  const [itemInfo, setItemInfo] = useState([]);

  useEffect(() => {
    //   Calling get api
    getProductDetails();

    //     making post api call.
    PostingContent();

    //    To get image from api
    const getImage = () => {
      api.getImage().then((res) => {
        const base64 = btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
        setImage(base64);
      }).catch((error)=>{
        console.error(error)
      });
    };
    getImage();

    //   User Token
    const CreateUserToken = async () => {
      const userToken = await api.createUserToken();
      localStorage.setItem("Access_Token", userToken.data.ACCESS_TOKEN);
      localStorage.setItem("Refresh_Token", userToken.data.REFRESH_TOKEN);
      setToken((token) => ({ ...token, accessToken: userToken.data.ACCESS_TOKEN, refreshToken: userToken.data.REFRESH_TOKEN }));
    };

    CreateUserToken();
  }, []);

  const getProductDetails = () => {
    api
      .getallData()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const PostingContent = async () => {
    //  making post api call. here in body we are sending name:'GeekyAnt' so in backend we can access it through req.body.name
    let response = await api.postingBody({ name: "GeekyAnt" });
    let responseTwo = await api.postingBodyTwo({ name: "Sir" });

    setResult(response.data + responseTwo.data);
  };

  const deleteItem = async (params) => {
    try {
      const userValidation = await api.getUserToken(localStorage.getItem("Access_Token"));
      if (userValidation.status === 200) {
        try {
          const deleteResult = await api.deleteItem(params);
          setDeleteSuccess(deleteResult.data.status);
          getProductDetails();
        } catch (error) {
          console.error(error);
        } finally {
          setDeleteSuccess("");
        }
      }
    } catch (error) {
      alert("Your Token might have expired");
    }
  };

  const addItems = async () => {
    const token = String(Math.round(Date.now() / 1000)).slice(-2);
    const payload = {
      id: token,
      name: `Product ${token}`,
      description: `Description of Product ${token}`,
      price: Date.now(),
      image: "https://media.geeksforgeeks.org/wp-content/uploads/20230728155224/images.jfif",
    };
    const createdItemsSuccess = await api.createItem(payload);
    getProductDetails();
    console.log(createdItemsSuccess);
  };

  const updateItem = async (params, value) => {
    if (value) {
      setItemInfo([]);
      getProductDetails();
      return;
    }
    try {
      const updatedItems = await api.updateItemTwo(params);
      if (updatedItems.status === 200) {
        getProductDetails();
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const GetItem = async (params) => {
    // const getSpecificItem = await api.getSpecificItem(params);
    //                    OR
    // const getSpecificItemData = await api.getSpecificItemByParams(params);
    //                      OR
    try {
      const getSpecificItemWithQuery = await api.getSpecificItemByQuery(params);
      setItemInfo(getSpecificItemWithQuery.data);
      setData([]);
    } catch (error) {}
  };

  return (
    <div className="App">
      <h1> {result && result}</h1>
      <h2>
        <button onClick={addItems}>Create Item</button>
      </h2>
      {
        <div>
          {data &&
            data.length > 0 &&
            data?.map((data) => {
              return (
                <div key={data.id} style={{ margin: "10px" }}>
                  <picture>
                    <source srcSet={data.image} media="(min-width: 992px)" />
                    <source srcSet={data.image} media="(min-width: 768px)" />
                    <source srcSet={data.image} media="(min-width: 0px)" />
                    <img src={data.image} alt="images" loading="eager" width="300px" height="200px" />
                  </picture>
                  <h1>{data.name}</h1>
                  <div>
                    <button onClick={() => deleteItem(data)} style={{ marginLeft: "5px", marginRight: "5px" }}>
                      Delete Item
                    </button>
                    <button onClick={() => updateItem(data)} style={{ marginLeft: "5px", marginRight: "5px" }}>
                      Update Item
                    </button>
                    <button onClick={() => GetItem(data)} style={{ marginLeft: "5px", marginRight: "5px" }}>
                      Get Item Information
                    </button>
                  </div>
                </div>
              );
            })}

          {itemInfo &&
            itemInfo.length > 0 &&
            itemInfo?.map((data) => {
              return (
                <div key={data.id} style={{ margin: "10px" }}>
                  <picture>
                    <source srcSet={data.image} media="(min-width: 992px)" />
                    <source srcSet={data.image} media="(min-width: 768px)" />
                    <source srcSet={data.image} media="(min-width: 0px)" />
                    <img src={data.image} alt="images" loading="eager" width="300px" height="200px" />
                  </picture>
                  <h1>{data.name}</h1>
                  <p>{data.description}</p>
                  <p>
                    Rs. {"  "}
                    {data.price}
                  </p>
                  <div>
                    <button onClick={() => updateItem(data, "Get")} style={{ marginLeft: "5px", marginRight: "5px" }}>
                      Get All Items
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      }
      <div style={{ marginTop: "10px" }}>
        <picture>
          <source srcSet={`data:;base64,${image}`} media="(min-width: 992px)" />
          <source srcSet={`data:;base64,${image}`} media="(min-width: 768px)" />
          <source srcSet={`data:;base64,${image}`} media="(min-width: 0px)" />
          <img src={`data:;base64,${image}`} alt="Ref_Image" width="300px" height="250px" loading="eager" />
        </picture>
      </div>
      <div>{deleteMessage && deleteMessage}</div>
    </div>
  );
}
export default MyApp;
