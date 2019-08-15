import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveAllPosts } from "./actions";

export default function Portfolio(props) {
    console.log("testing testing");
    const dispatch = useDispatch();
    const list = useSelector(state => state.posts);
    console.log("LIST in Portfolio", list);

    useEffect(() => {
        dispatch(receiveAllPosts());
    }, []);

    // submit(){
    //     axios.post("/projectmodal", {
    //         post_id:
    //     })
    // }

    // console.log("testing props.id: ", props.id);
    let userId = props.otherProfileId || props.id;
    console.log("or userId: ", userId);

    return (
        <div className="grid-container">
            <div className="posts-list">
                {list &&
                    list
                        .filter(user => {
                            return user.id == userId;
                        })
                        .map(post => (
                            <div>
                                <div className="posts" key={post.id}>
                                    <Link to={`/project/${post.post_id}`}>
                                        <img
                                            class="image-in-posts"
                                            id="image-in-posts"
                                            src={post.post_url}
                                        />
                                    </Link>
                                    <div class="overlay">{post.title}</div>
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    );
}
// <Link to={`/user/${ad.id}`}>
//     <p>
//         posted by {ad.first} {ad.last}
//     </p>
// </Link>

// <p>{post.description}</p>
