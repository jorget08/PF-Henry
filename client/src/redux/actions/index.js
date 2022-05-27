import {
	GET_BOOKS,
	GET_BY_SEARCH,
	GET_DETAIL,
	CLEAR_DETAIL,
	FILTER_CATEGORY,
	FILTER_SCORE,
	FILTER_PRICE,
	ORDEN_TITLE,
	ADD_TO_CART,
	REMOVE_ONE_FROM_CART,
	REMOVE_ALL_FROM_CART,
  GET_CATEGORIES
} from './types';

import axios from "axios";

export function getBySearch(input) {
  return async function (dispatch) {
    if (input.length) {
      try {
        const response = await axios.get(
          `http://localhost:3001/books?titleOrAuthor=${encodeURIComponent(
            input
          )}`
        );
        return dispatch({ type: GET_BY_SEARCH, payload: response.data });
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export const getBooks = (dispatch) => {
  axios
    .get(`http://localhost:3001/books`)
    .then((res) => dispatch({ type: GET_BOOKS, payload: res.data }))
    .catch((e) => console.log(e));
};

export const getCategories = (dispatch) => {
  axios
    .get(`http://localhost:3001/categories`)
    .then((res) => dispatch({ type: GET_CATEGORIES, payload: res.data }))
    .catch((e) => console.log(e));
};

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`http://localhost:3001/books/${id}`);
      return dispatch({ type: GET_DETAIL, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function clearDetail() {
  return { type: CLEAR_DETAIL };
}

export function filterCategory(category) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`ruta del back${category}`);
      return dispatch({ type: FILTER_CATEGORY, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterReview(review) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`ruta del back${review}`);
      return dispatch({ type: FILTER_CATEGORY, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterPrice(price1, price2) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`ruta del back${(price1, price2)}`);
      return dispatch({ type: FILTER_PRICE, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function ordenTitle(payload) {
  return { type: ORDEN_TITLE, payload };
}

export function filterScore(score){
    return async function (dispatch){
        try{
            var response = await axios.get(`ruta del back${score}`)
            return dispatch({type: FILTER_SCORE, payload: response.data})
        }
        catch(e){
            console.log(e)
        }
    }
}



export function addToCart(id) {  
	return { type: ADD_TO_CART, payload: id };
}

export function removeAllFromCart() {
  return { type: REMOVE_ALL_FROM_CART };
}

export function removeOneFromCart(id) {
  console.log(id)
  return { type: REMOVE_ONE_FROM_CART, payload: id };
}
