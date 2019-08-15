import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/allads");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }

    render() {
        return (
            <div className="login">
            <h1>login</h1>
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
                <button onClick={e => this.submit(e)}>login</button>
                <div className="error">
                    {this.state.error && (
                        <div>ooops! invalid e-mail or password.</div>
                    )}
                </div>
            </div>
        );
    }
}
