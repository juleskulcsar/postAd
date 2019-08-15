import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

export function PrivateChat(props) {
    const receiver_id = props.receiver_id;
    // console.log("receiver: ", receiver_id);
    let privateChatMessages = useSelector(
        state => state && state.privateMessages
    );
    // privateChatMessages = Array.from(privateChatMessages);
    // console.log("private messages are: ", privateChatMessages);
    const elemRef = useRef();
    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [privateChatMessages]);

    useEffect(() => {
        socket.emit("allPrivateMessages", receiver_id);
        // console.log("logging all messages");
    }, []);

    const keyPress = e => {
        // console.log("e,target.value private message: ", e.target.value);
        if (e.key === "Enter") {
            e.preventDefault();
            // socket.emit("privateChatMessage", e.target.value, {
            //     receiver_id: receiver_id
            // });
            socket.emit("privateMessages", e.target.value, receiver_id);

            // socket.emit("privateChatMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="test">
            <h1>private chat</h1>
            <div className="chat-container" ref={elemRef}>
                {privateChatMessages &&
                    privateChatMessages.map(message => (
                        <div className="chatBox" key={message.id}>
                            <img
                                className="msg-image"
                                src={message.url}
                                alt={message.first}
                            />
                            <p>{message.first} said</p>
                            <div>
                                <p className="message">{message.message}</p>
                                <p className="time">
                                    posted on {message.created_at}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
            <textarea
                className="chat_textarea"
                placeholder="add your message here"
                onKeyDown={keyPress}
            ></textarea>
        </div>
    );
}