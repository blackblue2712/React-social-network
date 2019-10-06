import React, { Component } from 'react';
import { findPeople, follow } from './apiUser';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import DefalutAvatar from '../image/avatar.gif';
import '../css/user.css';
class FindPeople extends Component {
    constructor () {
        super();
        this.state = {
            users: [],
            error: '',
            open: false,
            messageFollow: '',
            openFollow: false,
        }
    }

    componentDidMount () {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        findPeople(userId, token)
        .then( data => {
            if(data.error) console.log(data.error);
            else {
                this.setState({
                    users: data
                });
            }
        });
    }

    clickFollow = (userToFollow, index) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        follow(userId, token, userToFollow._id)
        .then( (data) => {
            if(data.error) this.setState( {error: data.error} );
            else {
                let toFollow = this.state.users;
                // Xóa user vừa follow ra khỏi state bằng index truyền từ hàm render bên dưới
                toFollow.splice(index, 1);
                this.setState({
                    open: true,
                    messageFollow: `Following ${userToFollow.name}`,
                    users: toFollow
                });
            }
        });
    }

    renderUsers = users => (
        <div className="row"> 
            {users.map( (user, index) => {
                const photoUrl = user.photo ? `${process.env.REACT_APP_API_URL}/users/photo/${user._id}?${new Date().getTime()}` : DefalutAvatar
                return <div className="card col-md-3 offset-md-1 mb-4 mr-2 p-0" key={index}>
                    {<div className="d-flex align-items-end justify-content-around css-show-buttons">
                        <Link className="btn btn-raised btn-primary btn-sm" to={`/user/${user._id}`} >
                            View Profile
                        </Link>
                        <button 
                            className="btn btn-raised btn-success btn-sm"
                            onClick={() => this.clickFollow(user, index)}
                        >
                            Follow
                        </button>
                    </div>}
                    <img
                        src={photoUrl}
                        alt={user.name}
                        className="card-img-top css-have-button"
                        style={{
                            objectFit: "cover",
                            width: "auto",
                            height: "300px"
                        }}
                        onError={image => image.target.src=DefalutAvatar}
                        onMouseEnter={this.onShowButtonFollow}
                    />
                    
                    <div className="card-body">
                        <h5 className="card-title text-center text-dark">{user.name}</h5>
                    </div>
                </div>
            })}
            
        </div>
    )

    render () {
        const { users, open, messageFollow } = this.state;
        return ( 
            <div className="container">
                <h2 className="mt-5 mb-5">Recommend users</h2>
                {open && <div className="alert alert-success"><p>{messageFollow}</p></div> }
                {this.renderUsers(users)}
            </div> 
        );
    }
}

export default FindPeople;

