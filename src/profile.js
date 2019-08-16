import React from "react";
import ProfilePic from "./profilepic";
import EditBio from "./editprofile";
import EditSkills from "./editskills";
import EditLocation from "./editlocation";
import Uploader from "./uploader";
import PostUploadButton from "./uploadpostbutton";
import PostUploader from "./addpost";
// import PostUploader from "./addpost";
import Portfolio from "./portfolio";
import { PrivateChat } from "./privateChat";
// console.log("this is portfolio: ", Portfolio);
// import TileUploader from "./TileUploader";

export default function Profile(props) {
    return (
        <div id="profile">
            <div className="profile-info-sidebar">
                <div id="profilepic-sidebar">
                    <ProfilePic
                        size="jumbo"
                        url={props.url}
                        first={props.first}
                        last={props.last}
                        onClick={props.onClick}
                    />
                </div>
                <h3 className="profile-name">{`${props.first}`}'s profile</h3>
                <p className="profile-first-last">{`${props.first} ${props.last}`}</p>
                <p className="profile-registered-as">
                    - registered as a {`${props.registeras}`}
                </p>
                <EditBio bio={props.bio} done={props.changeBio} />
            </div>
            <Portfolio id={props.id} />
        </div>
    );
}
// <div>
//     <PrivateChat
//         className="contact-me"
//         receiver_id={props.receiver_id}
//     />
// </div>
// <EditSkills skills={props.skills} done={props.changeSkills} />
// <EditLocation
//     location={props.location}
//     done={props.changeLocation}
// />
// <EditSkills skills={props.skills} done={props.changeSkills} />
// <EditLocation
//     location={props.location}
//     done={props.changeLocation}
// />
