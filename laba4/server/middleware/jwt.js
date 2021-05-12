const jwt = require('jsonwebtoken');

//Проверка токена на валидность
exports.verifyJWT =function(socket,packet,next) {
    
    console.log(`JWT:   EVENT NAME = ${packet[0]}`);

    if (packet[0]=="get_all_tasks" || packet[0]=="sort_tasks" ||
        packet[0]=="login" || packet[0]=="register"||  
        packet[0]=="siofu_start"||  packet[0]=="siofu_done"||  packet[0]=="siofu_progress"){
        next();
    }

    else{
        let error=new Error();
        console.log(packet);

        if (packet[1].cookie){
            console.log(`JWT:   COOKIE = ${packet[1].cookie}`);

            const token=packet[1].cookie;

            console.log(`JWT:   TOKEN = ${token}`);

            if (!token) {
                error.statusCode=401;
                error.message="AUTH: YOU ARE UNAUTHORIZED.";
                next(error);
            }
            try{
                const id = jwt.verify(token, 'jwtSecret');
                console.log(`JWT:   VERIFY_ID = ${id}`);
                next();

            }catch(err){
                error.statusCode=401;
                error.message="AUTH: YOU ARE UNAUTHORIZED.SOMETHING HAPPENED TO YOUR COOKIE.";
                next(error);
            } 
        }

        else{
            error.statusCode=401;
            error.message="AUTH: YOU ARE UNAUTHORIZED.";
            next(error);
        }
    }    
};