import React from "react";
import axios from "./axios";
export default class EditLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            showCancel: false,
            showEdit: true,
            editLocation: "Edit your location!",
            addLocation: "Add your location!"
        };
    }

    changeLocation(e) {
        this.setState({ draftLocation: e.target.value });
    }

    submit() {
        axios
            .post("/location", {
                location: this.state.draftLocation
            })
            .then(({ data }) => {
                this.setState({
                    editing: false,
                    showCancel: false,
                    showEdit: true,
                    addLocation: "Add your location!",
                    editLocation: "Edit your location!"
                });
                this.props.done(data);
            })
            .catch(err => {
                console.log("err in axios POST /location: ", err);
            });
    }

    render() {
        const { editLocation } = this.state;
        const { addLocation } = this.state;
        return (
            <div className="textarea">
                {this.state.editing && (
                    <div className="textareaContainer">
                        <textarea
                            defaultValue={this.props.location}
                            className="textarea"
                            cols="40"
                            rows="10"
                            name="draftLocationo"
                            onChange={e => {
                                this.changeLocation(e);
                            }}
                        />
                        <div>
                            <button
                                className="location"
                                onClick={() => this.submit()}
                            >
                                save
                            </button>
                        </div>
                    </div>
                )}

                {this.props.location && (
                    <div>
                        <p>{this.props.location}</p>
                        {this.state.showEdit ? (
                            <button
                                className="location"
                                onClick={() =>
                                    this.setState({
                                        editing: true,
                                        showCancel: true,
                                        showEdit: true,
                                        editLocation: "Editing your location!"
                                    })
                                }
                            >
                                {editLocation}
                            </button>
                        ) : null}

                        {this.state.showCancel ? (
                            <button
                                className="location"
                                onClick={() =>
                                    this.setState({
                                        editing: false,
                                        showCancel: false,
                                        editLocation: "Edit your location!"
                                    })
                                }
                            >
                                Cancel
                            </button>
                        ) : null}
                    </div>
                )}

                {!this.props.location && (
                    <div>
                        <button
                            className="location"
                            onClick={() =>
                                this.setState({
                                    editing: true,
                                    showCancel: true,
                                    addLocation: "Adding location!"
                                })
                            }
                        >
                            {addLocation}
                        </button>
                        {this.state.showCancel ? (
                            <button
                                className="location"
                                onClick={() =>
                                    this.setState({
                                        editing: false,
                                        showCancel: false,
                                        addLocation: "Add your location!"
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
