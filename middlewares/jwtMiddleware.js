const jwt = require("jsonwebtoken")

const jwtMiddleware = (req, res, next) =>{
    console.log(`Inside jwt middleware`);

    const token = req.headers.authorization.split(" ")[1]
    console.log(token);

    try{
        const jwtResponse = jwt.verify(token, process.env.JWTSecreteKey)
        console.log(jwtResponse);
        req.payload = jwtResponse.userMail
        console.log(req.payload);
        
        next()
    }catch(error){
        res.status(500).json(`Invalid token`, error)
    }
    
}

module.exports = jwtMiddleware