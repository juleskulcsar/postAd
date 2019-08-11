import React from "react";
import axios from "./axios";

export default class EditBio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            showCancel: false,
            showEdit: true,
            editBio: "Edit your bio!",
            addBio: "Add your bio!"
        };
    }

    changeBio(e) {
        this.setState({ draftBio: e.target.value });
    }
    submit() {
        axios
            .post("/bio", {
                bio: this.state.draftBio
            })
            .then(({ data }) => {
                this.setState({
                    editing: false,
                    showCancel: false,
                    showEdit: true,
                    addBio: "Add your bio!",
                    editBio: "Edit your bio!"
                });
                this.props.done(data);
            })
            .catch(err => {
                console.log("err in axios POST /bio: ", err);
            });
    }

    render() {
        const { editBio } = this.state;
        const { addBio } = this.state;
        return (
            <div className="textarea">
                {this.state.editing && (
                    <div className="textareaContainer">
                        <textarea
                            defaultValue={this.props.bio}
                            className="textarea"
                            cols="40"
                            rows="10"
                            name="draftBio"
                            onChange={e => {
                                this.changeBio(e);
                            }}
                        />
                        <div>
                            <button
                                className="bio"
                                onClick={() => this.submit()}
                            >
                                save
                            </button>
                        </div>
                    </div>
                )}

                {this.props.bio && (
                    <div>
                        <p>{this.props.bio}</p>
                        {this.state.showEdit ? (
                            <button
                                className="bio"
                                onClick={() =>
                                    this.setState({
                                        editing: true,
                                        showCancel: true,
                                        showEdit: true,
                                        editBio: "Editing your bio!"
                                    })
                                }
                            >
                                {editBio}
                            </button>
                        ) : null}

                        {this.state.showCancel ? (
                            <button
                                className="bio"
                                onClick={() =>
                                    this.setState({
                                        editing: false,
                                        showCancel: false,
                                        editBio: "Edit your bio!"
                                    })
                                }
                            >
                                Cancel
                            </button>
                        ) : null}
                    </div>
                )}

                {!this.props.bio && (
                    <div>
                        <button
                            className="bio"
                            onClick={() =>
                                this.setState({
                                    editing: true,
                                    showCancel: true,
                                    addBio: "Adding bio!"
                                })
                            }
                        >
                            {addBio}
                        </button>
                        {this.state.showCancel ? (
                            <button
                                className="bio"
                                onClick={() =>
                                    this.setState({
                                        editing: false,
                                        showCancel: false,
                                        addBio: "Add your bio!"
                                    })
                                }
                            >
                                Cancel
                            </button>
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
}

//     handleChange(e) {
//         //option 1
//         // this[e.target.name] = e.target.value;
//         //option 2
//         this.setState({
//             [e.target.name]: e.target.value
//         });
//     }
//
//     //changing description
//     // changeDescription(e) {
//     //     this.setState({
//     //         draftBio: e.target.value
//     //     });
//     // }
//     //
//     // changeLocation(e) {
//     //     this.setState({ location: e.target.value });
//     // }
//
//     //change skills
//     // changeSkills(e) {
//     //     this.setState({ skills: e.target.value });
//     // }
//
//     submit() {
//         axios
//             .post("/description", {
//                 bio: this.state.draftBio,
//                 location: this.state.location,
//                 skills: this.state.skills
//             })
//             .then(({ data }) => {
//                 if (data.success) {
//                     location.replace("/");
//                 } else {
//                     this.setState({
//                         error: true
//                     });
//                 }
//             })
//             .catch(err => {
//                 console.log("err in axios POST /description: ", err);
//             });
//     }
//     //
//     // submit() {
//     //     axios
//     //         .post("/description", {
//     //             bio: this.state.draftBio,
//     //             location: this.state.location,
//     //             skills: this.state.skills
//     //         })
//     //         .then(({ data }) => {
//     //             this.setState({
//     //                 editing: false,
//     //                 showCancel: false,
//     //                 showEdit: true,
//     //                 addBio: "Add your description!",
//     //                 editBio: "Edit your description!"
//     //             });
//     //             this.props.done(data);
//     //         })
//     //         .catch(err => {
//     //             console.log("err in axios POST /description: ", err);
//     //         });
//     // }
//
//     render() {
//         const { editBio } = this.state;
//         const { addBio } = this.state;
//         return (
//             <div className="editProfile">
//                 <div className="description_textarea">
//                     {this.state.editing && (
//                         <div className="textareaContainer">
//                             <textarea
//                                 defaultValue={this.props.bio}
//                                 className="textarea"
//                                 cols="40"
//                                 rows="10"
//                                 name="draftBio"
//                                 onChange={e => {
//                                     this.handleChange(e);
//                                 }}
//                             />
//                         </div>
//                     )}
//                 </div>
//                 <div>
//                     <input
//                         name="city"
//                         onChange={e => this.handleChange(e)}
//                         placeholder="city"
//                     />
//                     <br />
//                     <br />
//                     <input
//                         name="skills"
//                         onChange={e => this.handleChange(e)}
//                         placeholder="skills"
//                     />
//                 </div>
//                 <div>
//                     <button
//                         className="description"
//                         onClick={() => this.submit()}
//                     >
//                         update
//                     </button>
//                 </div>
//             </div>
//         );
//     }
// }
