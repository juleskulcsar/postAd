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
            <div>
                <div>
                    {this.state.error && (
                        <div className="error">
                            Ooops! Something went wrong!
                        </div>
                    )}
                </div>
                <input
                    name="first"
                    onChange={e => this.handleChange(e)}
                    placeholder="first name"
                />
                <br />
                <br />
                <input
                    name="last"
                    onChange={e => this.handleChange(e)}
                    placeholder="last name"
                />
                <br />
                <br />
                <input
                    name="email"
                    onChange={e => this.handleChange(e)}
                    placeholder="email"
                />
                <br />
                <br />
                <input
                    type="password"
                    name="password"
                    onChange={e => this.handleChange(e)}
                    placeholder="password"
                />
                <br />
                <br />
                <select name="registeras" onChange={e => this.handleChange(e)}>
                    <option value="designer">I am a designer</option>
                    <option value="developer">I am a developer</option>
                </select>
                <br />
                <br />
                <button onClick={e => this.submit(e)}>register</button>
                <p>
                    Already registered? <Link to="/login"> Login!</Link>
                </p>
            </div>
        );
    }
}
