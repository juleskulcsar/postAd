import React from "react";
import axios from "./axios";

export default class EditSkills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            showCancel: false,
            showEdit: true,
            editSkills: "edit skills",
            addSkills: "add skills"
        };
    }

    changeSkills(e) {
        this.setState({ draftSkills: e.target.value });
    }
    submit() {
        axios
            .post("/skills", {
                skills: this.state.draftSkills
            })
            .then(({ data }) => {
                this.setState({
                    editing: false,
                    showCancel: false,
                    showEdit: true,
                    addSkills: "add skills",
                    editSkills: "edit skills"
                });
                this.props.done(data);
            })
            .catch(err => {
                console.log("err in axios POST /skills: ", err);
            });
    }

    render() {
        const { editSkills } = this.state;
        const { addSkills } = this.state;
        return (
            <div className="textarea">
                {this.state.editing && (
                    <div className="textareaContainer">
                        <textarea
                            defaultValue={this.props.skills}
                            className="textarea"
                            cols="40"
                            rows="10"
                            name="draftSkills"
                            onChange={e => {
                                this.changeSkills(e);
                            }}
                        />
                        <div>
                            <button
                                className="skills"
                                onClick={() => this.submit()}
                            >
                                save
                            </button>
                        </div>
                    </div>
                )}

                {this.props.skills && (
                    <div>
                        <p>{this.props.skills}</p>
                        {this.state.showEdit ? (
                            <button
                                className="skills"
                                onClick={() =>
                                    this.setState({
                                        editing: true,
                                        showCancel: true,
                                        showEdit: true,
                                        editSkills: ""
                                    })
                                }
                            >
                                {editSkills}
                            </button>
                        ) : null}

                        {this.state.showCancel ? (
                            <button
                                className="skills"
                                onClick={() =>
                                    this.setState({
                                        editing: false,
                                        showCancel: false,
                                        editSkills: "edit skills"
                                    })
                                }
                            >
                                Cancel
                            </button>
                        ) : null}
                    </div>
                )}

                {!this.props.skills && (
                    <div>
                        <button
                            className="skills"
                            onClick={() =>
                                this.setState({
                                    editing: true,
                                    showCancel: true,
                                    addSkills: ""
                                })
                            }
                        >
                            {addSkills}
                        </button>
                        {this.state.showCancel ? (
                            <button
                                className="skills"
                                onClick={() =>
                                    this.setState({
                                        editing: false,
                                        showCancel: false,
                                        addSkills: "add skills"
                                    })
                                }
                            >
                                cancel
                            </button>
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
}
