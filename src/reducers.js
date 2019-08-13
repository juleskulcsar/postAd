export default function(state = {}, action) {
    if (action.type == "RECEIVE_POSTS") {
        state = {
            ...state,
            posts: action.posts
        };
    }

    if (action.type == "NEW_POST") {
        return {
            ...state,
            posts: [...state.posts, action.post]
        };
    }
    if (action.type == "RECEIVE_ADS") {
        state = {
            ...state,
            ads: action.ads.reverse()
        };
    }

    if (action.type == "NEW_AD") {
        return {
            ...state,
            ads: [action.ad, ...state.ads]
        };
    }
    return state;
}
