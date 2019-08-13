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
    return state;
}
