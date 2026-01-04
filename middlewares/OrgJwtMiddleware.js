const jwt = require("jsonwebtoken")

const OrgJwtMiddleware = (req, res, next) =>{
    console.log(`Inside OrgJwtMiddleware`);

    const token = req.headers.authorization.split(" ")[1]
    console.log(token);

    try{
        const jwtResponse = jwt.verify(token, process.env.JWTSecreteKey)
        console.log(jwtResponse);
        req.payload = jwtResponse.orgMail
        console.log(req.payload);
        
        next()
    }catch(error){
        res.status(500).json(`Invalid token`, error)
    }
    
}

module.exports = OrgJwtMiddleware