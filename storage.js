class Storage {
    
    static getAllDataFromStorage() {
        let users

        if (localStorage.getItem('users') === null) {
            users =[]
        } 
        else {
            users = JSON.parse(localStorage.getItem('users'))
        }

        return users
    }

    static addDataToStorage(user) {
        let users = this.getAllDataFromStorage()

        if (users.indexOf(user) === -1) {
            users.push(user)
        }
        localStorage.setItem('users', JSON.stringify(users))
    }

    static removeDataFromStorage() {
        localStorage.removeItem('users')
    }
}