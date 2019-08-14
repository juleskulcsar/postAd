import React, { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { newAdd } from "./actions";
import { useDispatch, useSelector } from "react-redux";


export default function TileUploader() {
    const dispatch = useDispatch();
    const ads = useSelector(
        state => state && state.ads
    )
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function submitAd() {
        dispatch(newAdd(title, description));
        setTitle("");
        setDescription("");
    }

        return (
            <div className="tileUploader">
                <input
                    name="title"
                    onChange={e => setTitle(e.target.value)}
                    placeholder="name of your ad"
                    value={title}
                />
                <textarea
                    name="description"
                    onChange={e => setDescription(e.target.value)}
                    placeholder="description"
                    value={description}
                />
                <button className="tile-uploader-btn" onClick={submitAd}>post</button>
            </div>
        );
    }
// }
