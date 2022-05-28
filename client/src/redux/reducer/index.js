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
	POST_BOOK
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
				allBook: payload
			};
      case FILTER_SCORE:
      return{
        ...state,
        allBook: payload
      };
		case FILTER_PRICE:
			return {
				...state,
				allBook: payload
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
				allBook: sortBook
			};
		case ADD_TO_CART:
			let newbook = state.allBook?.find((book) => book?.id === payload);
			console.log("SOY ALLBOOK", state.allBook)
			console.log("SOY NEWBOOK", newbook)
			return {
				...state,
				cart : [...state.cart, newbook]
			}
    case REMOVE_ALL_FROM_CART:
      return {
        cart: [],
      };

	case POST_BOOK:
	return {
		...state,
	};

    case REMOVE_ONE_FROM_CART:
      let bookToDelete = state.cart.find((book) => book.id === payload);
      return bookToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((book) =>
              book.id === payload.id
                ? { ...book, quantity: book.quantity - 1 }
                : book
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((book) => book.id !== payload),
          };

    default:
      return state;
  }
}
