import React, { Component } from "react";
import { GoogleLogin } from 'react-google-login'
import { Redirect } from "react-router-dom";
import { socialLogin, authenticate } from "../auth";

class SocialLogin extends Component {
    constructor () {
        super();
        this.state = {
            redirectToReferrer: false
        }
    }

    responseGoogle = response => {
        console.log(response);
        const { googleId, name, email, imageUrl } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
        console.log("user obj to social login: ", user);
        socialLogin(user).then(data => {
            console.log("signin data: ", data);
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                console.log("signin success - setting jwt: ", data);
                authenticate(data, () => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };

    render() {
        if (this.state.redirectToReferrer) return <Redirect to="/" /> 
        return (
            <div className="mb-3">
                <GoogleLogin
                    clientId="727454726207-n9ullthe725mk9hhak2fmobvo1v5b3un.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'http://localhost:3000'}
                />
            </div>
        );
    }
}

export default SocialLogin;