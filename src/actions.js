import axios from "./axios";

export async function receiveAllAds() {
    const { data } = await axios.get("/allads.json");
    return {
        type: "RECEIVE_ADS",
        ads: data
    };
}

export async function newAdd(title, description) {
    console.log("IN ACTION title desc:", title, description);
    const { data } = await axios.post("/ads", {title, description});
    console.log("DATA in ACTION:", data);
    return {
        type: "NEW_AD",
        ad: data
    };
}
