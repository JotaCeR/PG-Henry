import { GET_MOVIES_DETAIL } from "../actions/movies";
import { GET_PRODUCTS, ADD_TOTAL, SUBSTRACT_TOTAL, SAVE_SLOT, SAVE_PRODUCT, DELETE_PRODUCT } from "../actions/products";
import { GET_USERS } from "../actions/users";

const initialState = {
  products: [],
  purchase:{
    total:0,
    slot:'',
    day:'',
    time:'',
    extras:{},
    title:''
  },
  movieDetail: {},
  users: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };
    case GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case ADD_TOTAL: {
      return {
        ...state,
        purchase:{
          ...state.purchase,
          total: state.purchase.total + action.payload,
        } 
      };
    }
    case SUBSTRACT_TOTAL: {
      return {
        ...state,
        purchase:{
          ...state.purchase,
          total: state.purchase.total - action.payload,
        } 
      };
    }
    case SAVE_SLOT: {
      return {
        ...state,
        purchase:{
          ...state.purchase,
          slot: action.payload,
        } 
      };
    }
    case SAVE_PRODUCT: {
      if(!state.purchase.extras.hasOwnProperty(action.payload)){
        state.purchase.extras[action.payload]=1;
        return state
      }
      else{
        return {
          ...state,
          purchase:{
            ...state.purchase,
            extras: {
              ...state.purchase.extras,
              [action.payload]: state.purchase.extras[action.payload] +1,
              }
          } 
        };
      }
    }
    case DELETE_PRODUCT: {
      if(state.purchase.extras[action.payload] - 1 === 0){
        delete state.purchase.extras[action.payload]
        return state;
      }
      else{
        return {
          ...state,
          purchase:{
            ...state.purchase,
            extras: {
              ...state.purchase.extras,
              [action.payload]: state.purchase.extras[action.payload] -1,
              }
          } 
        };
      }
    }
    //users
    case GET_USERS: {
      // Para que en la pantalla del admin se muestren los usuarios
      return {
        ...state,
        users: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
