import React from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import axios from "./axios";
import Profile from "./profile";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import EditProfile from "./editprofile";
import PostUploader from "./addpost";
import PostUploadButton from "./uploadpostbutton";
import Portfolio from "./portfolio";
import TileUploader from "./TileUploader";
import Tile from "./Tile";
import AllAds from "./AllAds";
import OtherProfile from "./otherprofile";
import ProjectModal from "./projectmodal";
import { PrivateChat } from "./privateChat";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            postUploaderIsVisible: false,
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
                    <header className="header">
                        <a href="/">
                            <img
                                id="logo"
                                src="/PostAd_logotype_white.png"
                                alt="logo"
                                height={50}
                            />
                        </a>
                        <nav className="navigation">
                            <Link to="/">{this.state.first}'s profile</Link>
                            <div>
                                <PostUploadButton
                                    onClick={() =>
                                        this.setState({
                                            postUploaderIsVisible: true
                                        })
                                    }
                                />
                            </div>
                            <Link to="/allads">ads</Link>
                            <a href="/logout">logout</a>
                            <ProfilePic
                                url={this.state.url}
                                first={this.state.first}
                                last={this.state.last}
                                onClick={() =>
                                    this.setState({ uploaderIsVisible: true })
                                }
                            />
                        </nav>
                    </header>
                    <Route
                        path="/user/:id"
                        render={props => (
                            <OtherProfile {...props} key={props.match.url} />
                        )}
                    />
                    <Route
                        exact
                        path="/profile"
                        render={() => {
                            return (
                                <div>
                                    <PostUploadButton
                                        onClick={() =>
                                            this.setState({
                                                postUploaderIsVisible: true
                                            })
                                        }
                                    />
                                </div>
                            );
                        }}
                    />
                    <Route exact path="/allads" component={AllAds} />
                    <Route
                        exact
                        path="/privatechat"
                        render={props => {
                            <PrivateChat
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                                receiver_id={props.match.params.id}
                            />;
                        }}
                    />
                    <Route
                        exact
                        path="/project/:post_id"
                        component={ProjectModal}
                    />
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
                                    id={this.state.id}
                                    url={this.state.url}
                                    first={this.state.first}
                                    last={this.state.last}
                                    email={this.state.email}
                                    registeras={this.state.registeras}
                                    onClick={() =>
                                        this.setState({
                                            uploaderIsVisible: true,
                                            // postUploaderIsVisible: true,
                                            showBio: true,
                                            showSkills: true,
                                            showLocation: true
                                        })
                                    }
                                />
                            );
                        }}
                    />
                    <Route
                        exact
                        path="/post"
                        render={() => {
                            return (
                                <PostUploadButton
                                    onClick={() =>
                                        this.setState({
                                            postUploaderIsVisible: true
                                        })
                                    }
                                />
                            );
                        }}
                    />
                    <Route path="/allposts.json" component={Portfolio} />
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
                    {this.state.postUploaderIsVisible && (
                        <PostUploader
                            onClick
                            done={image => {
                                this.setState({
                                    post_url: image,
                                    postUploaderIsVisible: false
                                });
                            }}
                            handleClick={() =>
                                this.setState({
                                    postUploaderIsVisible: false
                                })
                            }
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
