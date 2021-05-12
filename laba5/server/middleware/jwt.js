const jwt = require('jsonwebtoken');

function needVefification(body) {

    isNeed = false;
    //only authorized
    const operations = [
        'getTaskById',
        'getAllFiles',
        'addTask',
        'updateTask',
        'deleteTask',
        'addFile'
    ];

    if (operations.includes(body.operationName)) {
        isNeed = true;
    }
    return isNeed;
}

//Проверка токена на валидность
exports.verifyJWT = (req, res, next) => {
    
    console.log(`JWT:   COOKIE = `);
    console.log(req.cookies['auth-token']);

    if (needVefification(req.body)) {

        if (req.cookies['auth-token']) {
            
            const token = req.cookies['auth-token'];

            console.log(`JWT:   TOKEN = ${token}`);

            if (!token) {
                error.message = "AUTH: YOU ARE UNAUTHORIZED.";
            }
            try {
                const id = jwt.verify(token, 'jwtSecret');
                console.log(`JWT:   VERIFY_ID = ${id}`);
                next();

            } catch (err) {
                
                res.status(401).send({statusCode:401,message:"AUTH: YOU ARE UNAUTHORIZED.SOMETHING HAPPENED TO YOUR COOKIE."});
               
            }
        } else {
            res.status(401).send({statusCode:401,message:"AUTH: YOU ARE UNAUTHORIZED."});
        }
    } else {
        next();
    }

    console.log(`JWT:   EVENT NAME = `);
    console.log(req.body);
       
};