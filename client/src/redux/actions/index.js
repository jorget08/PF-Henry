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
  ADD_COMMENT,
  GET_COMMENTS,
  GET_SUPPORT,
  GET_FAVS,
  CHANGE_FAVS,
  DELETE_FAVS,
  POST_FAVS,
  GET_SHOPPING_HISTORY,
  SET_PAGE,
  DELETE_REVIEW,
  REPORT_REVIEW,
  UPDATE_REVIEW,
  CONFIRMATION_MAIL,
  REQUEST_NEW_PASSWORD,
  CHANGE_PASSWORD1,
  CRYPTO,
  GET_SALES,
  GET_REVIEWS,
  REPLY_SUPPORT,
  SET_DELIVERY_ADDRESS,
  REPLY_SUPPORT_GUEST,
  UPDATE_SENT,
  UPDATE_DONE,
  DELETE_ADM_REVIEW,
  CHANGE_IMG,
  BOOK_EDIT,
} from "./types";

import axios from "axios";
import Swal from "sweetalert2";

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
        if(response.data.length!==0){return dispatch({ type: FILTER_CATEGORY, payload: response.data })}
        else{Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There are no books that match your search',
        })};
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
      if(response.data.length!==0){return dispatch({ type: FILTER_PRICE, payload: response.data })}
      else{Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There are no books that match your search',
      })};
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
        if(response.data.length!==0){return dispatch({ type: FILTER_SCORE, payload: response.data })}
        else{Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There are no books that match your search',
        })};
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
      console.log("log", response.data);
      if (response.data.user.confirmation === false) {
        return;
      } else {
        let TKN = response.data.token;
        localStorage.setItem("token", JSON.stringify(TKN));
        return dispatch({ type: LOG_USER, payload: response.data.user });
      }
    } catch (e) {
      console.log("log", e.message);
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
      console.log("edit", response.data);
      return dispatch({ type: EDIT_PROFILE, payload: response.data.userUp });
    } catch (e) {
      console.log(e);
    }
  };
}

