const api = "http://localhost:3001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  "Content-Type": "application/json",
  'Authorization': token
}
const body = {
  'Accept': 'application/json',
  'Authorization': token
}

export const fetchCategories = () => fetch(`${api}/categories`, {headers})
.then(res => res.json())
.then(data => data.categories)

export const fetchPosts = () => fetch(`${api}/posts`, {headers})
.then(res => res.json())

export const fetchPost = (id) => fetch(`${api}/posts/${id}`, {headers})
.then(res => res.json())

export const fetchPostComments = (id) => fetch(`${api}/posts/${id}/comments`, {headers})
.then(res => res.json())

export const fetchPostsCategory = (category) => fetch(`${api}/${category}/posts`, {headers})
.then(res => res.json())

export const post = (post) => fetch(`${api}/posts`, {method:'POST', body:JSON.stringify(post), headers})
.then(res => res.json())

export const comment = (comment) => fetch(`${api}/comments`, {method:'POST', body:JSON.stringify(comment), headers})
.then(res => res.json())


export const votePost = (id,body) => fetch(`${api}/posts/${id}`, {method:'POST', body:JSON.stringify(body), headers})
.then(res => res.json())

export const voteComment = (id,body) => fetch(`${api}/comments/${id}`, {method:'POST', body:JSON.stringify(body), headers})
.then(res => res.json())

export const editComment = (id,body) => fetch(`${api}/comments/${id}`, {method:'PUT', body:JSON.stringify(body), headers})
.then(res => res.json())

export const deleteComment = (id) => fetch(`${api}/comments/${id}`, {method:'DELETE', headers})
.then(res => res.json())

export const editPost = (id,body) => fetch(`${api}/posts/${id}`, {method:'PUT', body:JSON.stringify(body), headers})
.then(res => res.json())

export const deletePost = (id) => fetch(`${api}/posts/${id}`, {method:'DELETE', headers})
.then(res => res.json())
