import { GET_BY_SEARCH, GET_DETAIL, CLEAR_DETAIL, FILTER_CATEGORY, FILTER_SCORE, FILTER_PRICE, ORDEN_TITLE } from "../actions/types";

const initialState = {
  allBook: [],
  allBookBackup:[],
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
    case FILTER_CATEGORY:
      return{
        ...state,
        allBook: payload
      }
    case FILTER_SCORE:
      return{
        ...state,
        allBook: payload
      }
    case FILTER_PRICE:
      return{
        ...state,
        allBook: payload
      }
    case ORDEN_TITLE:
      let sortBook=[]
      if (payload==="asc"){
      sortBook=state.allBook.sort(function(a,b){
        if(a.title>b.title){
          return 1;
        }
        if(a.title<b.title){
          return -1;
        }
        return 0;
      })}
      if (payload==="desc"){
        sortBook=state.allBook.sort(function(a,b){
          if(a.title<b.title){
            return 1;
          }
          if(a.title>b.title){
            return -1;
          }
          return 0;
        })}
      else {sortBook=state.allBookBackup}
      return{
        ...state,
        allBook: sortBook
      }

    default: return state
  }
}
