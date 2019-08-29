export default function(state = {}, action) {
    if (action.type == "RECEIVE_POSTS") {
        state = {
            ...state,
            posts: action.posts.reverse()
        };
    }

    if (action.type == "RECEIVE_TIMELINE") {
        state = {
            ...state,
            posts: action.posts.reverse()
        };
    }

    if (action.type == "RECEIVE_ALLFAVS") {
        state = {
            ...state,
            favs: action.favs.reverse()
        };
    }

    if (action.type == "NEW_POST") {
        return {
            ...state,
            posts: [...state.posts, action.post]
        };
    }

    if (action.type == "NEW_FAV") {
        console.log("state,favs in reducers:", state.ads);
        state = {
            ...state,
            ads: state.ads.map(item => {
                if (action.id == item.ad_id) {
                    return { ...item, favorized: true };
                } else {
                    return item;
                }
            })
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

    if (action.type == "REMOVE_FAV") {
        console.log("state,favs in reducers:", state.ads);
        state = {
            ...state,
            ads: state.ads.map(item => {
                if (action.id == item.ad_id) {
                    return { ...item, favorized: false };
                } else {
                    return item;
                }
            })
        };
    }
    //----change color in ads----------------------
    // if(action.type == "TOGGLE_COLOR") {
    //     return toggleMenu(state);
    // }
    //----change color in ads----------------------

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
