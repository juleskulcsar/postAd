import React, { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import Uploader from "./uploader";
import PostPic from "./postpic";
import PostImageUploader from "./postimageuploader";

// import { newPost } from "./actions";
// import { useDispatch, useSelector } from "react-redux";
//
// export default function PostUploader() {
//     const dispatch = useDispatch();
//     const posts = useSelector(state => state && state.ads);
//
//     const [url, setUrl] = useState("");
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//
//     function submitPost() {
//         dispatch(newPost(url, title, description));
//         setTitle("");
//         setDescription("");
//     }
//
//     console.log("URL: ", url);
//     console.log("title: ", title);
//     console.log("desc: ", description);
//
//     return (
//         <div className="postUploader">
//             <PostPic
//                 url={this.state.url}
//                 onClick={() => this.setState({ uploaderIsVisible: true })}
//                 onChange={e => setUrl(e.target.value)}
//             />
//             <input
//                 name="title"
//                 onChange={e => setTitle(e.target.value)}
//                 placeholder="name of your ad"
//                 value={title}
//             />
//             <textarea
//                 name="description"
//                 onChange={e => setDescription(e.target.value)}
//                 placeholder="description"
//                 value={description}
//             />
//             <button onClick={submitPost}>post</button>
//
//             {this.state.uploaderIsVisible && (
//                 <PostImageUploader
//                     onClick
//                     done={image => {
//                         this.setState({
//                             url: image,
//                             uploaderIsVisible: false
//                         });
//                     }}
//                     handleClick={() =>
//                         this.setState({
//                             uploaderIsVisible: false
//                         })
//                     }
//                 />
//             )}
//         </div>
//     );
// }
// }

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
