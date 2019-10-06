import React, { Component } from 'react';
import { signup } from '../auth';
import { Link } from 'react-router-dom';
class SignUp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (name) {
        return (event) => {
            this.setState({
                [name]: event.target.value,
                error: ""
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        
        signup(user)
        .then( data => {
            // The data is response of fetch method
            if (data.error) this.setState( {error: data.error} )
            else this.setState({
                error: "",
                name: "",
                email: "",
                password: "",
                open: true
            })
        })
    }

    signupForm = (name, email, password) => (
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name" className="text-muted">Name</label>
                <input
                    name="name"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange("name")}
                    value={name}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email" className="text-muted">Email</label>
                <input
                    name="text"
                    type="email"
                    className="form-control"
                    onChange={this.handleChange("email")}
                    value={email}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="text-muted">Password</label>
                <input
                    name="password"
                    type="password"
                    className="form-control"
                    onChange={this.handleChange("password")}
                    value={password}
                />
            </div>
            <button className="btn btn-raised btn-primary">Sign up</button>
        </form>
    )
    
    render () {
        const { name, email, password, error, open } = this.state;
        return ( 
            <div className="container">
                <h2 className="mt-5 mb-5">Sign up</h2>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account successfully created. <Link to="/signin" >Sigin here</Link>
                </div>

                {this.signupForm(name, email, password)}
            </div> 
        );
    }
}
    
export default SignUp;