import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { composeWithDevTools } from "redux-devtools-extension";
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux";
// import reduxPromise from "redux-promise";
// import reducer from "./reducers";
// import { init } from './socket';

// const store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(reduxPromise))
// );

let elem ;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    // init(store);
    elem = (
        <App />
    );
}

ReactDOM.render(elem, document.querySelector("main"));
