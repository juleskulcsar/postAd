import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveAllAds } from "./actions";
import TileUploader from "./TileUploader";
// import FriendButton from "./FriendButton";
export default function AllAds() {
    const dispatch = useDispatch();
    const list = useSelector(state => state.ads);
    // console.log("LIST in ALLADS", list);

    useEffect(() => {
        dispatch(receiveAllAds());
    }, []);

    return (
        <div className="ads-list">
            <div className="ads">
                <h1>create ad</h1>
                <TileUploader />
                <h2>all ads</h2>
                {list &&
                    list.map(ad => (
                        <div key={ad.ad_id}>
                            <Link to={`/user/${ad.id}`}>
                                <p>
                                    posted by {ad.first} {ad.last}
                                </p>
                            </Link>
                            <p>{ad.title}</p>
                            <p>{ad.description}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
