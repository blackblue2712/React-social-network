import React, { Component } from 'react';
import { getAllUsers } from './apiUser';
import { Link } from 'react-router-dom';
import DefalutAvatar from '../image/avatar.gif';
class Users extends Component {
    constructor () {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount () {
        getAllUsers()
        .then( data => {
            if(data.error) console.log(data.error);
            else this.setState({
                users: data
            });
        });
    }

    renderUsers = users => (
        <div className="row">
        
            {users.map( (user, index) => {
                const photoUrl = user.photo ? `${process.env.REACT_APP_API_URL}/users/photo/${user._id}?${new Date().getTime()}` : DefalutAvatar
                return <div className="card col-md-3 offset-md-1 mb-4" key={index}>
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
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link className="btn btn-raised btn-primary btn-sm" to={`/user/${user._id}`} >View profile</Link>
                    </div>
                </div>
            })}
            
        </div>
    )

    render () {
        const { users } = this.state;
        console.log(users)
        return ( 
            <div className="container">
                <h2 className="mt-5 mb-5">Usres</h2>
                {this.renderUsers(users)}
            </div> 
        );
    }
}

export default Users;

