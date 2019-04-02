import React, { Component } from 'react';
import { getAllPosts } from './apiPost';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
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
                const postPhotoUrl = post.photo ? `${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}` : false;
                const userPhotoUrl = post.postedBy ? `${process.env.REACT_APP_API_URL}/users/photo/${post.postedBy._id}?${new Date().getTime()}` : DefalutAvatar;
                const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
                const posterName = post.postedBy ? post.postedBy.name : 'Unkown';
                return (<div className="card col-md-8 offset-md-2 mb-4" key={index}>
                    <div className="card-body d-flex flex-column justify-content-between">
                        <ul className="list-group">
                            <Link to={posterId} className="list-group-item p-0" >
                                <img
                                    className="material-icons"
                                    src={userPhotoUrl}
                                    alt={posterName}
                                    style={{
                                        height:"50px",
                                        width:"50px",
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

                        <Link to={`/post/${post._id}`}><h5 className="card-title" style={{fontWeight:410}}>{post.title}</h5></Link>
                        <p className="font-italic mb-0">
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
                )
            })}
            
        </div>
    )

    render () {
        const { posts } = this.state;
        console.log(posts)
        return ( 
            <div className="container">
                <h2 className="mt-5 mb-5">Recent post</h2>
                {
                    !posts.length
                    ? <Loading /> 
                    : this.renderPosts(posts)
                 }   
            </div> 
        );
    }
}

export default Posts;

