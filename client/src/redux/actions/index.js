import { GET_BY_SEARCH, GET_DETAIL, CLEAR_DETAIL } from "./types";
import axios from "axios";

export function getBySearch(input) {
  return async function (dispatch) {
    // if (title.length) {
    //   const response = await axios
    //     .get(`http://localhost:3001/recipes?title=${encodeURIComponent(input)}`)
    //     .then((res) => dispatch({ type: GET_BY_TITLE, payload: res.data }))
    //     .catch((err) => console.log(err));
    // }
  };
}

export function getDetail(id){
    return async function (dispatch){
        try{
            var response = await axios.get(`ruta del back${id}`)
            return dispatch({type: GET_DETAIL, payload: response.data})
        }
        catch(e){
            console.log(e)
        }
    }
}

export function clear(){
    return {type: CLEAR_DETAIL}
}