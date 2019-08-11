import React from "react";
import axios from "./axios";

export default class AdDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            showCancel: false,
            editAd: "edit your ad",
            addAd: "create ad"
        };
    }

    componentDidMount() {
        this.setState((state, props) => ({ draftAd : props.description }));
    }

    changeAd(e) {
        this.setState({
            draftAd: e.target.value
        });
    }

    submit() {
        axios
            .post("./ads", {
                description: this.state.draftAd
            })
            .then(({ data }) => {
                this.setState({
                    editing: false,
                    showCancel: false,
                    editAd: "edit your ad",
                    addAd: "create ad"
                });
                this.props.done(data);
            });
    }

    render() {
        const isEditing = this.state.editing;
        const { editAd } = this.state;
        const { addAd } = this.state;

        return (
            <div className="tile-editor">
                {isEditing && (
                    <div>
                        <textarea
                            defaultValue ={this.props.description}
                            placeholder="start typing..."
                            name="draftAd"
                            onChange={e => {
                                this.changeAd(e);
                            }}
                        />
                        <button onClick={() => this.submit()}>submit</button>
                    </div>
                )}

                {this.props.description && (
                    <div>
                        <p>{this.props.description}</p>
                        <button
                            onClick={() =>
                                this.setState({
                                    editing: true,
                                    showCancel: true,
                                    editAd: ""
                                })
                            }
                        >
                            {editAd}
                        </button>
                    </div>
                )}

                {!this.props.description && (
                    <div>
                        <p>{this.props.description}</p>
                        <button
                            onClick={() =>
                                this.setState({
                                    editing: true,
                                    showCancel: true,
                                    addAd: ""
                                })
                            }
                        >
                            {addAd}
                        </button>
                    </div>
                )}

                {this.state.showCancel ? (
                    <button
                        onClick={e =>
                            this.setState({
                                editing: false,
                                showCancel: false,
                                editAd: "edit your ad",
                                addAd: "create ad"
                            })
                        }
                    >
                        cancel
                    </button>
                ) : null}
            </div>
        );
    }
}
