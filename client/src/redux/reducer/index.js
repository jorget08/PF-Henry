import {

	GET_BY_SEARCH,
	GET_DETAIL,
	CLEAR_DETAIL,
	FILTER_CATEGORY,
	FILTER_SCORE,
	FILTER_PRICE,
	ORDEN_TITLE,
	ADD_TO_CART,
	REMOVE_ALL_FROM_CART,
	REMOVE_ONE_FROM_CART,
	GET_BOOKS,
	GET_CATEGORIES,
	GET_CART
} from '../actions/types';

const initialState = {
  allBook: [],
  allBookBackup: [],
  books: [],
  detail: [],
  cart: [],
  categories: []
};

export default function rootReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_BOOKS:
			return {
				...state,
				allBook: payload,
				allBookBackup: payload,
				books: payload
			};
		case GET_CATEGORIES:
		return {
			...state,
			categories: payload,
		};
		case GET_BY_SEARCH:
			return {
				...state,
				books: payload
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
			};
		case FILTER_CATEGORY:
			return {
				...state,
				books: payload
			};
      case FILTER_SCORE:
      return{
        ...state,
        books: payload
      };
		case FILTER_PRICE:
			return {
				...state,
				books: payload
			};
		case ORDEN_TITLE:
			let sortBook = [];
			if (payload === 'asc') {
				sortBook = state.allBook.sort(function(a, b) {
					if (a.title > b.title) {
						return 1;
					}
					if (a.title < b.title) {
						return -1;
					}
					return 0;
				});
			}
			if (payload === 'desc') {
				sortBook = state.allBook.sort(function(a, b) {
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
				books: sortBook
			};
		case ADD_TO_CART:
			let newbook = state.allBook?.find((book) => book?.id === payload);
			let carrito=JSON.parse(localStorage.getItem("carrito"))
			if(carrito){
				carrito.push(newbook)
				localStorage.setItem("carrito",JSON.stringify(carrito))
			}else{
				localStorage.setItem("carrito",JSON.stringify([newbook]))
			}
			return {
				...state,
				cart :JSON.parse(localStorage.getItem("carrito"))
			}
    case REMOVE_ALL_FROM_CART:
		localStorage.removeItem("carrito")
      return {
        cart: [],
      };

    case REMOVE_ONE_FROM_CART:
      let bookToDelete = JSON.parse(localStorage.getItem('carrito')).filter(book=>book.id !== payload)
	  localStorage.setItem('carrito',JSON.stringify(bookToDelete))
      
    return{
            ...state,
            cart: bookToDelete
          };

		  case GET_CART:
			  return{
				  ...state,
				  cart:JSON.parse(localStorage.getItem('carrito'))
			  }
    default:
      return state;
  }
}
