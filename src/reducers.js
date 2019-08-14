export default function(state = {}, action) {
    if (action.type == "RECEIVE_POSTS") {
        state = {
            ...state,
            posts: action.posts
        };
    }

    if (action.type == "RECEIVE_TIMELINE") {
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

    //private messages bonus
    if (action.type == "PRIVATE_MESSAGES") {
        state = {
            ...state,
            privateMessages: action.msgs
        };
    }
    if (action.type == "NEW_PRIVATE_MESSAGE") {
        state = {
            ...state,
            privateMessages: [...state.privateMessages, action.msg]
        };
    }
    return state;
}
