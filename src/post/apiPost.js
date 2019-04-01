

export const createPost = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(res => res.json())
    .catch(err => console.log("ERROR - createPost - apiPost", err));
}

export const getAllPosts = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "GET",
    })
    .then( res => {
       return res.json()
    })
    .catch(err => console.log("ERROR - getAllPost - apiPost",err))
}


export const getSinglePost = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "GET",
    })
    .then( res => {
       return res.json()
    })
    .catch(err => console.log("ERROR - getSinglePost - apiPost",err))
}

export const getPostsByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => console.log("ERROR - getPostByUser - apiPost", err));
}


export const deletePost = (postId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
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
    .catch(err => console.log("ERROR - deletePost - apiPost",err))
}

export const editPost = (postId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then( res => {
       return res.json()
    })
    .catch(err => console.log("ERROR - editPost - apiPost", err))
}
