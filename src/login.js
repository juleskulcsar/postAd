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
            <div>
                <div>
                    {this.state.error && (
                        <div>Ooops! Something went wrong! Try again</div>
                    )}
                </div>
                <input
                    name="email"
                    onChange={e => this.handleChange(e)}
                    palceholder="email"
                />
                <input
                    type="password"
                    name="password"
                    onChange={e => this.handleChange(e)}
                    placeholder="password"
                />
                <button onClick={e => this.submit(e)}>login</button>
            </div>
        );
    }
}
