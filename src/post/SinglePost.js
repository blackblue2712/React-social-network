import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { getSinglePost, deletePost } from './apiPost';
import DefalutAvatar from '../image/avatar.gif';
import { isAuthenticated } from '../auth';
class SinglePost extends Component {
    state = {
        post: "",
        error: "",
        redirectToProfile: false,
        loading: false
    };

    deletePost = () => {
        let warningBeforeDelete = window.confirm("Are you sure to delete this post?");
        if(warningBeforeDelete) {
            const postId = this.props.match.params.postId
            const token = isAuthenticated().token;

            this.setState( {loading: true} );

            deletePost(postId, token)
            .then(data => {
                if(data.error) {
                    this.setState( {error: data.error, loading: false} )
                } else {
                    this.setState( {redirectToProfile: true} )
                }
            })
        }
    }

    componentDidMount() {
       getSinglePost(this.props.match.params.postId)
       .then(data => {
           if(data.error) console.log(data.error)
           else this.setState({ post: data})
       });
    }

    renderPost = post => {
        const postPhotoUrl = post.photo ? `${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}` : false;
        const userPhotoUrl = post.postedBy ? `${process.env.REACT_APP_API_URL}/users/photo/${post.postedBy._id}?${new Date().getTime()}` : DefalutAvatar;
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
        const posterName = post.postedBy ? post.postedBy.name : 'Unkown';

        return <div className="row">
            <div className="card col-md-8 offset-md-2 mb-4">
                {/*NEED TO CHANGE*/}{post.postedBy &&isAuthenticated() && isAuthenticated().user._id === post.postedBy._id &&
                    <div className="dropdown text-right">
                        <button style={{position: "absolute", right: 0}} className="btn btn-secondary dropdown-toggle btn-sm"  data-toggle="dropdown">
                            
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link className="dropdown-item" to={`/post/edit/${post._id}`}>Edit</Link>
                            <button className="dropdown-item" onClick={this.deletePost}>Delete</button>
                        </div>
                    </div>
                }

                <div className="card-body d-flex flex-column justify-content-between">
                    <ul className="list-group">
                        <Link to={posterId} className="list-group-item p-0" >
                            <img
                                className="material-icons"
                                src={userPhotoUrl}
                                alt={posterName}
                                style={{
                                    height:"58px",
                                    width:"58px",
                                    borderRadius: "50%",
                                    border: "3px solid #f7dbdb",
                                    objectFit: "cover",
                                    marginRight: "1rem"
                                }}
                            />
                            <div className="bmd-list-group-col">
                                <p className="list-group-item-heading">{posterName}</p>
                                <p className="list-group-item-text">{new Date(post.created).toDateString()}</p>
                            </div>
                        </Link>
                    </ul>

                    <p className="font-italic">
                        {post.body}
                    </p>
                </div>
                {postPhotoUrl && <img
                    src={postPhotoUrl}
                    alt={post.name}
                    className="card-img-bottom"
                    style={{
                        objectFit: "cover",
                        width: "auto",
                        maxHeight: "500px"
                    }}
                    onError={image => image.target.src=DefalutAvatar}
                />}
            </div>
        </div>
    }

    render() {
        if(this.state.redirectToProfile) return <Redirect to={`/user/${isAuthenticated().user._id}`} />
        return <div className="container mt-5">
            <h5 className="card-title" style={{fontWeight:410}}>{this.state.post.title}</h5>
            {
                !this.state.post || this.state.loading
                ? <Loading /> 
                : this.renderPost(this.state.post)
            }
            
        </div>
    }
}

export default SinglePost;
