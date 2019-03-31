require('dotenv').config();

export const isAuthenticated = () => {
    if (typeof window == undefined) return false;
    
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    }else {
        return false;
    }
}

export const signout = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem("jwt");
    }
    next();
    fetch (`${process.env.REACT_APP_API_URL}/signout`, {
        method: "GET"
    })
    .then( res => {
        console.log(res);
        return res.json();
    })
    .catch(err => console.log(err));
}

export const signin = user => {
    console.log(process.env.REACT_APP_API_URL)
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then( res => {
        return res.json();
    })
    .catch( err => err);
}

export const signup = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then( res => {
        return res.json();
    })
    .catch( err => err);
}