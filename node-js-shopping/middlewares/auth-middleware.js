const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const {authorization} = req.headers;

    const [tokenType, tokenValue] = (authorization || "").split(' ');

    if (!authorization || tokenType !== "Bearer"){
        res.status(401).send({
            errorMessage : "로그인을 먼저 진행해주세요."
        });
        return;
    }
    try{
        const { userId } = jwt.verify(tokenValue, "secret_key");
        User.findById(userId).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch(err){
        res.status(401).send({
            errorMessage : "로그인을 먼저 진행하여 주세요"
        });
        return;
    }
};