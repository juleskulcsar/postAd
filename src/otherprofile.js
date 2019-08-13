import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        try {
            const id = this.props.match.params.id;
            console.log("this.props: ", this.props);
            const { data } = await axios.get(`/user/${id}.json`);
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
            <div>
                <div>
                    <img
                        src={this.state.url || "/default.png"}
                        alt={`${this.state.first} ${this.state.last}`}
                    />
                    <p>
                        {this.state.first} {this.state.last}
                    </p>
                    <div className="bio">
                        {this.state.bio ? this.state.bio : "No bio yet"}
                    </div>
                </div>
            </div>
        );
    }
}
