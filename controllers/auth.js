const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const model = require("../models/auth.js")
const jwtConfig = require("../config/jsonwebtoken.json")


const auth = {
    get: (req, res) => {
        res.render("login")
    },

    post: async (req, res) => {
        const { username, password } = req.body
        const result = await model.login([username])
        
        if (result.length === 0) {
            res.render("login", {err: "username or password is wrong 1"})
        }
        else {
            const [data] = result
            console.log(password)
            console.log(data.password)
            bcrypt.compare(password, data.password, function(err, result) {
                if (err) {
                    res.render("login", {err: "username or password is wrong 2"})
                } else {
                    if (!result) {
                        res.render("login", {err: "username or password is wrong 3"})
                    } else {
                        const token = jwt.sign({fullname: data.fullname}, jwtConfig.secret)
                        req.session.token = token
                        res.redirect("/dashboard")
                    }
                }
            });
        }
    }
}

module.exports = auth