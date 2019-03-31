

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
