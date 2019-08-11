import React from "react";
import TileUploader from "./TileUploader";
import Tile from "./Tile";
import AllAds from "./AllTiles";
import { Route, BrowserRouter, Link } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
            return (
                <div>
                    <BrowserRouter>
                            <Route
                                exact
                                path="/"
                                render={() => {
                                    return (
                                        <Tile
                                            bio={this.state.bio}
                                            changeBio={bio =>
                                                this.setState({
                                                    bio: bio
                                                })
                                            }
                                            image={this.state.image}
                                            first={this.state.first}
                                            last={this.state.last}
                                            onClick={() =>
                                                this.setState({
                                                    uploaderIsVisible: true,
                                                    bioIsVisible: true
                                                })
                                            }
                                        />
                                    );
                                }}
                            />
                    </BrowserRouter>

                    {this.state.uploaderIsVisible && (
                        <AdsUploader
                            done={image =>
                                this.setState({
                                    image: image,
                                    uploaderIsVisible: false
                                })
                            }
                            close={() =>
                                this.setState({
                                    uploaderIsVisible: false
                                })
                            }
                        />
                    )}
                </div>
            );
        }
    }
