import React, { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import Uploader from "./uploader";
import PostPic from "./postpic";
import PostImageUploader from "./postimageuploader";

export default class PostUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClick() {
        this.props.handleClick();
    }

    submit() {
        console.log("this.state in addpost: ", this.state);
        axios
            .post("/post", {
                post_url: this.state.post_url,
                title: this.state.title,
                description: this.state.description
            })
            .then(({ data }) => {
                //same as resp.data and resp.data.success
                if (data.success) {
                    location.replace("/");
                    // return;
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div className="postUploader">
                <button id="postuplbutton" onClick={e => this.handleClick(e)}>X</button>
                <PostPic
                    post_url={this.state.post_url}
                    onClick={() => this.setState({ uploaderIsVisible: true })}
                />
                <input
                    name="title"
                    onChange={e => this.handleChange(e)}
                    placeholder="name of your project"
                />
                <textarea
                    name="description"
                    onChange={e => this.handleChange(e)}
                    placeholder="description"
                />
                <button onClick={() => this.submit()}>post</button>

                {this.state.uploaderIsVisible && (
                    <PostImageUploader
                        onClick
                        done={image => {
                            this.setState({
                                post_url: image,
                                uploaderIsVisible: false
                            });
                        }}
                        handleClick={() =>
                            this.setState({
                                uploaderIsVisible: false
                            })
                        }
                    />
                )}
            </div>
        );
    }
}
