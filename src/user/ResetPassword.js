import React, { Component } from "react";
import { resetPassword } from "../auth";

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            newPassword: "",
            message: "",
            error: ""
        }
    }

    resetPassword = e => {
        e.preventDefault();
        this.setState( {message: "", error: ""} );

        resetPassword({
            newPassword: this.state.newPassword,
            resetPasswordLink: this.props.match.params.resetPasswordToken
        })
        .then( data => {
            if(data.error) {
                console.log(data.error)
                this.setState( {error: data.error} );
            } else {
                console.log(data);
                this.setState( {message: data.message, newPassword: ""} );
            }
        });
    }

    render() {
        console.log(this.props.match.params.resetPasswordToken)
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Reset your Password</h2>

                {this.state.message && (
                    <em className="text-success small">{this.state.message}</em>
                )}
                {this.state.error && (
                    <em className="text-warning small">{this.state.error}</em>
                )}

                <form>
                    <div className="form-group mt-5">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Your new password"
                            value={this.state.newPassword}
                            name="newPassword"
                            onChange={e => {
                                this.setState({
                                    newPassword: e.target.value,
                                    error: "",
                                    message: ""
                                })
                            }}
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={this.resetPassword}
                        className="btn btn-raised btn-primary"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        );
    }
}

export default ResetPassword;