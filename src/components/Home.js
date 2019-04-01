import React from 'react';
import Posts from '../post/Posts';

const Home = () => (
    <div className="container-fluid">
        {/* <div className="row">
            <div className="jumbotron w-100">
                <h2>Home</h2>
                <p className="lead">Welcome to React Fronted</p>
            </div>
        </div> */}
        <div className="row">
            <Posts />
        </div>
    </div>
    
)

export default Home;