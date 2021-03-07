const jwt = require('jsonwebtoken');


module.exports= async function (req, res, next){
    const token= req.header('auth-token');
    console.log(token);
    

    if(!token) return res.status(400).send('access  denied');

    try{
        const verfied=jwt.verify(token,process.env.TOKEN);
        // var userId = verfied.id;
        // console.log(userId)
        req.user=verfied;
        console.log(req.baseUrl);
        next();
    }
    catch (err){
        res.status(400).send('access  denied'); 
    }
    
}