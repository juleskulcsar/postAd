import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Welcome from "./welcome";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux";
// import reduxPromise from "redux-promise";
// import reducer from "./reducer";
// import { init } from "./socket";

// const store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(reduxPromise))
// );

let elem = <Welcome />;

if (location.pathname == "/welcome") {
    //they are logged out
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
