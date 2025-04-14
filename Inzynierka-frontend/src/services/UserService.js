import axios from 'axios'

class UserService {

    static BASE_URL = `${import.meta.env.VITE_ENV_BACKEND_URL}/api`

    static async login(username, password) {
        const response = await axios.post(
            `${this.BASE_URL}/login/`,
            { username, password },
            { withCredentials: true }
        );
        return response.data;
    }


    static isAuthenticated(){
        const token = sessionStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = sessionStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = sessionStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default UserService