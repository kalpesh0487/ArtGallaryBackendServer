const jwt = require("jsonwebtoken")

async function authToken(req, res, next){
    try {
        const token = req.cookies?.token
        console.log("token", token)
        if(!token){
            return res.json({
                message: "Please login first",
                error: true,
                success: false
            })
        }
        if(token){
            jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded){
                console.log("error",err)
                console.log("decoded", decoded)
    
                if(err){
                    console.log("error auth", err)
                }
                req.user = req.user || {}
                req.user.id = decoded?._id
    
                next()
            })   
        }
        
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }
}

module.exports = authToken