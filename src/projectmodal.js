import React from "react";
import axios from "./axios";

export default class ProjectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        console.log("component mounted in project modal");
        try {
            const id = this.props.match.params.post_id;
            // console.log("this.props: ", this.props);
            console.log("this.id in get project: ", id);
            const { data } = await axios.get(`/project/${id}.json`);
            // if (data.sameUser) {
            //     this.props.history.push("/");
            // }
            console.log("checking this.state: ", this.state);
            this.setState(data);
            console.log("state in project modal: ", data);
        } catch (err) {
            console.log("error in axios projectmodal:", err);
        }
    }

    render() {
        return (
            <div>
                <img src={this.state.post_url} />
                <p>{this.state.title}</p>
                <p>{this.state.description}</p>
                <p>
                    created by: {this.state.first} {this.state.last}
                </p>
            </div>
        );
    }
}
