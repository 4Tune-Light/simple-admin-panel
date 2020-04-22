const database = require("../helpers/database.js")

const model = {
    getAll: () => {
       return new Promise((resolve, reject) => {
           const query = "SELECT user.id, user.username, user.email, user.fullname, role.name AS role_name FROM `user` JOIN `role` ON user.role_id = role.id"
           database.query(query, (err, res) => {
               if (err) reject(err)
               else resolve(res)
           })
       })
    },

    getAllRole: () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, name FROM role"
            database.query(query, (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    },

    get: (data) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, username, email, fullname, role_id FROM user WHERE id = ?"
            database.query(query, data, (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    },

    create: (data) => {
        return new Promise((resolve, reject) => {
            const query = "INSERT user SET ?"
            database.query(query, data, (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    },

    edit: (data) => {
        return new Promise((resolve, reject) => {
            const query = "UPDATE user SET ? WHERE id = ?"
            database.query(query, data, (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }
}

module.exports = model