import React, { Component } from 'react';
import logo from '../logo.svg';
import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="Loading">
        <div className="Loading-header">
            <img src={logo} className="Loading-logo" alt="logo" />
            <p>
                <code>Loading ... wait a second</code>
            </p>
        </div>
      </div>
    );
  }
}

export default Loading;
