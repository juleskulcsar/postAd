import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveAllPosts } from "./actions";

export default function Portfolio() {
    console.log("testing testing");
    const dispatch = useDispatch();
    const list = useSelector(state => state.posts);
    console.log("LIST in Portfolio", list);

    useEffect(() => {
        dispatch(receiveAllPosts());
    }, []);

    return (
        <div className="posts-list">
            <div className="posts">
                <h2>portfolio</h2>
                {list &&
                    list.map(post => (
                        <div key={post.id}>
                            <img src={post.post_url} />
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
