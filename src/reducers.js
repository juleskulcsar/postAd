export default function(state = {}, action) {
    if (action.type == "RECEIVE_ADS") {
        state = {
            ...state,
            ads: action.ads
        };
    }

    if (action.type == "NEW_AD") {
    return {
        ...state,
        ads: [...state.ads, action.ad]
    };
}
    return state;
}
