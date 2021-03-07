const RoleRouter=require('express').Router();
const verify=require('./verifyToken');
const matier=require('../model/matiere');
const Role=require('../model/role');
const jwt = require('jsonwebtoken');



RoleRouter.get('/', async (req, res)=>{

try {
     const roles=await Role.find();
   res.send(roles);
}
catch(err){
    res.status(400).send();

}
})

RoleRouter.post('/', async (req, res)=>{

    try {
        const role=new Role({
            role:req.body.role            
        })
        await  role.save();
        res.status(200).send(role);
    }
    catch(err){
        res.status(400).send();
    
    }
    })


    RoleRouter.delete('/:id', async (req, res)=>{

        try {
            await Role.deleteOne({_id:req.params.id}) ;
            res.status(200).send();
        }
        catch(err){
            res.status(400).send();
        
        }
        })
        
        RoleRouter.get('/:id', async (req, res)=>{

            try {
                const mat=await Role.findOne({ _id:req.params.id } ).populate("image");
                res.send(mat);
            }
            catch(err){
                res.status(400).send();
            
            }
            }) 
            
        RoleRouter.put('/:id', async (req, res)=>{

                try {
                    const mat= await matier.findByIdAndUpdate(req.params.id,req.body, {new: true}).populate("image");
                    res.send(mat);
                }
                catch(err){
                    res.status(400).send();
                
                }
                }) 
        
        


 
                module.exports = RoleRouter;