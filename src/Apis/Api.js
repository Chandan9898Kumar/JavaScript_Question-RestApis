import axios from "axios";

const getallData = () => {
  return axios.get("http://localhost:5000/api/products");
};


const postingBody=()=>{
    //   making post api call. here in body we are sending name:'GeekyAnt' so in backend we can access it through req.body.name
    return axios.get("http://localhost:5000/posting",{name:'GeekyAnt'},{headers:{'Content-Type': 'application/json'}})
}


const deleteItem=(params)=>{

    //  Note : delete request with body needed to be sent under a "data" key. example - {data:{name:'GeekyAnt'}}, other than data key  won't work.
    //  headers should also be inside data key.

    //  This id we will access in backend, by using request.body
    return axios.delete("http://localhost:5000/delete",{data:{id:params.id},headers:{'Content-Type': 'application/json',"Authorization":"***"}})
}


const getImage=()=>{
    return axios.get("http://localhost:5000/file",{responseType: "arraybuffer",})
}


const createItem=(payload)=>{
    //  We can directly send payload also instead of sending it object. but then entire data which is in payload we can access it in backend by using request.body (no need of object destructuring)
    return axios.post("http://localhost:5000/create",{payload},{headers: {'Content-Type': 'application/json'}})
}



const updateItem=(payload)=>{
    return axios.patch("http://localhost:5000/update",{payload},{headers: {'Content-Type': 'application/json'}})
}



const api = {
  getallData,
  getImage,
  postingBody,
  deleteItem,
  createItem,
  updateItem
};

export default api;
