import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class TileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.submit = this.submit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submit() {
        axios
            .post("/ads", {
                title: this.state.title,
                description: this.state.description
            })
            .then(({ data }) => {
                //same as resp.data and resp.data.success
                if (data.success) {
                    // location.replace("/allads");
                    return;
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div className="tileUploader">
                <input
                    name="title"
                    onChange={e => this.handleChange(e)}
                    placeholder="name of your ad"
                />
                <textarea
                    name="description"
                    onChange={e => this.handleChange(e)}
                    placeholder="description"
                />

                <button onClick={e => this.submit()}>post</button>
            </div>
        );
    }
}
