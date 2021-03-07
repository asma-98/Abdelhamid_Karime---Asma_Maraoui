let typ = require('../model/type');
let Assignment = require('../model/assignment');
const typeRouter=require('express').Router();
const verify=require('./verifyToken');



typeRouter.get('/',verify, (req, res)=>{
    res.send("okjjjjjjjjjjjjjjjjj");
})

module.exports =typeRouter;