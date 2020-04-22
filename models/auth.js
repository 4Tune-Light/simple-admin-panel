const database = require("../helpers/database.js")

const model = {
    login: (data) => {
       return new Promise((resolve, reject) => {
           const query = "SELECT fullname, password FROM `admin` WHERE username = ?"
           database.query(query, data, (err, res) => {
               if (err) reject(err)
               else resolve(res)
           })
       })
    }
}

module.exports = model