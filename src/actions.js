import axios from "./axios";

export async function receiveAllAds() {
    const { data } = await axios.get("/allads");
    return {
        type: "RECEIVE_ADS",
        ads: data
    };
}
