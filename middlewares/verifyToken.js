const jwt = require("jsonwebtoken")
const jwtConfig = require("../config/jsonwebtoken.json")

const verify = (req, res, next) => {
    const { token } = req.session
    if (!token) {
        res.send("403 Unauthorized User")
    } else {
        jwt.verify(token, jwtConfig.secret, (err, decoded) => {
            if (err) {
                res.send("403 Unathorized user")
            } else {
                req.fullname = decoded.fullname
                next()
            }
        })
    }
}

module.exports = verify