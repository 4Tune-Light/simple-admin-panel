require("dotenv").config()
const express = require("express")
const path = require("path")
const session = require('express-session');

const authController = require("./controllers/auth.js")
const userController = require("./controllers/user.js")
const verifyToken = require("./middlewares/verifyToken.js")

const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(session({secret: "Shh, its a secret!"}))
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
})

app.get("/login",authController.get)

app.post("/login", authController.post)

app.get("/dashboard", verifyToken, userController.getAll)

app.get("/create-user", verifyToken, userController.createGet)

app.post("/create-user", verifyToken, userController.createPost)

app.get("/edit-user/:id", verifyToken, userController.editGet)

app.post("/edit-user/:id", verifyToken, userController.editPost)

app.post("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/login")
})

app.use(function(req, res) {
    res.send('404 Page Not Found!');
});

app.use(function(err, req, res) {
    console.log(err)
    res.send('500 Server Internal Error');
});

