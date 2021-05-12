const jwt = require('jsonwebtoken');

//Проверка токена на валидность
exports.verifyJWT = function (req, res, next) {
    const token = req.cookies['auth-token'];
    //если нет токенов
    if (!token) {
        return res.status(401).send({message:"AUTH: YOU ARE UNAUTHORIZED."});
    } 
    else 
    {
        try {
            const id = jwt.verify(token, 'jwtSecret');
            req.userId = id;
            next();
        } catch (err) {
            res.status(401).send({message:"AUTH: YOU ARE UNAUTHORIZED.SOMETHING HAPPENED TO YOUR COOKIE."});
        }

    }
};