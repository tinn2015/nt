const mysql = require('./mysql')
console.log('db User', mysql)

const user = {
    /**
     * @Description: 登录
     * @date 2019/5/30
     * @params: { Object } userData
     * @return: { Object | null }
     */
    async login (userData) {
        console.log('dblogin', userData)
        const {username, password} = userData
        return mysql.query(
            `select * from users where username = '${username}' and password = '${password}'`
        )
    },

    async register (userData) {
        return mysql.query(`
            insert into users set ?
        `, userData)
    }
}

module.exports = user


