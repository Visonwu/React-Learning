import {FETCH_USER_ERROR, FETCH_USER_REQUEST, FETCH_USER_SUCCESS,LOAD_USER_FULFILLED,LOAD_USER_REJECTED,LOAD_USER_PENDING} from "../constants";

/*初始化数据*/
const initialState = {
    isFetching:false,
    error:null,
    userdata:{}
}

const user = (state= initialState,action={}) => {
    switch (action.type){
        case LOAD_USER_FULFILLED:

            return {
                isFetching:false,
                error:null,
                userdata:action.payload.data.results[0]
            };
        case LOAD_USER_PENDING:
            return {
                isFetching:true,
                error:null,
                userdata:null
            };
        case LOAD_USER_REJECTED:
            console.log(action)
            return {
                isFetching:true,
                error:action.payload.message,
                userdata:null
            };
        default:
            return state;
    }
}

export  default  user;