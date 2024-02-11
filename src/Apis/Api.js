import axios from "axios";

// ---------------------------------------------------------------GET API---------------------------------------------------------------------------------------------------------

const getallData = () => {
  return axios.get("http://localhost:5000/api/products", { headers: { "Content-Type": "application/json", "Cache-Control": 'public, max-age="60000"' } });
};

const getImage = () => {
  return axios.get("http://localhost:5000/file", { responseType: "arraybuffer" });
};

//   Note :  Here we can get specific item details by two method.

//   Method 1.

// By sending data in params. if we use other name than params then it will not work. it is inbuilt for get apis.
//  Now to access this id in backend we have to use =  request.query

//  Note: Here we have passed data in params and in backend we are accessing it through request.query  not request.params.
const getSpecificItem = (payload) => {
  return axios.get("http://localhost:5000/api/products/item", { params: { Id: payload.id } }, { headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" } });
};

//  Below method is better then above because it structured with with query parameters. it help to understand which item is being called.this is best-way to access the data by request.query
const getSpecificItemByQuery = (payload) => {
  //  Note : This type of structure is called query routing where we used ?. In backend we just have make api till there app.get('/api/product') and rest will handled query itself.
  return axios.get(`http://localhost:5000/api/product?name=${payload.name}&Id=${payload.id}`, { headers: { "Content-Type": "application/json", Authorization: "***" } });
};

//                                                      Method 2.  By passing payload data in URL .

const getSpecificItemByParams = (payload) => {
  return axios.get(`http://localhost:5000/api/products/item/${payload.id}`, { headers: { "Content-Type": "application/json" } });
};

// -------------------------------------------------------------------------POST API-------------------------------------------------------------------------------------------------

const postingBody = (params) => {
  //   making post api call. here in body we are sending name:'GeekyAnt' so in backend we can access it through req.body.name
  return axios.post("http://localhost:5000/posting", { name: params.name }, { headers: { "Content-Type": "application/json" } });
};

const postingBodyTwo = (params) => {
  //   making post api call. here in body we are sending name:'GeekyAnt' so in backend we can access it through req.body.name
  return axios.post("http://localhost:5000/postingTwo", { name: params.name }, { headers: { "Content-Type": "application/json" } });
};

const createItem = (payload) => {
  //  We can directly send payload also instead of sending it object. but then entire data which is in payload we can access it in backend by using request.body (no need of object destructuring)
  return axios.post("http://localhost:5000/create", { payload }, { headers: { "Content-Type": "application/json" } });
};

// ------------------------------------------------------------------------DELETE API----------------------------------------------------------------------------------------------------------------

const deleteItem = (params) => {
  //  Note : delete request with body needed to be sent under a "data" key. example - {data:{name:'GeekyAnt'}}, other than data key  won't work.
  //  headers should also be inside data key and Authorization should also be there.

  //  This id we will access in backend, by using request.body
  return axios.delete(`http://localhost:5000/delete/${params.id}`, { data: { id: params.id }, headers: { "Content-Type": "application/json", Authorization: "***" } });
};

// -----------------------------------------------------------------------PATCH API---------------------------------------------------------------------------------------------

const updateItem = (payload) => {
  return axios.patch("http://localhost:5000/update", { payload }, { headers: { "Content-Type": "application/json" } });
};

// Note : Below update api method is good because it when see your network tab then in url it will which item is being updated with its ID or name whatever you want show you can pass.

const updateItemTwo = (payload) => {
  return axios.patch(`http://localhost:5000/update?id=${payload.id}`, { payload }, { headers: { "Content-Type": "application/json" } });
};

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//                                                        Creating JWT and Access Token.

// 1. Create jwt token.

const createUserToken = () => {
  return axios.post("http://localhost:5000/user/generateToken");
};

// 2.  Access token

const getUserToken = (token) => {
  return axios.get("http://localhost:5000/user/validateToken", { headers: { Authorization: `Bearer ${token}` } });
};

const refreshToken = (refreshToken) => {
  return axios.post("http://localhost:5000/refreshToken", { refreshToken });
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const api = {
  getallData,
  getImage,
  postingBody,
  postingBodyTwo,
  deleteItem,
  createItem,
  updateItem,
  updateItemTwo,
  getSpecificItem,
  getSpecificItemByParams,
  getSpecificItemByQuery,
  createUserToken,
  getUserToken,
  refreshToken,
};

export default api;
