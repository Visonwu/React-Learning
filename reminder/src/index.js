import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {createStore,applyMiddleware} from "redux";
import rootReducer from "./reducers/index";
import {composeWithDevTools} from "redux-devtools-extension"
import logger from  "redux-logger";

const  store = createStore(rootReducer,composeWithDevTools(
    applyMiddleware(logger),
));
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
