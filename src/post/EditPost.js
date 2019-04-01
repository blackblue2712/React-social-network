import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { getSinglePost, editPost } from './apiPost';
import Loading from '../components/Loading';
import { Redirect } from 'react-router-dom';
import DefalutAvatar from '../image/avatar.gif';

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            body: "",
            redirectToProfile: false,
            loading: false,
            error: "",
            fileSize: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    isValid() {
        const { title, body, fileSize } = this.state;
        if (title.length === 0 || body.length === 0) {
            this.setState( {error: "All fields are required"} );
            return false;
        }
        if(title.length < 5) {
            this.setState( {error: "Title too short"} );
            return false;
        }
        if (fileSize > 3000000) {
            this.setState( {error: "The file size must less than 3Mb"} );
            return false;
        }
        return true
    }

    handleChange (name) {
        return (event) => {
            const value = name === "photo" ? event.target.files[0] : event.target.value;
            const fileSize = name === "photo" ? event.target.files[0].size : 0;
            this.postData.set(name, value);
            this.setState({
                [name]: value,
                fileSize,
                error: ""
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState( {loading: true} );

        if (this.isValid()) {
            const postId = this.props.match.params.postId;
            const token = isAuthenticated().token;
            editPost(postId, token, this.postData)
            .then( data => {
                console.log(data)
                if(data.error) this.setState({error: data.error, loading: false})
                else {
                    this.setState({
                        loading: true,
                        redirectToProfile: true
                    });
                }
            });
        } else {
            this.setState ({ loading: false})
        }

    }


    editForm = (title, body) => (
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="photo" className="text-muted">Post Photo</label>
                <input
                    accpet="image/*"
                    name="photo"
                    type="file"
                    className="form-control"
                    onChange={this.handleChange("photo")}
                />
            </div>
            <div className="form-group">
                <label htmlFor="title" className="text-muted">Title</label>
                <input
                    name="title"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange("title")}
                    value={title}
                />
            </div>
            <div className="form-group">
                <label htmlFor="body" className="text-muted">Body</label>
                <textarea
                    className="form-control"
                    onChange={this.handleChange("body")}
                    value={body}
                />
            </div>
            <button className="btn btn-raised btn-primary">Save</button>
        </form>
    )

    init = (postId) => {
        getSinglePost(postId)
        .then( data => {
            if(data.error) {
                console.log(data)
               this.setState({
                   redirectToProfile: true
               })
            }else {
                console.log(data)
                this.setState({
                    title: data.title,
                    body: data.body,
                    id: data._id,
                    photo: data.photo
                });
            }
        });
    }

    componentDidMount() {
        this.postData = new FormData();

        const postId = this.props.match.params.postId;
        // Init edit post
        this.init(postId);
    }

    render() {
        const { id, photo, title, body, loading, error } = this.state;
        const photoUrl = photo ? `${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}` : DefalutAvatar;
        if (this.state.redirectToProfile) return <Redirect to={`/user/${isAuthenticated().user._id}`} />


        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit post</h2>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading && <Loading />}
                <img
                    src={photoUrl}
                    alt={title}
                    className="card-img-top"
                    style={{
                        objectFit: "cover",
                        width: "auto",
                        height: "200px"
                    }}
                    onError={image => image.target.src=DefalutAvatar}
                />
                {this.editForm(title, body)}
            </div>
        );
    }
}

export default EditPost;