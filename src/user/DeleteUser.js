import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { deleteUser } from './apiUser';
import { isAuthenticated, signout } from '../auth';
 
class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    answerDelete = () => {
        const sureDelete = window.confirm("Are you sure to delete this account?");
        if (sureDelete) {
            this.deleteAccount();
        }
        return false
    }

    deleteAccount = () => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        deleteUser(userId, token)
        .then( (data) => {
            if (data.error) console.log(data.error);
            else {
                // signout
                signout( () => console.log("user deleted"));
                this.setState({
                    redirect: true
                })
            }
        });
    }

    render() {
        if(this.state.redirect) return <Redirect to="/" />
        return (
            <button
                className="btn btn-raised btn-danger"
                onClick={this.answerDelete}
            >
                Delete Profile
            </button>
        )
    }
}

export default DeleteUser;