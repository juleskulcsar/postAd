import React from "react";
import Login from "./login";
import axios from "./axios";
import { HashRouter, Route, Link } from "react-router-dom";
// { HashRouter, Route, Switch, Link }
export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log("this state: ", this.state);
    }

    submit() {
        axios
            .post("/signup", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password,
                registeras: this.state.registeras
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }

    render() {
        return (
            <div className="registration">
                <input
                    name="first"
                    onChange={e => this.handleChange(e)}
                    placeholder="first name"
                />
                <input
                    name="last"
                    onChange={e => this.handleChange(e)}
                    placeholder="last name"
                />
                <input
                    name="email"
                    onChange={e => this.handleChange(e)}
                    placeholder="email"
                />
                <input
                    type="password"
                    name="password"
                    onChange={e => this.handleChange(e)}
                    placeholder="password"
                />
                <select name="registeras" onChange={e => this.handleChange(e)}>
                    <option value="designer">I'm a designer</option>
                    <option value="developer">I'm a developer</option>
                </select>
                <button onClick={e => this.submit(e)}>register</button>
                <div className="error">
                    {this.state.error && (
                        <div>
                            ooops! something went wrong!
                        </div>
                    )}
                </div>
                <p>
                    already registered? <Link style={{ textDecoration: 'none', color: 'orange' }} to="/login"> login.</Link>
                </p>
            </div>
        );
    }
}
