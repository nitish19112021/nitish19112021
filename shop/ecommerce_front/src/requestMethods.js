import axios from 'axios';

const BASE_URL = "http://localhost:4000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzU5YWNmYzIzN2Y5NjhiNmJlODBmNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTU1OTg1MiwiZXhwIjoxNjQxNjQ2MjUyfQ.0IRw-b8FEHJdSjpo0_QNpWROvPDwfriWEwxfo909fRM"

export const publicRequest = axios.create({
    baseURL:BASE_URL,
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})