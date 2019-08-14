import React from "react";

export default function({ url, first, last, onClick, size }) {
    url = url || "/default.jpg";
    return (
        <div id="profileImageContainer">
            <img
                className="profileImage"
                src={url}
                alt={`${first} ${last}`}
                onClick={onClick}
                height={size == "jumbo" ? 150 : 80}
            />
        </div>
    );
}
