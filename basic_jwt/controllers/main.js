const CustomApiError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        throw new CustomApiError('Please provide username and error', 400);
    }

    const id = new Date().getDate();

    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'});
    res.status(200).json({msg:'user created', token})
}

const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomApiError('No auth header and token provided', 401);
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const luckyNumber = Math.floor(Math.random() * 100);
        console.log(`lucky number = ${luckyNumber}`)
        res.status(200).json({ msg: `Hello, ${decoded.username}!`, secret: `Here is your data, ${luckyNumber}`})
    } catch (e) {
        throw new CustomApiError('Not authorized to access this route', 401);
    }
}

module.exports = {
    login, dashboard
}