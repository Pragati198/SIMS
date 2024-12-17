const jsonwebtoken = require('jsonwebtoken')

const adminMiddleware = (req,res,next)=>{
    

    const token = req.headers.authorization;
    console.log(token);
    
    if(token)
    {
        const validToken = jsonwebtoken.verify(token,process.env.JWT_SECRET_KEY);
        if(validToken)
        {
            let {iat} = validToken;
            let now = new Date();
            let currentTimestamp = Math.floor(now.getTime()/1000);

            if((currentTimestamp - iat) >= process.env.TOKEN_TIMEOUT)
            {
                return res.status(400).json({
                    status : 0,
                    message : 'Token expired. please login again to continue.'
                })
            }
            next();
        }
        else
        {
            res.status(400).json({
                status :0 ,
                message : 'Unauthorized access....Invaild token'
            })
        }
    }
    else{
        res.status(400).json({
            status : 0,
            message : 'Unauthorized access'
        })
    }
}

module.exports = adminMiddleware;