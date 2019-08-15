import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveAllFavs } from "./actions";
import AdsButton from "./adsbutton";

export default function AllFavs() {
    console.log("testing testing");
    const dispatch = useDispatch();
    const favs = useSelector(state => state.favs);
    console.log("LIST in allfavs", favs);

    useEffect(() => {
        dispatch(receiveAllFavs());
    }, []);

    // submit(){
    //     axios.post("/projectmodal", {
    //         post_id:
    //     })
    // }

    // console.log("testing props.id: ", props.id);
    // let userId = props.id;
    // console.log("allfavs userId: ", userId);

    return (
        <div className="fav-grid-container">
            <div className="fav-ads-list">
                {favs &&
                    favs.map(post => (
                        <div
                            className={
                                post.favorized ? "ads highlighted" : "ads"
                            }
                            key={post.id}
                        >
                            <p className="tile-title">{post.title}</p>
                            <p className="tile-desc">{post.description}</p>
                            <Link
                                className="tile-postedby"
                                to={`/user/${post.id}`}
                            >
                                <p className="tile-postedby">
                                    - posted by {post.first} {post.last}
                                </p>
                            </Link>
                            <AdsButton fav_id={post.fav_id} />
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
// <p>{post.title}</p>
// <p>{post.description}</p>
// .filter(user => {
//     return user.id == userId;
// })
