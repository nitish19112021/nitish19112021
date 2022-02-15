import axios from 'axios';

const BASE_URL = "http://localhost:4000/api/";
 const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGZmYWE5OTMxOGQ3YWE0YjNjYjg3NiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDIwOTM3NzEsImV4cCI6MTY0MjE4MDE3MX0.UmoXTar9O8k7ofyvW9Mbd4Af2Ei-ZkDAK-Gj907Nl7E";
//const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken;
// console.log(JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken)


export const publicRequest = axios.create({
    baseURL:BASE_URL,
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
    
})
console.log(TOKEN)