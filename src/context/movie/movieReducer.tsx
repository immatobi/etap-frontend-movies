import {
    GET_MOVIES,
    SET_LOADING,
    UNSET_LOADING,
    SET_PAGINATION_U,
    SET_TOTAL_U,
    SET_PAGINATION,
    SET_TOTAL,
    SET_COUNT,
    SET_RESPONSE,
    SET_SEARCH,
    GET_BRANDS,
    GET_GENRES,
    GET_LOGGEDIN_USER,
    SET_USERTYPE,
} from "../types";

const reducer = (state: any, action: any) => {

    switch(action.type){

        case GET_LOGGEDIN_USER: 
            return {
                ...state,
                user: action.payload,
                loading: false
            }

        case GET_MOVIES: 
            return {
                ...state,
                movies: action.payload,
                loading: false
            }
        case GET_BRANDS: 
            return {
                ...state,
                brands: action.payload,
                loading: false
            }
        case GET_GENRES: 
            return {
                ...state,
                genres: action.payload,
                loading: false
            }
        case SET_USERTYPE: 
            return {
                ...state,
                userType: action.payload,
                loading: false
            }

        case SET_SEARCH: 
            return {
                ...state,
                search: action.payload,
                loading: false
            }
       
        case SET_PAGINATION: 
            return {
                ...state,
                pagination: action.payload,
                loading: false
            }
        case SET_TOTAL: 
            return {
                ...state,
                total: action.payload,
                loading: false
            }

        case SET_COUNT: 
            return {
                ...state,
                count: action.payload,
                loading: false
            }

        case SET_LOADING: 
            return {
                ...state,
                loading: true
            }
        case UNSET_LOADING: 
            return {
                ...state,
                loading: false
            }

        case SET_RESPONSE: 
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case SET_PAGINATION_U: 
            return {
                ...state,
                _pagination: action.payload,
                loading: false
            }

        case SET_TOTAL_U: 
            return {
                ...state,
                _total: action.payload,
                loading: false
            }
        default: 
        return state;
    }

}

export default reducer;