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
