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
        <div className="posts-list">
            <div className="posts">
                <h2>portfolio</h2>
                {list &&
                    list
                        .filter(user => {
                            return user.id == userId;
                        })
                        .map(post => (
                            <div key={post.post_id}>
                                <Link to={`/project/${post.post_id}`}>
                                    <img src={post.post_url} />
                                </Link>
                                <p>{post.title}</p>
                                <p>{post.description}</p>
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
