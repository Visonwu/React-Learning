import {ADD_REMINDER,DELETE_REMINDER,CLEAR_REMINDER} from "../constants";
import {bake_cookie,read_cookie} from "sfcookies";

const reminder = (action)=>{
    return {
        text:action.text,
        dueDate:action.dueDate,
        id:Math.random()
    }
}

const reminders = ((state = read_cookie("reminders")|| [],action={}) =>{
    let reminders = null;
    switch (action.type){
        case ADD_REMINDER:
            reminders = [
                ...state,
                reminder(action)
            ];
            /*把当前的数据存储在cookie中*/
            bake_cookie("reminders",reminder);
            return reminders
        case DELETE_REMINDER:
            reminders = state.filter(reminder => reminder.id !== action.id)
            bake_cookie("reminders",reminder);
            return reminders;
        case CLEAR_REMINDER:
            reminders=[];
            bake_cookie("reminders",reminder);
            return reminders;
        default:
          return  state;
    }
})

export default reminders;