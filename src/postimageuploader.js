import React from "react";
import axios from "./axios";

export default class PostImageUploader extends React.Component {
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
            .post("/postimageupload", formData)
            .then(({ data }) => {
                this.props.done(data);
            })
            .catch(err => {
                console.log("error in axios.post /postimageupload: ", err);
            });
    }

    render() {
        return (
            <div>
                <div className="post-image-uploader">
                    <h3>upload project image</h3>
                    <input
                        type="file"
                        className="inputfile"
                        name="file"
                        accept="image/*"
                        // encType="multipart/form-data"
                        onChange={e => this.upload(e)}
                    />
                    <label id="filelabel" ref="filelabel" htmlFor="file">
                        select file
                    </label>
                    <button onClick={e => this.handleClick(e)}>cancel</button>
                </div>
            </div>
        );
    }
}
