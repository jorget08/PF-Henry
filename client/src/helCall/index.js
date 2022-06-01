import axios from "axios";

export default async  function helpCall(url) {
   return  axios.get(`http://localhost:3001${url}`)
   .then(res=>{return res.data})
}