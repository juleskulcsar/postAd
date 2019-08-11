import React from "react";

export default function({ url, first, last, onClick, size }) {
    url = url || "/default.png";
    return (
        <div id="picture">
            <img
                src={url}
                alt={`${first} ${last}`}
                onClick={onClick}
                height={size == "jumbo" ? 200 : 80}
            />
        </div>
    );
}