export function addAdress(payload, id) {
  return async function (dispatch) {
    try {
      var response = await axios.put(
        `http://localhost:3001/user/${id}`,
        { adress: payload },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.log("edit", response.data);
      return dispatch({ type: EDIT_PROFILE, payload: response.data.userUp });
    } catch (e) {
      console.log(e);
    }
  };
}
export function deleteProfile(payload, id) {
  return async function (dispatch) {
    try {
      const adress = payload;
      //? cotent-type=application/json
      var response = await axios.delete(
        `http://localhost:3001/auth/adress/${id}`,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
          data: { adress },
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

export function addComment(obj) {
  return async function (dispatch) {
    try {
      var response = await axios.post(`http://localhost:3001/reviews`, obj);
      return dispatch({ type: ADD_COMMENT, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function showComments(id) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3001/reviews/allReviews?book=${id}`
      );
      console.log("comentarios", response);
      return dispatch({ type: GET_COMMENTS, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getSupport() {
  return async function (dispatch) {
    try {
      const res = await axios.get("http://localhost:3001/support");
      // localStorage.setItem("token", JSON.stringify(res.data.token));
      // console.log(res.data);
      // console.log("id admin", localStorage.getItem("token"));
      return dispatch({ type: GET_SUPPORT, payload: res.data.supports });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getFavs(user) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/favourites?user=${user}`
      );
      return dispatch({ type: GET_FAVS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getShoppingHistory(id) {
  return async function (dispatch) {
    try {
      var response = await axios.get(
        `http://localhost:3001/paypal/payments/${id}`
      );
      return dispatch({ type: GET_SHOPPING_HISTORY, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteFavs(user, book) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        `http://localhost:3001/favourites?user=${user}&favs=${book}`
      );
      return dispatch({ type: DELETE_FAVS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function postFavs(obj) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `http://localhost:3001/favourites`,
        obj
      );
      return dispatch({ type: POST_FAVS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setPage(num) {
  return async function (dispatch) {
    try {
      return dispatch({ type: SET_PAGE, payload: num });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeFavs(payload) {
  return { type: CHANGE_FAVS, payload };
}

export function reportReview(id, idBook, obj) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`http://localhost:3001/reviews/report/${id}?book=${idBook}`, obj);
      return dispatch({ type: REPORT_REVIEW, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  }
}
  export function deleteReview(book, review) {
    return async function (dispatch) {
      try {
        const response = await axios.delete(`http://localhost:3001/reviews?book=${book}&review=${review}`);
        return dispatch({ type: DELETE_REVIEW, payload: response.data });
         } catch (error) {
        console.log(error);
      }
      }
    }

export function updateReview(review, book, obj) {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:3001/reviews?review=${review}&book=${book}`,
        obj
      );
      return dispatch({ type: UPDATE_REVIEW, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function confirmationMail(id) {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:3001/auth/confirmation/${id}`
      );
      console.log("response", response);
      return dispatch({ type: CONFIRMATION_MAIL });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editReview(id, obj) {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:3001/reviews/report/${id}`,
        obj
      );
      return dispatch({ type: REPORT_REVIEW, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function requestPassword(email) {
  return async function (dispatch) {
    try {
      console.log(email);
      const response = await axios.post(
        `http://localhost:3001/email/password`,
        { email }
      );
      console.log("response", response);
      return dispatch({ type: REQUEST_NEW_PASSWORD });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changePassword1(id, password) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`http://localhost:3001/user/${id}`, {
        password,
      });
      console.log("response", response);
      return dispatch({ type: CHANGE_PASSWORD1 });
    } catch (error) {
      console.log(error);
    }
  };
}

export function exchangeCrypto() {
  return async function (dispatch) {
    try {
      var response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
      );
      return dispatch({ type: CRYPTO, payload: response.data.ethereum.usd });
    } catch (e) {
      console.log(e);
    }
  };
}

export function replySupport(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.put(
        `http://localhost:3001/support`,
        payload
        /* {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        } */
      );
      console.log("estoy en el reply");
      return dispatch({ type: REPLY_SUPPORT, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getSales() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/paypal/allpayments`);
      console.log("ACT COMPRAS", res);
      return dispatch({ type: GET_SALES, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getReviews() {
  return async function (dispatch) {
    try {
      const res = await axios.get('http://localhost:3001/reviews/allReviews/admin');
      console.log("ACT REVIEWS", res);
      return dispatch({ type: GET_REVIEWS, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteAdmReview(id, obj) {
  return async function (dispatch) {
    try {
      const res = await axios.put(`http://localhost:3001/reviews/report/${id}`, {report:null})
      return dispatch({ type: DELETE_ADM_REVIEW, payload: res.data });
    } catch (err) {
      console.log(err)
    }
  }
}


export function filterSupportStatus (payload) {
  return ({
      type: "FILTER_SUPPORT",
      payload: payload
  })
}

export function setDeliveryAddress(address) {
  return async function (dispatch) {
    try {
      return dispatch({ type: SET_DELIVERY_ADDRESS, payload: address });
    } catch (error) {
      console.log(error);
    }
  };
}

export function replySupportGuest(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.post(
        `http://localhost:3001/email/support`,
        payload
        /* {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        } */
      );
      
    } catch (e) {
      console.log(e);
    }
  };
}

export function updateSent(id) {
  return async function (dispatch) {
    try {
      var response = await axios.put("http://localhost:3001/paypal/payments/sent",{id:id})
      return dispatch({ type: UPDATE_SENT });
    } catch (error) {
      console.log(error);
    }
  };
}


export function updateDone(id) {
  return async function (dispatch) {
    try {
      var response = await axios.put("http://localhost:3001/paypal/payments/done",{id:id})
      return dispatch({ type: UPDATE_DONE });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeImg(id, tipo, img) {
    return async function (dispatch) {
      try {
        var response = await axios.put(`http://localhost:3001/upload/${tipo}/${id}`, img, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        console.log("change img", response.data);
        return dispatch({ type: CHANGE_IMG, payload: response.data.url });
      } catch (error) {
        console.log(error);
      }
    }
}

export function bookEdit(id) {
  return async function (dispatch) {
    try {
      return dispatch({ type: BOOK_EDIT, payload: id });
    } catch (error) {
      console.log(error);
    }
  };
}