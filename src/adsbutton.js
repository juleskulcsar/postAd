import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import axios from "./axios";
import { saveFav, removeFav } from "./actions";

export default function AdsButton(props) {
    const dispatch = useDispatch();
    console.log("props!!!!!!!!", props);

    const [button, setButton] = useState();
    console.log("buttonfffff", button);

    useEffect(() => {
        console.log("check button status");
        (async () => {
            try {
                console.log("buttoniiii", button);
                console.log("props.id", props.fav_id);
                const { data } = await axios.get(`/ads/${props.fav_id}.json`);
                // console.log("data.data.buttonText", data.buttonText);
                console.log("data.data.buttonText", data);
                setButton(data.btnText);
            } catch (err) {
                console.log("err in submit btn", err);
            }
        })();
    }, []);

    async function submit() {
        // console.log("submit btn!!");
        // console.log("button submit", button);
        try {
            if (button == "save") {
                dispatch(saveFav(props.fav_id, button));
                setButton("remove");
            } else {
                dispatch(removeFav(props.fav_id, button));
                setButton("save");
            }
        } catch (err) {
            console.log("err in submit btn", err);
        }
    }

    // async function submit() {
    //     // console.log("submit btn!!");
    //     // console.log("button submit", button);
    //     try {
    //         if (button == "save") {
    //             console.log("button submit", button);
    //             const data = await axios.post(`/ads/${props.fav_id}.json`, {
    //                 button
    //             });
    //             console.log("data", data);
    //             setButton(data.data.btnText);
    //         }
    //     } catch (err) {
    //         console.log("err in submit btn", err);
    //     }
    // }

    return (
            <button
                className="adsbutton"
                // style={{ color: "#FF8C00" }}
                onClick={submit}
            >
                {button}
            </button>
    );
}

// highlightAd
