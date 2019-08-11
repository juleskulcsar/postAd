export default function(state = {}, action) {
    if (action.type == "RECEIVE_ADS") {
        state = {
            ...state,
            ads: action.ads
        };
    }
    return state;
}
