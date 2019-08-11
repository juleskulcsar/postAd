import React from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import axios from "./axios";
import Profile from "./profile";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import EditProfile from "./editprofile";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            showBio: false
        };
    }

    async componentDidMount() {
        const { data } = await axios.get("/profile");
        console.log("this is data: ", data);
        this.setState(data);
    }
    catch(err) {
        console.log("error in axios get /profile: ", err);
    }

    render() {
        return (
            <BrowserRouter className="App">
                <div>
                    <header>
                        <img
                            id="logo"
                            src="/logo.png"
                            alt="super"
                            height={50}
                        />
                        <ul>
                            <li>
                                <a href="/logout">logout</a>
                            </li>
                            <li>
                                <Link to="/">{this.state.first}'s profile</Link>
                            </li>
                        </ul>
                    </header>
                    <div>
                        <ProfilePic
                            url={this.state.url}
                            first={this.state.first}
                            last={this.state.last}
                            onClick={() =>
                                this.setState({ uploaderIsVisible: true })
                            }
                        />
                    </div>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return (
                                <Profile
                                    bio={this.state.bio}
                                    changeBio={bio =>
                                        this.setState({
                                            bio: bio
                                        })
                                    }
                                    skills={this.state.skills}
                                    changeSkills={skills =>
                                        this.setState({
                                            skills: skills
                                        })
                                    }
                                    location={this.state.location}
                                    changeLocation={location =>
                                        this.setState({
                                            location: location
                                        })
                                    }
                                    url={this.state.url}
                                    first={this.state.first}
                                    last={this.state.last}
                                    email={this.state.email}
                                    registeras={this.state.registeras}
                                    onClick={() =>
                                        this.setState({
                                            uploaderIsVisible: true,
                                            showBio: true,
                                            showSkills: true,
                                            showLocation: true
                                        })
                                    }
                                />
                            );
                        }}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            onClick
                            done={image => {
                                this.setState({
                                    url: image,
                                    uploaderIsVisible: false
                                });
                            }}
                            handleClick={() =>
                                this.setState({
                                    uploaderIsVisible: false
                                })
                            }
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
