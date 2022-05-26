import {
  GET_BY_SEARCH,
  GET_DETAIL,
  CLEAR_DETAIL,
  FILTER_CATEGORY,
  FILTER_REVIEW,
  FILTER_PRICE,
  ORDEN_TITLE,
} from "../actions/types";

const initialState = {
  allBooks: [],
  allBookBackup: [],
  books: [],
  detail: [],
};

export default function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BY_SEARCH:
      return {
        ...state,
        books: payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        detail: [],
      };
    case FILTER_CATEGORY:
      return {
        ...state,
        allBooks: payload,
      };
    case FILTER_REVIEW:
      return {
        ...state,
        allBooks: payload,
      };
    case FILTER_PRICE:
      return {
        ...state,
        allBooks: payload,
      };
    case ORDEN_TITLE:
      let sortBook = [];
      if (payload === "asc") {
        sortBook = state.allBooks.sort(function (a, b) {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        });
      }
      if (payload === "desc") {
        sortBook = state.allBooks.sort(function (a, b) {
          if (a.title < b.title) {
            return 1;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 0;
        });
      } else {
        sortBook = state.allBookBackup;
      }
      return {
        ...state,
        allBooks: sortBook,
      };

    default:
      return state;
  }
}
