import React from "react";
import axios from "./axios";
import Portfolio from "./portfolio";
import { PrivateChat } from "./privateChat";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        console.log("component mounted");
        try {
            const id = this.props.match.params.id;
            console.log("this.props: ", this.props);
            const { data } = await axios.get(`/profile/${id}.json`);
            if (data.sameUser) {
                this.props.history.push("/");
            }
            this.setState(data);
            console.log("state.accepted: ", data);
        } catch (err) {
            console.log("error in axios otherprofile:", err);
        }
    }

    render() {
        return (
            <div id="other-profile">
                <div className="other-profile-info-sidebar">
                    <img
                        className="other-profile-image"
                        src={this.state.url || "/default.png"}
                        alt={`${this.state.first} ${this.state.last}`}
                    />
                    <p className="other-profile-name">
                        {this.state.first} {this.state.last}
                    </p>
                    <p className="other-profile-registered-as">- registered as a {this.state.registeras}.</p>
                    <div className="other-profile-bio">
                        {this.state.bio ? this.state.bio : "No bio yet"}
                    </div>
                    <PrivateChat
                        className="contact-me"
                        receiver_id={this.props.match.params.id}
                    />
                </div>
                <Portfolio otherProfileId={this.props.match.params.id} />
            </div>
        );
    }
}
