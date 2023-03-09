const jwt = require("jsonwebtoken");
const CustomApiError = require("../errors/custom-error");


const authMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomApiError('No auth header and token provided', 401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username} = decoded;
        req.user = {id, username};
        next();
    } catch (e) {
        throw new CustomApiError('Not authorized to access this route', 401);
    }
}


module.exports = authMiddleware;