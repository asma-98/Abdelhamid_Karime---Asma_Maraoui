const User=require('../model/user');
const Image=require('../model/image');
const bycrpt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthRouter=require('express').Router();
getAuth=(req,res)=>{
    res.send("ok auth");
}


AuthRouter.post('/',async (req,res)=>{

   
     const checkuniqueemail= await User.findOne({email : req.body.email});
     var img=new Image();
     if(req.body.image){
      img=new Image({
      image:req.body.image.image
     })
     img.save();   
    }else{
        img=null;
    }
 
    if(checkuniqueemail) return res.send(`${checkuniqueemail} exist`);
    const salt= await bycrpt.genSalt(10);   
    const hashPsswrd= await bycrpt.hash(req.body.password, salt);
    const user=new User({
        nom:req.body.nom,
        email:req.body.email,
        password:hashPsswrd,
        image:img,
        role:req.body.role
    });
    try {
        const saveduser=await user.save();
        
         img=await Image.findOne({_id:img._id});
         img.user=saveduser._id;
         img.save();
        res.send(img);
        }
    catch(err){

    }    
    
})

AuthRouter.delete('/:id', async (req, res)=>{
    try{       
   
   await Image.deleteOne({user:req.params.id}) ;
   const mat= await User.findByIdAndRemove(req.params.id);
   res.send();
    }
    catch(err){
        res.status(400).send("can't delete");
        console.log(err.message);
    }

} ) 

AuthRouter.get('/', async (req, res)=>{
    const mat=await User.find().populate('image').populate(['image','role']);
    //const token= req.header('auth-token');
  //  var decoded = jwt.decode(token, {complete: true});
    res.send(mat);
 })

 AuthRouter.put('/:id', async (req, res)=>{
    const mat=await User.find().populate('image');
    try{
        await Image.deleteOne({user:req.params.id}) ;    
        var img=new Image();
        if(req.body.image){
        img=new Image({
        image:req.body.image.image
        })
        img.save();   
    }else{
        img=null;
    }
    req.body.image=img._id;
    const mat= await User.findByIdAndUpdate(req.params.id,req.body, {new: true}).populate("image");
    res.send('updated');
     }
     catch(err){
         res.status(400).send("can't update")
     }
 })
 AuthRouter.get('/:id', async (req, res)=>{
    const mat=await User.findOne({_id:req.params.id}).populate(['image','role']);
    //const token= req.header('auth-token');
  //  var decoded = jwt.decode(token, {complete: true});
    res.send(mat);
 })

 AuthRouter.post('/login', async (req, res)=>{
     console.log(req.body)
    const user= await User.findOne({email : req.body.email}).populate(['image','role']);
     
    if(!user) return res.send(`email dosn't exist`);

    const validatepassword= await bycrpt.compare(req.body.password,user.password);
    if(!validatepassword) return res.send(`the password is wrong`);
    try{
   //     const token = await jwt.sign({_id:user._id,nom:user.nom},process.env.TOKEN);
   const token = await jwt.sign({_id:user._id,nom:user.nom,role:user.role.role},process.env.TOKEN);
        // await res.setHeader('auth-token',token)   
        res.json({ Token:token,Role: user.role.role})   
       // res.send(user.role.role);
        }catch(err){
        res.send("login")
 }
 })

// loginuser=async (req,res)=>{
//    
//     }


// }




module.exports =AuthRouter