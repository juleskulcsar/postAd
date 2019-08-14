import React from "react";
import ProfilePic from "./profilepic";
import EditBio from "./editprofile";
import EditSkills from "./editskills";
import EditLocation from "./editlocation";
import Uploader from "./uploader";
import PostUploadButton from "./uploadpostbutton";
import PostUploader from "./addpost";
import Portfolio from "./portfolio";
// console.log("this is portfolio: ", Portfolio);
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

            <Portfolio id={props.id} />
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

// <PostUploader
//     url={props.url}
//     title={props.title}
//     description={props.description}
//     done={props.handleChange}
// />
