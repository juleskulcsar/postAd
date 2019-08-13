import React from "react";

export default function({ onClick }) {
    return (
        <div id="picture">
            <button onClick={onClick}>upload stuff</button>
        </div>
    );
}
