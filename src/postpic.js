import React from "react";

export default function PostPic({ post_url, onClick, size }) {
    post_url = post_url || "/default.jpg";
    return (
        <div>
            <img
                src={post_url}
                onClick={onClick}
                height={size == "jumbo" ? 100 : 100}
            />
        </div>
    );
}
