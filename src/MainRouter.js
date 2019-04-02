import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import FindPeople from './user/FindPeople';
import NewPost from './post/NewPost';
import SinglePost from './post/SinglePost';
import EditPost from './post/EditPost';
import ForgotPassword from './user/ForgotPassword';
import ResetPassword from './user/ResetPassword';

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
        
            <PrivateRoute exact path="/user/findpeople" component={FindPeople}></PrivateRoute>
            <PrivateRoute exact path="/post/new/" component={NewPost}></PrivateRoute>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/users" component={Users}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/forgot-password" component={ForgotPassword}></Route>
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword}></Route>
            <Route exact path="/user/:userId" component={Profile}></Route>
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}></PrivateRoute>

            <Route exact path="/post/:postId" component={SinglePost}></Route>
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost}></PrivateRoute>    
           
            
            
        </Switch>
    </div>
)

export default MainRouter;