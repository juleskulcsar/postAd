import React from "react";
import ProfilePic from "./profilepic";
import EditProfile from "./editprofile";
import Uploader from "./uploader";

export default function Profile(props) {
    return (
        <div id="profilePic">
            <h3 id="userProfile">{`${props.first}`}'s profile</h3>
            <p>{`${props.first} ${props.last}`}</p>
            <p>{`${props.email}`}</p>
            <p>Registered as a {`${props.registeras}`}</p>
            <EditProfile
                bio={props.bio}
                location={props.location}
                skills={props.skills}
                done={props.changeDescription}
            />
        </div>
    );
}
// <div id="prof">
//     <ProfilePic
//         size="jumbo"
//         url={props.url}
//         first={props.first}
//         last={props.last}
//         onClick={props.onClick}
//     />
// </div>
