const MatierRouter=require('express').Router();
const verify=require('./verifyToken');
const matier=require('../model/matiere');
const Image=require('../model/image');
let Assignment = require('../model/assignment');
const jwt = require('jsonwebtoken');



MatierRouter.get('/', async (req, res)=>{

    try{
    // const token= req.header('auth-token');
    // var decoded = jwt.decode(token, {complete: true});
    // console.log(decoded.payload.nom);
    const mat=await matier.find().populate("image");
  
    res.send(mat);}
    catch(err){
    
    }

//    const options = {
//     page: 1,
//     limit: 10,
//     collation: {
//       locale: 'en',
//     },
//   };
  
//   matier.paginate({}, options, function (err, result) {
//     // result.docs
//     // result.totalDocs = 100
//     // result.limit = 10
//     // result.page = 1
//     // result.totalPages = 10
//     // result.hasNextPage = true
//     // result.nextPage = 2
//     // result.hasPrevPage = false
//     // result.prevPage = null
//     // result.pagingCounter = 1
//     res.send(result);
//   });



//    matierss=[matier];

//    var aggregateQuery = matier.aggregate();
//    matier.aggregatePaginate(
//      aggregateQuery,
//      {
//        page: parseInt(req.query.page) || 1,
//        limit: parseInt(req.query.limit) || 10,
//      },
//      (err, matiers) => {
//        if (err) {
//          res.send(err);
//        }
 
//     //    res.send(matiers);
    
//      }
//    );

  


})

MatierRouter.get('/:id', async (req, res)=>{
    const mat=await matier.findOne({ _id:req.params.id } ).populate("image");
    res.send(mat);
 })

MatierRouter.post('/', async (req, res)=>{

   console.log(req.body)
   try{
            var img=new Image();
            if(req.body.image){
            img=new Image({
            image:req.body.image.image
            })
            await img.save();   
        }else{
            img=null;
        }
        const mat=new matier({
            lebele:req.body.lebele,
            image:img._id    
        })
        
       const matSaved= await mat.save(); 
        img=await Image.findOne({_id:img._id});
        img.matier=matSaved._id;
        img.save();
       // res.send(img);
       res.send(mat);
    }
    catch(e){


        res.send("error");
    }
 })
 MatierRouter.put('/:id', async (req, res)=>{
     try{
        await Image.deleteOne({matier:req.params.id}) ;    
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
    const mat= await matier.findByIdAndUpdate(req.params.id,req.body, {new: true}).populate("image");
    res.send('updated');
     }
     catch(err){
         res.status(400).send("can't update")
     }

 } )
MatierRouter.delete('/:id', async (req, res)=>{
    try{       
   await Assignment.updateMany({matier:req.params.id}, { $set: { matier:null }},{ multi: true, upsert: true });  
   await Image.deleteOne({matier:req.params.id}) ;
   const mat= await matier.findByIdAndRemove(req.params.id);
   res.send();
    }
    catch(err){
        res.status(400).send("can't delete");
        console.log(err.message);
    }

} ) 

module.exports =MatierRouter;