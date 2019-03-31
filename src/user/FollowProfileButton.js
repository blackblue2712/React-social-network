import React, { Component } from 'react';
import { follow, unfollow } from './apiUser';
class FollowProfileButton extends Component {
    followClick = () => {
        this.props.onClickButton(follow);
    }
    unfollowClick = () => {
        this.props.onClickButton(unfollow);
    }
    
    render() {
        return (
            <div className="d-inline-block">
                {
                    !this.props.isFollowed ? (
                        <button onClick={this.followClick} className="btn btn-raised btn-sm btn-success mr-5 ">Follow</button>
                    ) : (
                        <button onClick={this.unfollowClick} className="btn btn-raised btn-sm btn-dark">UnFollow</button>
                    )
                }
            </div>
        );
    }
}

export default FollowProfileButton;