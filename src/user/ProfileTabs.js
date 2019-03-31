
import React, { Component } from 'react';
import { Link } from  'react-router-dom';
import DefalutAvatar from '../image/avatar.gif';

class ProfileTabs extends Component {
    render() {
        const { following, followers } = this.props;
        // console.log(followers.photo, followers)
        return <div className="row mt-5">
            <div className="col-md-4">
                <h4 className="text-dark">Following</h4>
                <ul className="list-group">
                    {
                        following.map( (person, index) => (
                            <Link to={`/user/${person._id}`} className="list-group-item" key={index}>
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

            <div className="col-md-4">
                <h4 className="text-dark">Followers</h4>
                <ul className="list-group">
                    {
                        followers.map( (person, index) => (
                            <Link to={`/user/${person._id}`} className="list-group-item" key={index}>
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
        </div>
    }
}

export default ProfileTabs;