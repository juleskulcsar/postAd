import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveAllAds } from "./actions";
import TileUploader from "./TileUploader";
import AdsButton from "./adsbutton";
// import FriendButton from "./FriendButton";
export default function AllAds() {
    const dispatch = useDispatch();
    const list = useSelector(state => state.ads);
    console.log("LIST in ALLADS", list);

    useEffect(() => {
        dispatch(receiveAllAds());
    }, []);

    return (
        <div className="create-ad">
            <h3>create ad</h3>
            <TileUploader />
            <div>
                <div className="ads-list">
                    {list &&
                        list.map(ad => (
                            <div
                                className={
                                    ad.favorized ? "ads highlighted" : "ads"
                                }
                                key={ad.ad_id}
                            >
                                <p className="tile-title">{ad.title}</p>
                                <p className="tile-desc">{ad.description}</p>
                                <Link
                                    className="tile-postedby"
                                    to={`/user/${ad.id}`}
                                >
                                    <p className="tile-postedby">
                                        - posted by {ad.first} {ad.last}
                                    </p>
                                </Link>
                                <AdsButton
                                    // saveFav={saveFav}
                                    fav_id={ad.ad_id}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

// <span>
//     { showHighlight ?
//     <div className="ads-highlight">
//     <a href="https://www.google.com" target="_blank">Google</a>
//     </div> :
//     '' }
// </span>
