import Signup from "./signup";
import React from "react";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
// { HashRouter, Route, Switch, Link }
export default function Welcome() {
    return (
        <HashRouter>
            <div className="welcome">
                <img src="/PostAd_logotype_white.png" alt="logo" height={50} />
                <div>
                    <Route exact path="/" component={Signup} />
                    <Route path="/login" component={Login} />
                </div>
            </div>
        </HashRouter>
    );
}
