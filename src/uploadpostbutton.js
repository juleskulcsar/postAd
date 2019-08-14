import React from "react";

export default function({ onClick }) {
    return (
        <div className="upload-post-button">
            <button onClick={onClick}>+</button>
        </div>
    );
}
