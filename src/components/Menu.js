import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth';
// withRouter is a high order function. Tạo ra đối tượng history trong pr

// Change color if nav is active
export const isActive = (history, path) => {
    // console.log(history.location.pathname == path)
    if (history.location.pathname === path) return {"color": "#58bf74"}
    else return {"color": "#fff"}
}

const Menu = (props) => (
    <div className="header">
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link className="nav-link" to="/" style={isActive(props.history, "/")}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users" style={isActive(props.history, "/users")}>Users</Link>
            </li>
            {!isAuthenticated() ? (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin" style={isActive(props.history, "/signin")}>Sign in</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" style={isActive(props.history, "/signup")}>Sign up</Link>
                    </li>
                </>
                ) : (
                    <>  
                        <li className="nav-item">
                            <Link className="nav-link" to={`/user/findpeople`} style={isActive(props.history, `/user/findpeople`)}>Find</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/post/new`} style={isActive(props.history, "/post/new")}>New Post</Link>
                        </li>
                        <li className="nav-item">
                            <span
                                className="nav-link"
                                style={
                                    ({cursor: "pointer"})
                                }
                                onClick={() => signout( () => props.history.push('/'))}
                            >Sign out</span>
                        </li>
                        
                        <li className="nav-item ml-auto">
                            <Link className="nav-link" to={`/user/${isAuthenticated().user._id}`}
                                style={
                                    (isActive(props.history, `/user/${isAuthenticated().user._id}`))
                                }
                            >{`${isAuthenticated().user.name}'s profile`}
                            </Link>
                        </li>
                        
                    </> 
                )
            }
        </ul>
    </div>
)

export default withRouter(Menu);

// #58bf74