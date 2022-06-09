import axios from "axios";

export async function helpCall(url) {
  return axios.get(`http://localhost:3001${url}`).then((res) => {
    return res.data;
  });
}

export async function helpCallPut(url, obj) {
  return axios.post(`http://localhost:3001${url}`, obj).then((res) => {
    return res.data;
  });

}

export async function helpCallUpdate(url, obj) {
  return axios.put(`http://localhost:3001${url}`, obj).then((res) => {
    return res.data;
  });

}

export async function helpCallDelete(url) {
  return axios.delete(`http://localhost:3001${url}`).then((res) => {
    return res.data;
  });
  
}