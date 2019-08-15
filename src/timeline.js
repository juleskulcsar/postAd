import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveAllPostsTimeline } from "./actions";

export default function Timeline() {
    console.log("testing testing");
    const dispatch = useDispatch();
    const list = useSelector(state => state.posts);
    console.log("LIST in Portfolio", list);

    useEffect(() => {
        dispatch(receiveAllPostsTimeline());
    }, []);

    // submit(){
    //     axios.post("/projectmodal", {
    //         post_id:
    //     })
    // }

    // console.log("testing props.id: ", props.id);
    // let userId = props.otherProfileId || props.id;
    // console.log("or userId: ", userId);

    return (
        <div className="timeline-grid-container">
            <div className="timeline-posts-list">
                {list &&
                    list.map(post => (
                        <div className="posts" key={post.id}>
                            <Link to={`/project/${post.post_id}`}>
                                <img id="image-in-posts" src={post.post_url} />
                            </Link>
                            <Link class="timeline-overlay" to={`/user/${post.id}`}>
                                    {post.title} posted by {post.first} {post.last}
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}
// <p>{post.title}</p>
// <p>{post.description}</p>
