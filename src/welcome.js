import Signup from "./signup";
import React from "react";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
// { HashRouter, Route, Switch, Link }
export default function Welcome() {
    return (
        <HashRouter>
            <div>
                <h1>Welcome!</h1>
                <img src="/logo.png" alt="logo" height={50} />
                <div>
                    <Route exact path="/" component={Signup} />
                    <Route path="/login" component={Login} />
                </div>
            </div>
        </HashRouter>
    );
}
