import React, { useState, useEffect, useMemo, lazy, Suspense, useCallback } from "react";
import "../App.css";
import api from "../Apis/Api";
import { CountStringLength } from "../Utils";

const ImageModal = lazy(() => import("./Images"));

function MyApp() {
  const [data, setData] = useState();
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessages] = useState("");
  const [token, setToken] = useState({ accessToken: "", refreshToken: "" });
  const [itemInfo, setItemInfo] = useState([]);

  const lengthOfStrings = useMemo(() => {
    return CountStringLength(data || []);
  }, [data]);

  const getProductDetails = () => {
    try {
      api
        .getallData()
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const PostingContent = async () => {
    //  making post api call. here in body we are sending name:'GeekyAnt' so in backend we can access it through req.body.name
    let response = await api.postingBody({ name: "GeekyAnt" });
    let responseTwo = await api.postingBodyTwo({ name: "Sir" });

    setResult(response.data + responseTwo.data);
  };

  useEffect(() => {
    //   Calling get api
    getProductDetails();

    //     making post api call.
    PostingContent();

    //    To get image from api
    const getImage = () => {
      api
        .getImage()
        .then((res) => {
          const base64 = btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
          setImage(base64);
        })
        .catch((error) => {
          console.error(error);
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

  const deleteItem = useCallback(async (params) => {
    try {
      const userValidation = await api.getUserToken(localStorage.getItem("Access_Token"));
      if (userValidation.status === 200) {
        try {
          const deleteResult = await api.deleteItem(params);
          setMessages(deleteResult.data.status);
        } catch (error) {
          console.error({ error });
        } finally {
          setMessages("");
          getProductDetails();
        }
      }
    } catch (error) {
      console.log("Your Token might have expired...");
    }
  }, []);

  const addItems = useCallback(async () => {
    const token = String(Math.round(Date.now() / 1000)).slice(-2);
    const payload = {
      id: token,
      name: `Product ${token}`,
      description: `Description of Product ${token}`,
      price: Date.now(),
      image: "https://media.geeksforgeeks.org/wp-content/uploads/20230728155224/images.jfif",
    };
    try {
      const createdItemsSuccess = await api.createItem(payload);
      setMessages(createdItemsSuccess.data.status);
    } catch (error) {
      console.error(error);
    } finally {
      setMessages("");
      getProductDetails();
    }
  }, []);

  const updateItem = useCallback(async (params, value) => {
    if (value) {
      setItemInfo([]);
      getProductDetails();
      return;
    }
    try {
      // const updatedItems = await api.updateItem(params);
      const updatedItems = await api.updateItemTwo(params);
      if (updatedItems.status === 200) {
        getProductDetails();
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  }, []);

  const GetItemDetails = useCallback(async (params) => {
    try {
      // const getItems = await api.getSpecificItem(params)
      // const getSpecificItemByParams = await api.getSpecificItemByParams(params)
      const getSpecificItemWithQuery = await api.getSpecificItemByQuery(params);
      setItemInfo(getSpecificItemWithQuery.data);
      setData([]);
    } catch (error) {}
  }, []);

  return (
    <div className="App">
      <h1> {result && result}</h1>
      <div>{message && message}</div>
      <h2>
        <button onClick={addItems}>Create Item</button>
        <span> Total String Length : {lengthOfStrings}</span>
      </h2>
      <Suspense fallback={"Loading ..."}>
        <ImageModal data={data} itemInfo={itemInfo} deleteItem={deleteItem} updateItem={updateItem} GetItemDetails={GetItemDetails} />
      </Suspense>
      <div style={{ marginTop: "10px" }}>
        <picture>
          <source srcSet={`data:;base64,${image}`} media="(min-width: 992px)" />
          <source srcSet={`data:;base64,${image}`} media="(min-width: 768px)" />
          <source srcSet={`data:;base64,${image}`} media="(min-width: 0px)" />
          <img src={`data:;base64,${image}`} alt="Ref_Image" width="300px" height="250px" loading="lazy" />
        </picture>
      </div>
    </div>
  );
}
export default MyApp;
