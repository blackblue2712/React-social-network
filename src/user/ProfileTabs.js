
import React, { Component } from 'react';
import { Link } from  'react-router-dom';
import DefalutAvatar from '../image/avatar.gif';

class ProfileTabs extends Component {
    render() {
        const { following, followers, posts } = this.props;
        // console.log(followers.photo, followers)
        return <div className="row mt-5">
            <div className="col-lg-4 col-md-6">
                <h4 className="">Following</h4>
                <ul className="list-group">
                    {
                        following.map( (person, index) => (
                            <Link to={`/user/${person._id}`} className="list-group-item pl-0" key={index}>
                                <img 
                                    className="material-icons"
                                    src={person.photo ? `${process.env.REACT_APP_API_URL}/users/photo/${person._id}?${new Date().getTime()}` : DefalutAvatar}
                                    alt={person.name}
                                    style={{
                                        height:"50px",
                                        width:"50px",
                                        borderRadius: "50%",
                                        border: "3px solid #f7dbdb",
                                        objectFit: "cover"
                                    }}
                                />
                                <div className="bmd-list-group-col">
                                    <p className="list-group-item-heading">{person.name}</p>
                                    <p className="list-group-item-text">{person.about}</p>
                                </div>
                            </Link>
                        )
                    )}
                </ul>
            </div>

            <div className="col-lg-4 col-md-6">
                <h4 className="">Followers</h4>
                <ul className="list-group">
                    {
                        followers.map( (person, index) => (
                            <Link to={`/user/${person._id}`} className="list-group-item pl-0" key={index}>
                                <img
                                    className="material-icons"
                                    src={person.photo ? `${process.env.REACT_APP_API_URL}/users/photo/${person._id}?${new Date().getTime()}` : DefalutAvatar} alt={person.name}
                                    style={{
                                        height:"50px",
                                        width:"50px",
                                        borderRadius: "50%",
                                        border: "3px solid #f7dbdb",
                                        objectFit: "cover"
                                    }}
                                />
                                <div className="bmd-list-group-col">
                                    <p className="list-group-item-heading">{person.name}</p>
                                    <p className="list-group-item-text">{person.about}</p>
                                </div>
                            </Link>
                        )
                    )}
                </ul>
            </div>
            <div className="col-lg-4 col-md-6">
                <h4 className="">Post</h4>          
                <ul className="list-group">
                    {
                        posts.map( (post, index) => (
                            <Link to={`/post/${post._id}`} className="list-group-item pl-0" key={index}>
                                <img
                                    className="material-icons"
                                    src={post.photo ? `${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}` : DefalutAvatar} alt={post.name}
                                    style={{
                                        height:"50px",
                                        width:"50px",
                                        borderRadius: "50%",
                                        border: "3px solid #f7dbdb",
                                        objectFit: "cover"
                                    }}
                                />
                                <div className="bmd-list-group-col">
                                    <p className="list-group-item-heading">{post.title}</p>
                                </div>
                            </Link>
                        )
                    )}
                </ul>
            </div>
        </div>
    }
}

export default ProfileTabs;