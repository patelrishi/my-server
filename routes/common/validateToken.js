var jwt = require('jsonwebtoken')


function validateToken(req, res, next) {
    const token = req.headers.authorization //we can received the req(token) from client side 
    if (token) {
        jwt.verify(token, 'appToken', function (err) {
            if (err) {
                res.send('Invalid token')
            } else {
                next()
            }
        })
    } else {
        res.send('token missing')
    }
}

module.exports = validateToken;