import {INCREMENT,DECREMENT,FETCH_USER_SUCCESS,FETCH_USER_REQUEST,FETCH_USER_ERROR,LOAD_USER} from "../constants";
import axios from "axios";
/*使用中间件react-thunk异步添加*/
export const increment= (name) =>{
    return dispatch => {
        setTimeout(()=>{
            dispatch({
                    type:INCREMENT,
                    name
                })
        },3000);

    }
}

export const decrement= () =>{
    return {
        type:DECREMENT
    }
}

/*使用react-thunk异步获取数据*/
export const getUser=()=>{
   /* return dispatch =>{
        dispatch(fetchUserRequest());
        axios.get("https://randomuser.me/api/").then(
            response =>{
                //回调函数把数据返回到reducer中,然后存入store中的state中
                dispatch(fetchUser(response.data.results[0]))
            }
        ).catch(
            error =>{
                dispatch(fetchUserError(error.message));
            }
        )
    }*/
    return {
        type:LOAD_USER,
        payload:axios.get("https://randomuser.me/api/")
    }
}

/*获取用户数据的action字段*/
export const fetchUser=(user)=>{
    return {
        type:FETCH_USER_SUCCESS,
        userdata:user
    }
}

/*加载前的loding..*/
export const fetchUserRequest=()=>{
    return {
        type:FETCH_USER_REQUEST,
    }
}

/*加载失败*/
export const fetchUserError=(error)=>{
    return {
        type:FETCH_USER_ERROR,
        error
    }
}
