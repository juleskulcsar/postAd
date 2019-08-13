export default function(state = {}, action) {
    if (action.type == "RECEIVE_ADS") {
        state = {
            ...state,
            ads: action.ads.reverse()
        };
    }

    if (action.type == "NEW_AD") {
    return {
        ...state,
        ads: [ action.ad, ...state.ads]
    };
}
    return state;
}
