import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { getUser, editUser, onUpdateInfoUser } from './apiUser';
import Loading from '../components/Loading';
import { Redirect } from 'react-router-dom';
import DefalutAvatar from '../image/avatar.gif';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            name: "",
            password: "",
            about: "",
            redirectToProfile: false,
            loading: false,
            error: "",
            fileSize: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    isValid() {
        const { password, name, email, fileSize } = this.state;
        if (name.length === 0) {
            this.setState( {error: "Name is required"} );
            return false;
        }
        if (fileSize > 1000000) {
            this.setState( {error: "The file size must less than 100kb"} );
            return false;
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState( {error: "Invalid email"} );
            return false
        }
        if (password.length >= 1 && password.length < 6) {
            this.setState({error: "Password must contain at least 6 characters", loading: false});
            return false;
        }
        if(!/\d+/.test(password) && password.length >= 6) {
            this.setState({error: "Password must contain at least 1 numeric", loading: false});
            return false;
        }
        return true
    }

    handleChange (name) {
        return (event) => {
            const value = name === "photo" ? event.target.files[0] : event.target.value;
            const fileSize = name === "photo" ? event.target.files[0].size : 0;
            this.userData.set(name, value);
            this.setState({
                [name]: value,
                fileSize,
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

        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
            editUser(userId, token, this.userData)
            .then( data => {
                console.log(data)
                if(data.error) this.setState({error: data.error, loading: false})
                else {
                    onUpdateInfoUser(data, () => {
                        this.setState({
                            loading: true,
                            redirectToProfile: true
                        });
                    })
                }
            });
        } else {
            this.setState ({ loading: false})
        }

    }



    editForm = (name, email, about, password) => (
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="photo" className="text-muted">Profile Photo</label>
                <input
                    accpet="image/*"
                    name="photo"
                    type="file"
                    className="form-control"
                    onChange={this.handleChange("photo")}
                />
            </div>
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
                    name="email"
                    type="email"
                    className="form-control"
                    onChange={this.handleChange("email")}
                    value={email}
                />
            </div>
            <div className="form-group">
                <label htmlFor="about" className="text-muted">About</label>
                <textarea
                    className="form-control"
                    onChange={this.handleChange("about")}
                    value={about}
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
            <button className="btn btn-raised btn-primary">Save</button>
        </form>
    )

    init = (userId) => {
        const token = isAuthenticated().token;
        getUser(userId, token)
        .then( data => {
            if(data.error) {
               this.setState({
                   redirectToProfile: true
               })
            }else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    about: data.about
                });
            }
        });
    }

    componentDidMount() {
        this.userData = new FormData();
        // console.log(this.props.match.params.userId)
        const userId = this.props.match.params.userId;
        // Init edit user
        this.init(userId);
    }

    render() {
        const { id, email, name, about, password, loading, error } = this.state;
        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/users/photo/${id}?${new Date().getTime()}` : DefalutAvatar;
        if (this.state.redirectToProfile) return <Redirect to={`/user/${isAuthenticated().user._id}`} />


        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit profile</h2>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading && <Loading />}
                <img
                    src={photoUrl}
                    alt={name}
                    className="card-img-top"
                    style={{
                        objectFit: "cover",
                        width: "auto",
                        height: "200px"
                    }}
                    onError={image => image.target.src=DefalutAvatar}
                />
                {this.editForm(name, email, about, password)}
            </div>
        );
    }
}

export default EditProfile;