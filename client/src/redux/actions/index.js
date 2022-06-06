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
  GET_CATEGORIES,
  POST_BOOK,
  GET_CART,
  PUT_BOOK,
  DELETE_BOOK,
  GET_LANDING_TOP,
  GET_LANDING_TOP_CAT,
  CREATE_USER,
  LOG_USER,
  UNLOG_USER,
  LOG_WITH_GOOGLE,
  PAYMENT_PAYPAL,
  TOTAL_PRICE,
  CHECKOUT_BOOKS,
  GET_USERS,
  EDIT_PROFILE,
  GET_USER,
  SEND_EMAIL,
  GET_FAV,
  ADD_COMMENT,
  GET_COMMENTS,
  GET_SUPPORT
} from "./types";

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
  if (category === "All") {
    return async function (dispatch) {
      try {
        var response = await axios.get(`http://localhost:3001/books`);
        return dispatch({ type: FILTER_CATEGORY, payload: response.data });
      } catch (e) {
        console.log(e);
      }
    };
  } else {
    return async function (dispatch) {
      try {
        var response = await axios.get(
          `http://localhost:3001/books?category=${category}`
        );
        return dispatch({ type: FILTER_CATEGORY, payload: response.data });
      } catch (e) {
        console.log(e);
      }
    };
  }
}

export function filterPrice(price1, price2) {
  return async function (dispatch) {
    try {
      var response = await axios.get(
        `http://localhost:3001/books?rango1=${price1}&rango2=${price2}`
      );
      return dispatch({ type: FILTER_PRICE, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function ordenTitle(payload) {
  return { type: ORDEN_TITLE, payload };
}

export function filterScore(score) {
  if (score === "All") {
    return async function (dispatch) {
      try {
        var response = await axios.get(`http://localhost:3001/books`);
        return dispatch({ type: FILTER_SCORE, payload: response.data });
      } catch (e) {
        console.log(e);
      }
    };
  } else {
    return async function (dispatch) {
      try {
        var response = await axios.get(
          `http://localhost:3001/books?score=${score}`
        );
        return dispatch({ type: FILTER_SCORE, payload: response.data });
      } catch (e) {
        console.log(e);
      }
    };
  }
}

export function addToCart(id) {
  return { type: ADD_TO_CART, payload: id };
}

export function removeAllFromCart() {
  return { type: REMOVE_ALL_FROM_CART };
}

export function removeOneFromCart(id) {
  console.log(id);
  return { type: REMOVE_ONE_FROM_CART, payload: id };
}

export function postBook(data) {
  return (dispatch) => {
    axios
      .post(`http://localhost:3001/books`, data)
      .then((response) => dispatch({ type: POST_BOOK }))
      .catch((e) => {
        console.log(e);
      });
  };
}

export function putBook(data, id) {
  return (dispatch) => {
    axios
      .put(`http://localhost:3001/books/book/${id}`, data)
      .then((response) => dispatch({ type: PUT_BOOK }))
      .catch((e) => {
        console.log(e);
      });
  };
}

export function deleteBook(id) {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3001/books/delete/book/${id}`)
      .then((response) => dispatch({ type: DELETE_BOOK }))
      .catch((e) => {
        console.log(e);
      });
  };
}

export function getCart() {
  return { type: GET_CART };
}
export function getLandingTop() {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/books/land/filter?score=5`)
      .then((res) => dispatch({ type: GET_LANDING_TOP, payload: res.data }))
      .catch((err) => console.log(err));
  };
}
export function getLandingTopCat() {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/books/landing/Adventures/Thriller/Academic`)
      .then((res) => dispatch({ type: GET_LANDING_TOP_CAT, payload: res.data }))
      .catch((err) => console.log(err));
  };
}

export function postUser(payload) {
  return async function () {
    try {
      let response = await axios.post(`http://localhost:3001/user/`, payload);
      console.log("DALEGATO", response);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
}

export function logUser(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.post(`http://localhost:3001/auth/`, payload);
      let TKN = response.data.token;
      localStorage.setItem("token", JSON.stringify(TKN));
      return dispatch({ type: LOG_USER, payload: response.data.user });
    } catch (e) {
      console.log(e);
    }
  };
}

export function unlogUser() {
  localStorage.removeItem("token");
  return { type: UNLOG_USER };
}

export function logWithGoogle(payload) {
  return async function (dispatch) {
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/google",
        payload
      );
      let TKN = res.data.token;
      console.log("res", res.data);
      return dispatch({ type: LOG_WITH_GOOGLE, payload: res.data });
    } catch (error) {
      console.log("error", error);
    }
  };
}

export function paymentPaypal(payload) {
  return async function () {
    try {
      const pay = await axios.post("http://localhost:3001/paypal", payload);
      return { type: PAYMENT_PAYPAL, payload: pay };
    } catch (err) {
      console.log(err);
    }
  };
}
export function totalPrice(payload) {
  return { type: TOTAL_PRICE, payload };
}

export function infoBooks(payload) {
  return { type: CHECKOUT_BOOKS, payload };
}

export function infoSoldBooks(payload) {
  return async function () {
    try {
      const res = await axios.post("http://localhost:3001/paypal", payload);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  };
}

export function getUsers(payload) {
  return async function (dispatch) {
    try {
      const res = await axios.get("http://localhost:3001/user", payload);
      console.log("soy res", res.data.users);
      return dispatch({ type: GET_USERS, payload: res.data.users });
    } catch (err) {
      console.log(err);
    }
  };
}

export function editProfile(payload, id) {
  return async function (dispatch) {
    try {
      var response = await axios.put(
        `http://localhost:3001/user/${id}`,
        payload,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      return dispatch({ type: EDIT_PROFILE, payload: response.data.userUp });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getUser() {
  return async function (dispatch) {
    try {
      var response = await axios.get(`http://localhost:3001/auth/renew`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return dispatch({ type: GET_USER, payload: response.data.user });
    } catch (e) {
      console.log(e);
    }
  };
}
export function sendEmail(payload) {
  return async function () {
    try {
      const sendEmail = await axios.post(
        "http://localhost:3001/email",
        payload
      );
      return { type: SEND_EMAIL, payload: sendEmail };
    } catch (err) {
      console.log(err);
    }
  };
}

export function getFavs() {
  return async function (dispatch) {
    try {
      const favs = await axios.get("http://localhost:3001/favourites");
      return dispatch({ type: GET_FAV, payload: favs.data });
    } catch (error) {
      console.log(error);
    }
  };
}


export function postSupport(payload) {
  return async function () {
    try {
      let response = await axios.post(`http://localhost:3001/support`, payload);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
}

export function addComment(payload){
  return async function (dispatch) {
    try {
      console.log("add comment", payload)
      var response = await axios.post(`http://localhost:3001/reviews`,payload);
      return dispatch({ type: ADD_COMMENT });
    } catch (e) {
      console.log(e);
    }
  };
}

export function showComments(id){
  return async function (dispatch) {
    try {
      let response = await axios.get(`http://localhost:3001/reviews/allReviews?book=${id}`);
      console.log("comentarios",response)
      return dispatch ({type:GET_COMMENTS, payload: response.data})
    } catch (e) {
      console.log(e);
    }
  };
}

export function getSupport() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/support");
      return dispatch({ type: GET_SUPPORT, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}
