import React from "react";
import axios from "./axios";

export default class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // //upload new image
    // handleClick() {
    //     this.props.handleClick();
    // }
    //
    // upload(e) {
    //     e.preventDefault();
    //     this.file = e.target.files[0];
    //     let formData = new FormData();
    //     formData.append("file", this.file);
    //     axios
    //         .post("/upload", formData)
    //         .then(({ data }) => {
    //             this.props.done(data);
    //         })
    //         .catch(err => {
    //             console.log("error in axios.post /upload: ", err);
    //         });
    // }

    //changing description
    changeDescription(e) {
        this.setState({
            draftBio: e.target.value
        });
    }

    changeLocation(e) {
        this.setState({ location: e.target.value });
    }

    //change skills
    changeSkills(e) {
        this.setState({ skills: e.target.value });
    }

    submit() {
        axios
            .post("/description", {
                bio: this.state.draftBio,
                location: this.state.location,
                skills: this.state.skills
            })
            .then(({ data }) => {
                this.setState({
                    editing: false,
                    showCancel: false,
                    showEdit: true,
                    addBio: "Add your description!",
                    editBio: "Edit your description!"
                });
                this.props.done(data);
            })
            .catch(err => {
                console.log("err in axios POST /description: ", err);
            });
    }

    render() {
        const { editBio } = this.state;
        const { addBio } = this.state;
        return (
            <div className="editProfile">
                <div className="description_textarea">
                    {this.state.editing && (
                        <div className="textareaContainer">
                            <textarea
                                defaultValue={this.props.bio}
                                className="textarea"
                                cols="40"
                                rows="10"
                                name="draftBio"
                                onChange={e => {
                                    this.changeDescription(e);
                                }}
                            />
                        </div>
                    )}
                </div>
                <div>
                    <input
                        name="city"
                        onChange={e => this.changeLocation(e)}
                        placeholder="city"
                    />
                    <br />
                    <br />
                    <input
                        name="skills"
                        onChange={e => this.changeSkills(e)}
                        placeholder="skills"
                    />
                </div>
                <div>
                    <button
                        className="description"
                        onClick={() => this.submit()}
                    >
                        save
                    </button>
                </div>
            </div>
        );
    }
}
