import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware} from  "redux";
import rootReducer from "./reducers/index"
import {Provider} from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import configureStore from "./store/configureStore";

/*自定义的中间件*/
/*const logger = store => next => action => {
    console.log("dispatching",action);
    let result = next(action);
    console.log("next state:"+store.getState());
    return result
};*/

/*const store = createStore(rootReducer,{},applyMiddleware(logger,thunk,promise()));*/


const  store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();

