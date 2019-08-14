import React, { useState, useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
import axios from "./axios";

export default function AdsButton(props) {
    console.log("props!!!!!!!!", props);

    const [button, setButton] = useState();
    console.log("buttonfffff", button);

    useEffect(() => {
        console.log("check button status");
        (async () => {
            try {
                console.log("buttoniiii", button);
                console.log("props.id", props.id);
                const data = await axios.post(`/ads/${props.id}.json`);
                // console.log("data.data.buttonText", data.buttonText);
                console.log("data.data.buttonText", data);
                setButton(data.data.btnText);
            } catch (err) {
                console.log("err in submit btn", err);
            }
        })();
    }, []);

    async function submit() {
        console.log("submit btn!!");
        console.log("button submit", button);
        try {
            const data = await axios.post(`/ads/${props.fav_id}.json`);
            console.log("data", data);
            setButton(data.data.btnText);
        } catch (err) {
            console.log("err in submit btn", err);
        }
    }

    return (
        <div>
            <button className="adsbutton" onClick={submit}>
                {button}
            </button>
        </div>
    );
}
