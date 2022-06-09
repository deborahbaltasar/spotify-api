const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { error } = require("../../errors/Error");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return error(401, "notProvided", res);
    }

    const [, authToken] = authHeader.split(' ');
 
    try {
        const decoded = await promisify(jwt.verify)(authToken, process.env.AUTH_SECRET);
        req.userId = decoded.id;
        return next();
    } catch (err) {
        return error(401, "invalidToken", res);
    }
};
