import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleClick() {
        this.props.handleClick();
    }

    upload(e) {
        e.preventDefault();
        this.file = e.target.files[0];
        let formData = new FormData();
        formData.append("file", this.file);
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                this.props.done(data);
            })
            .catch(err => {
                console.log("error in axios.post /upload: ", err);
            });
    }

    render() {
        return (
            <div className="uploader">
                <button className="close-btn" onClick={e => this.handleClick(e)}>X</button>
                    <h1>change your profile picture</h1>
                    <input
                        type="file"
                        className="inputfile"
                        name="file"
                        accept="image/*"
                        onChange={e => this.upload(e)}
                    />
                    <label ref="filelabel" htmlFor="file">
                        select file
                    </label>
            </div>
        );
    }
}
