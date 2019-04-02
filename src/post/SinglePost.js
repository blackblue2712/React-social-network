import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { getSinglePost, deletePost, like, unlike } from './apiPost';
import DefalutAvatar from '../image/avatar.gif';
import { isAuthenticated } from '../auth';
import Comment from './Comment';



class SinglePost extends Component {
    state = {
        post: "",
        comments: [],
        like: false,
        likes: 0,
        error: "",
        redirectToProfile: false,
        redirectToSignin: false,
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

    checkLike = (data) => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        const match = data.likes.indexOf(userId) !== -1
        return match;
    }

    likeToggle = () => {
        if (!isAuthenticated()) {
            this.setState( {redirectToSignin: true} );
            return false;
        }

        this.setState( { like: !this.state.like } );

        const callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.state.post._id;

        callApi(userId, token, postId)
        .then( data => {
            if(data.error) console.log(data.error)
            else {
                this.setState({
                    likes: data.likes.length
                })
            }
        });
    }

    upDateComments = (comments) => {
        console.log(this);
        this.setState({
            comments: comments.reverse()
        })
    }

    componentDidMount() {
       getSinglePost(this.props.match.params.postId)
       .then(data => {
           console.log(data)
           if(data && data.error || data === null) console.log(data)
           else this.setState({
                post: data,
                comments: data.comments.reverse(),
                likes: data.likes.length,
                like: this.checkLike(data),
           })
       });
    }

    renderPost = post => {
        const postPhotoUrl = post.photo ? `${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}` : false;
        const userPhotoUrl = post.postedBy ? `${process.env.REACT_APP_API_URL}/users/photo/${post.postedBy._id}?${new Date().getTime()}` : DefalutAvatar;
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
        const posterName = post.postedBy ? post.postedBy.name : 'Unkown';
        const like = this.state.like;
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

                    <p className="font-italic mt-2 mb-1">
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
                <hr style={{background: "#6e7780", margin: ".5rem 0 !important"}}/>

                <div className="d-flex align-items-center">
                    <div
                        className="wrap-like-post d-flex align-items-center mb-2 p-0"
                        onClick={this.likeToggle}
                        style={{
                            color: !like ? "white" : "#d26c6c",
                            cursor: "pointer",
                            width: "6%",
                            marginTop: "-4px"
                        }}
                    >
                        <i className="material-icons" style={{fontSize: "1.175rem"}}>
                            {!like ? "favorite_border" : "favorite"}
                        </i>
                        <span className="pl-1 text-muted" style={{fontSize: "1.075rem"}}>{this.state.likes}</span>
                    </div>
                    <div
                        className="wrap-comment-post d-flex align-items-center mb-2 p-0"
                        style={{
                            // cursor: "pointer",
                            color: '#a2a2a2',
                            width: "6%",
                            marginTop: "-4px"
                        }}
                    >
                        <i className="material-icons ml-4" style={{fontSize: "1.175rem"}} >mode_comment</i>
                        <span className="pl-1 text-muted" style={{fontSize: "1.075rem"}}>{this.state.comments.length}</span>
                    </div>
                </div>

                <hr style={{background: "#6e7780", margin: "0 0 .5rem 0"}}/>  
                <Comment postId={post._id} comments={this.state.comments} updateComments={this.upDateComments} />
               
                <div className="pb-4"></div>
            </div>
        </div>
    }

    render() {
        console.log("single render")
        const { redirectToProfile, redirectToSignin } = this.state;
        if(redirectToProfile) return <Redirect to={`/user/${isAuthenticated().user._id}`} />
        if(redirectToSignin) return <Redirect to={`/signin`} />

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
