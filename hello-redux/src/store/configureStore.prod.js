import {createStore,applyMiddleware} from  "redux";
import rootReducer from "../reducers/index"
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const configureStore = (preloadedState) => {
    const store = createStore(
        rootReducer,preloadedState,applyMiddleware(thunk,promise())
    );
    return store;
}
export default configureStore;