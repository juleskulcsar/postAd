import React from "react";
import AdDescription from "./AdDescription";

export default function Tile(props) {
    return (
        <div className="tile">
            <div>{`${props.title}`}</div>
            <AdDescription bio={props.bio} done={props.changeBio} />
        </div>
    );
}
