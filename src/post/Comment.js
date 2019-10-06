import React, { Component } from 'react';
import { comment, uncomment } from './apiPost';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import DefalutAvatar from '../image/avatar.gif';
// import Loading from '../components/Loading';
const moment = require('moment');

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            redirectToSigin:false,
            error: ""
            // loading: false
        }
    }

    isValid = () => {
        if(!isAuthenticated()) {
            this.setState( {redirectToSigin: true} );
            return false;
        }
        return this.state.text.length > 0;
    }

    handleChange = (event) => {
        this.setState( {text: event.target.value} );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState( {text: ''} );

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token  = isAuthenticated().token;
            const postId = this.props.postId;

            comment(userId, token, postId, {text: this.state.text} )         // text: this.state.comment : text in Schema
            .then( data => {
                if(data.error) console.log(data.error);
                else {
                    // Dispatch fresh lists comments to parent (SinglePost)
                    this.props.updateComments(data.comments);
                }
            })
        }
    }

    deleteComment = (comment) => {
        return (event) => {
            let warningBeforeDelete = window.confirm("Are you sure to delete this comment?");
            if(warningBeforeDelete) {
                const userId = isAuthenticated().user._id;
                const token = isAuthenticated().token;
                const postId = this.props.postId;
                // this.setState( {loading: true} );

                uncomment(userId, token, postId, comment)
                .then(data => {
                    if(data.error) {
                        this.setState( {error: data.error} )
                    } else {
                        this.props.updateComments(data.comments);
                    }
                })
            }
        }
    }

    render() {
        const { text, redirectToSigin } = this.state;
        if(redirectToSigin) return <Redirect to="/signin" />
        return <>
            <form onSubmit={this.handleSubmit} className="form-group">
                <input type="text"
                    className="form-control"
                    placeholder="Write a comment..."
                    style={{
                        backgroundColor: "rgb(39, 39, 41)",
                        backgroundImage: "linear-gradient(0deg,#C2C5C6 2px,rgba(0,150,136,0) 0),linear-gradient(0deg,rgba(39, 39, 41) 1px,transparent 0)",
                        padding: "1rem",
                        borderRadius: "15%",
                        marginBottom: "1rem",
                    }}
                    onChange={this.handleChange}
                    value={text}
                />
            </form>
            
            <ul className="list-group p-0">
                {
                    this.props.comments.map( (comment, index) => {
                        return <div className="list-group-item p-0" key={index}>
                            {/*NEED TO CHANGE*/}{isAuthenticated() && isAuthenticated().user._id === comment.postedBy._id &&
                            <div className="dropdown text-right mr-0" style={{
                                position: "absolute",
                                right: 0
                            }}>
                                <button className="btn btn-secondary dropdown-toggle btn-sm"  data-toggle="dropdown">
                                    
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {/* <Link className="dropdown-item" to={`/post/edit/${comment._id}`}>Edit</Link> */}
                                    <button className="dropdown-item" onClick={this.deleteComment(comment)}>Delete</button>
                                </div>
                            </div>
                            }
                            <img
                                className="material-icons mr-3"
                                src={comment.postedBy.photo ? `${process.env.REACT_APP_API_URL}/users/photo/${comment.postedBy._id}?${new Date().getTime()}` : DefalutAvatar} alt={comment.postedBy.name}
                                style={{
                                    height:"50px",
                                    width:"50px",
                                    borderRadius: "50%",
                                    border: "3px solid #f7dbdb",
                                    objectFit: "cover"
                                }}
                            />
                            <div className="bmd-list-group-col pb-4">
                                    <p className="list-group-item-heading">
                                        <Link
                                            to={`/post/${comment._id}`}
                                            key={index}
                                            style={{marginRight: ".4rem"}}
                                        >
                                            {comment.postedBy.name}
                                        </Link>
                                        <span
                                            className="text-muted"
                                            style={{
                                                fontSize: "0.675rem"
                                            }}
                                        >
                                            { moment(new Date(comment.created), "MMMM Do YYYY, h:mm:ss a").fromNow() }
                                        </span>
                                    </p>
                                
                                <p className="list-group-item-text m-0">{comment.text}</p>
                            </div>
                        </div>
                    }
                )}
                
            </ul>
           
        </>
    }
}

export default Comment;