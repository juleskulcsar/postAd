import axios from "./axios";

export async function receiveAllPosts() {
    const { data } = await axios.get("/allposts.json");
    return {
        type: "RECEIVE_POSTS",
        posts: data
    };
}

export async function receiveAllPostsTimeline() {
    const { data } = await axios.get("/timeline.json");
    return {
        type: "RECEIVE_TIMELINE",
        posts: data
    };
}

export async function receiveAllFavs(favorized) {
    console.log("IN ACTION favs:", favorized);
    const { data } = await axios.get("/allfavs.json", { favorized });
    console.log("this is data from receive favs action:", data);
    return {
        type: "RECEIVE_ALLFAVS",
        favs: data
    };
}

export async function newPost(post_url, title, description) {
    console.log("actions receive posts:", post_url, title, description);
    const { data } = await axios.post("/post", {
        post_url,
        title,
        description
    });
    console.log("DATA in ACTION:", data);
    return {
        type: "NEW_POST",
        post: data
    };
}

export async function saveFav(fav_id, button) {
    console.log("actions savefav:", fav_id, button);
    const { data } = await axios.post(`/ads/${fav_id}.json`, {
        button
    });
    console.log("DATA in ACTION:", data);
    return {
        type: "NEW_FAV",
        id: fav_id
    };
}

export async function receiveAllAds() {
    const { data } = await axios.get("/allads.json");
    return {
        type: "RECEIVE_ADS",
        ads: data
    };
}

export async function newAdd(title, description) {
    console.log("IN ACTION title desc:", title, description);
    const { data } = await axios.post("/ads", { title, description });
    console.log("DATA in ACTION:", data);
    return {
        type: "NEW_AD",
        ad: data
    };
}

export async function removeFav(fav_id, button) {
    console.log("actions removefav:", fav_id, button);
    const { data } = await axios.post(`/adsr/${fav_id}.json`, {
        button
    });
    console.log("DATA removeFav in ACTION:", data);
    return {
        type: "REMOVE_FAV",
        id: fav_id
    };
}

//private messages actions
export function privateChatMessages(msgs) {
    return {
        type: "PRIVATE_MESSAGES",
        msgs
    };
}

export function privateChatMessage(msg) {
    return {
        type: "NEW_PRIVATE_MESSAGE",
        msg
    };
}
