import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { getUser } from './apiUser';
import DefalutAvatar from '../image/avatar.gif';
import DeleteUser from './DeleteUser';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';
import { getPostsByUser } from '../post/apiPost';
import Loading from '../components/Loading';

require('dotenv').config();

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            redirectToSignin: false,
            isFollowed: false,
            loading: false,
            error: "",
            posts: []
        }
    }

    // check follow
    checkFollow = user => {
        const jwt = isAuthenticated();
        return user.followers.find(follower => {
            return follower._id === jwt.user._id;
        });
        
    }

    clickFollowButton = (callApi) => {
        const userId = isAuthenticated().user._id;
        const token  = isAuthenticated().token;
        callApi(userId, token, this.state.user._id)
        .then(data => {
            if(data.error) {
                this.setState( {error: data.error} );
            } else {
                this.setState( {user: data, isFollowed: !this.state.isFollowed} );
            }
        });
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        getUser(userId, token)
        .then( data => {
            if(data.error) {
               this.setState({
                   redirectToSignin: true
               })
            }else {
                this.setState({
                    user: data,
                    isFollowed: this.checkFollow(data),
                });
                this.postByUser(data._id, token);
            }
        });
    }

    postByUser = (userId, token) => {
        getPostsByUser(userId, token)
        .then(data => {
            if(data.error) {
                this.setState( {loading: true} );
            } else {
                this.setState({ posts: data, loading: false})
            }
        })
    }

    componentDidMount() {
        this.setState( {loading: true} )
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }

    renderProfile = () =>  {
        const { user, posts, redirectToSignin } = this.state; 
        const photoUrl = user.photo ? `${process.env.REACT_APP_API_URL}/users/photo/${user._id}?${new Date().getTime()}` : DefalutAvatar

        return <>
            <div className="row">
                <div className="col-md-6">
                <img
                    src={photoUrl}
                    alt={user.name}
                    className="card-img-top"
                    style={{
                        objectFit: "cover",
                        width: "auto",
                        height: "200px"
                    }}
                    onError={image => image.target.src=DefalutAvatar}
                />
                </div>
                <div className="col-md-6">
                    <div className="lead">
                        <p><code className="d-inline-block" style={{width: "5em"}}>Hello</code> {user.name}</p>
                        <p><code className="d-inline-block" style={{width: "5em"}}>Email</code> {user.email}</p>
                        <p><code className="d-inline-block" style={{width: "5em"}}>Join</code> {new Date(user.created).toDateString()}</p>
                        <p><code className="d-inline-block" style={{width: "5em"}}>About</code> {user.about}</p>
                        <hr />
                    </div>
                    {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                        <div className="d-inline-block">
                            <Link
                            className="btn btn-raised btn-success mr-5"
                            to={`/user/edit/${user._id}`}
                            >Edit Profile</Link>
                            <DeleteUser />
                        </div>
                    ) : (
                        <FollowProfileButton 
                            isFollowed={this.state.isFollowed}
                            onClickButton={this.clickFollowButton}
                        />
                    )}
                    
                
                </div>
            </div>
            <ProfileTabs 
                followers={user.followers || []}
                following={user.following || []}
                posts={posts}
            />
        </>
    }

    render() {
        const { redirectToSignin } = this.state;
        if(redirectToSignin) return <Redirect to="/signin" />
        return (
           <div className="container">
                {this.state.loading && <Loading/>}
                <h2 className="mt-5 mb-5">Profile</h2>
                {
                    this.state.loading
                    ? <Loading /> 
                    : this.renderProfile()
                }   
            </div>
        )
    }
}

export default Profile;