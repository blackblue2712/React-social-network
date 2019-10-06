
export const getUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then( res => {
       return res.json()
    })
    .catch(err => console.log("ERROR - getUser - apiUser",err))
}

export const getAllUsers = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET",
    })
    .then( res => {
       return res.json()
    })
    .catch(err => console.log("ERROR - getAllUsers - apiUser",err))
}

export const deleteUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then( res => {
       return res.json()
    })
    .catch(err => console.log("ERROR - deleteUser - apiUser",err))
}

export const editUser = (userId, token, user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: user
    })
    .then( res => {
       return res.json()
    })
    .catch(err => console.log("ERROR - editUser - apiUser",err))
}

export const onUpdateInfoUser = (user, next) => {
    if (typeof window !== undefined) {
        let auth = JSON.parse(localStorage.getItem("jwt"));
        auth.user = user;
        localStorage.setItem("jwt", JSON.stringify(auth));
    }
    next();
}

export const follow = (userId, token, followId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/follow`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, followId})
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log("ERROR - follow - apiUser", err));
}

export const unfollow = (userId, token, followId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/unfollow`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, followId})
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log("ERROR - follow - apiUser", err));
}

export const findPeople = async (userId, token) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/users/findpeople/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log("ERROR - findPeople - apiUser", err));
}