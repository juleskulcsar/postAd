import React from "react";
import ProfilePic from "./profilepic";
import EditBio from "./editprofile";
import EditSkills from "./editskills";
import EditLocation from "./editlocation";
import Uploader from "./uploader";
// import TileUploader from "./TileUploader";

export default function Profile(props) {
    return (
        <div id="profile">
        <ProfilePic
                size="jumbo"
                url={props.url}
                first={props.first}
                last={props.last}
                onClick={props.onClick}
            />
            <h3 className="profile-name">{`${props.first}`}'s profile</h3>
            <p>{`${props.first} ${props.last}`}</p>
            <p>Registered as a {`${props.registeras}`}</p>
            <EditBio bio={props.bio} done={props.changeBio} />
            <EditSkills skills={props.skills} done={props.changeSkills} />
            <EditLocation
                location={props.location}
                done={props.changeLocation}
            />
        </div>
    );
}
