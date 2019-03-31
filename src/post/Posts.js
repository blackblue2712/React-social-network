import React, { Component } from 'react';
import { getAllPosts } from './apiPost';
import { Link } from 'react-router-dom';
import DefalutAvatar from '../image/avatar.gif';
class Posts extends Component {
    constructor () {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount () {
        getAllPosts()
        .then( data => {
            console.log(data)
            if(data.error) console.log(data.error);
            else this.setState({
                posts: data
            });
        });
    }

    renderPosts = posts => (
        <div className="row">
            {posts.map( (post, index) => {
                const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
                const posterName = post.postedBy ? post.postedBy.name : 'Unkown';
                return (<div className="card col-md-4 mb-4" key={index}>
                    <div className="card-body d-flex flex-column justify-content-between">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.body}</p>
                        <p className="font-italic mark">
                            Posted by: {" "}
                            <Link to={posterId}>{posterName}</Link>
                            {" "} on {new Date(post.created).toDateString()}
                        </p>
                    </div>
                </div>)
            })}
            
        </div>
    )

    render () {
        const { posts } = this.state;
        console.log(posts)
        return ( 
            <div className="container">
                <h2 className="mt-5 mb-5">Recent post</h2>
                {this.renderPosts(posts)}
            </div> 
        );
    }
}

export default Posts;

