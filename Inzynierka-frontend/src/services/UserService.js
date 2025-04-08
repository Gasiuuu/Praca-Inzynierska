class UserService {

    static BASE_URL = "http://localhost:8080"


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