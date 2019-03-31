import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { signin } from '../auth';
class SignIn extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToRefer: false,
            loading: false
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
    
    authenticate (jwt, next) {
        console.log(jwt)
        if (typeof window !== undefined) {
            localStorage.setItem("jwt", JSON.stringify(jwt));
            next();
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState( {loading: true} );
        const { email, password } = this.state;
        const user = {
            email,
            password
        };
        
        signin(user)
        .then( data => {
            console.log(data)
            // The data is response of fetch method
            if (data.error) this.setState( {error: data.error, loading: false} )
            else {
                // Authenticate
                this.authenticate (data, () => {
                    this.setState({
                        loading: true,
                        redirectToRefer: true
                    });
                });
            }
        })
    }



    signinForm = (email, password) => (
        <form onSubmit={this.handleSubmit}>
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
        const { email, password, error, redirectToRefer, loading } = this.state;

        // Redirect when loggin success
        if (redirectToRefer) {
            return <Redirect to="/" />
        }

        return ( 
            <div className="container">
                <h2 className="mt-5 mb-5">Sign in</h2>
                {loading && <Loading />}

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {this.signinForm(email, password)}
            </div> 
        );
    }
}
    
export default SignIn;