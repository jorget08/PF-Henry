import { GET_BY_SEARCH, GET_DETAIL, CLEAR_DETAIL, FILTER_CATEGORY, FILTER_REVIEW, FILTER_PRICE, ORDEN_TITLE } from "./types";
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

export function clearDetail(){
    return {type: CLEAR_DETAIL}
}

export function filterCategory(category){
    return async function (dispatch){
        try{
            var response = await axios.get(`ruta del back${category}`)
            return dispatch({type: FILTER_CATEGORY, payload: response.data})
        }
        catch(e){
            console.log(e)
        }
    }
}

export function filterReview(review){
    return async function (dispatch){
        try{
            var response = await axios.get(`ruta del back${review}`)
            return dispatch({type: FILTER_CATEGORY, payload: response.data})
        }
        catch(e){
            console.log(e)
        }
    }
}

export function filterPrice(price1, price2){
    return async function (dispatch){
        try{
            var response = await axios.get(`ruta del back${price1, price2}`)
            return dispatch({type: FILTER_PRICE, payload: response.data})
        }
        catch(e){
            console.log(e)
        }
    }
}

export function ordenTitle (payload){
    return {type: ORDEN_TITLE, payload}
}
