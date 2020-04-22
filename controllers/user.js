const bcrypt = require('bcrypt');
const model = require("../models/user.js")
const bncryptConfig = require("../config/bcrypt.json");

const user = {
    getAll: async (req, res) => {
        const result = await model.getAll()
        console.log(req.fullname)
        const data = {
            fullname: req.fullname,
            rows: result
        }
        res.render("dashboard", {data})
    },

    createGet: async (req, res) => {
        const roles = await model.getAllRole()
        const data = {roles, action: '/create-user', required: true}
        res.render("user", {data})
    },

    createPost: async (req, res) => {
        try {
            const {username, email, password, fullname, role_id} = req.body
            if (!username || !email || !password || !fullname || !role_id) {
                throw 'invalid input'
            }

            bcrypt.hash(password, bncryptConfig.salt, async function(err, hash) {
                if (err) throw err
                const data = {
                    username, 
                    email,
                    password: hash,
                    fullname,
                    role_id
                }
                await model.create(data)
                res.redirect("/dashboard")
            });

        } catch (err) {
            const roles = model.getAllRole()
            const data = {roles, action: '/create-user', required: true, err}
            res.render("user", {data})
        }
    },

    editGet: async (req, res) => {
        try {
            const { id } = req.params
            const [user] = await model.get(id)
            const roles = await model.getAllRole()
            const data = {user, roles, action: '/edit-user/' + id, required: false}
            res.render("user", {data})
        } catch (e) {
            res.redirect("/dashboard")
        }
    },

    editPost: async (req, res) => {
        try {
            const { id } = req.params
            const {username, email, password, fullname, role_id} = req.body
            if (!id || !username || !email || !fullname || !role_id) {
                throw 'invalid input'
            }

            bcrypt.hash(password, bncryptConfig.salt, async function(err, hash) {
                if (err) throw err
                const data = {
                    username, 
                    email,
                    password: hash,
                    fullname,
                    role_id
                }
                await model.edit([data, id])
                res.redirect("/dashboard")
            });

        } catch (err) {
            const { id } = req.params
            const roles = model.getAllRole()
            const data = {roles, action: '/edit-user' + id, required: false, err}
            res.render("user", {data})
        }
    }

}

module.exports = user