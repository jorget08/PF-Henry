import { GET_BY_SEARCH, GET_DETAIL, CLEAR_DETAIL } from "../actions/types";

const initialState = {
  allBook: [],
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
        detail: payload
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        detail: []
      }
    default: return state
  }
}
