import * as io from "socket.io-client";

import { privateChatMessages, privateChatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("privateMessages", msgs =>
        store.dispatch(privateChatMessages(msgs))
    );
    socket.on("newPrivateMessage", msg => {
        console.log("anything");
        store.dispatch(privateChatMessage(msg));
    });
};

// const socket = io.connect();
