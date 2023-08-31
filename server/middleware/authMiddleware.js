const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select("-password")
            next()
        } catch (err) {
            res.status(401)
            throw new Error("Não autorizado, token inválido")
        }
    } else {
        res.status(401)
        throw new Error("Não autorizado, token não encontrado")
    }
})

module.exports = {
    protect,
}
