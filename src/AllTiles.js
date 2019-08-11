import React from "react";
import TileUploader from "./TileUploader"

export default function AllTiles(props) {
    return (
        <div className="AllTilesContainer">
            <div className="allTiles">
            </div>
            <div>
                <TileUploader />
            </div>
        </div>
    );
}
