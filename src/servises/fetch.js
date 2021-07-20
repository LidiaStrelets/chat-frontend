import axios from 'axios';

const login = (data) => axios.post(`https://chat-app-maybe.herokuapp.com/auth/login`, data)



const backend = {
    login,
}

export default backend