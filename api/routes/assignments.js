let Assignment = require('../model/assignment');
const AssigmentRouter=require('express').Router();
const verify=require('./verifyToken');
const matier=require('../model/matiere');
const jwt = require('jsonwebtoken');



 AssigmentRouter.get('/', async (req, res)=>{
     try{
      const token= req.header('auth-token');
      var decoded = jwt.decode(token, {complete: true});
      var a=decoded.payload._id
    const mat=await Assignment.find({note:null}).populate([{ 
        path: 'prof',
        populate: {
          path: 'image',
          model: 'Image'
        } 
     },{ 
        path: 'matier',
        populate: {
          path: 'image',
          model: 'Image'
        } 
     }]);




     const mat2=await Assignment.find({note:{ $ne: null }},{prof:decoded.payload._id}).populate([{ 
        path: 'prof',
        populate: {
          path: 'image',
          model: 'Image'
        } 
     },{ 
        path: 'matier',
        populate: {
          path: 'image',
          model: 'Image'
        } 
     }]);
   
    
    
    res.json({NonRendu:mat,Rendu:mat2});
     }
     catch(err){
         res.send("erreor")
     }
   // res.json({ Token:token })   
 })

 AssigmentRouter.get('/:id', async (req, res)=>{
   const mat=await Assignment.findOne({_id:req.params.id}).populate('matier');
   res.send(mat);
 })
 
  AssigmentRouter.post('/', async (req, res)=>{
   

    // console.log(req.body.matiere);
    // res.send();
     
     try{
        const token= req.header('auth-token');
        var decoded =  jwt.decode(token, {complete: true});
        if(decoded.payload._id){
            a=decoded.payload._id}
         const mat=new Assignment({
            id : req.body.id,
            nom : req.body.nom,
            dateDeRendu : req.body.dateDeRendu,
            rendu : req.body.rendu,
             matier:req.body.matiere._id,
            note:req.body.note,
            prof:a,
            remarque:req.body.remarque
    
         })    
      //   const savedAssigment= await mat.save();

        const savedAssigment= await mat.save();
        const mt= await matier.findOne({_id:req.body.matier});
        if(mt){
        mt.assigments.push(savedAssigment)
        await mt.save();}
         }
         catch(err){
             res.status(400).send(err)
         }

        res.send("ok");

  })

  
   AssigmentRouter.put('/:id', async (req, res)=>{
      try{
     const mat= await Assignment.findByIdAndUpdate(req.params.id,req.body, {new: true});
     res.send('updated');
      }
      catch(err){
          res.status(400).send("can't update")
      }
 
  } )


  AssigmentRouter.delete('/:id', async (req, res)=>{
     try{
  
    const mt= await matier.findOne({ assigments: { $in: [req.params.id]}}) 
    if(mt){
    mt.assigments.remove(req.params.id);
    mt.save();   
    res.send(mt);}
    const mat= await Assignment.findByIdAndRemove(req.params.id);
    res.status(200);
     }
     catch(err){
         res.status(400).send("can't delete");
     }
 
 } ) 
 
 module.exports = AssigmentRouter;





// Récupérer tous les assignments (GET)
// function getAssignments(req, res){
//     var query = { nom: "njdjned" };
//     Assignment.find(query,function (err, course) {res.json(course);}).populate('typee');
//     // console.log(j);
//     // res.send("ok");
//     // Assignment.find((err, assignments) => {
//     //     if(err){
//     //         res.send(err)
//     //     }

//     //     res.send(assignments);
//     // });
// }

// // Récupérer un assignment par son id (GET)
// function getAssignment(req, res){
//     let assignmentId = req.params.id;

//     Assignment.findOne({id: assignmentId}, (err, assignment) =>{
//         if(err){res.send(err)}
//         res.json(assignment);
//     })
// }

// // Ajout d'un assignment (POST)
// function postAssignment(req, res){
//     let assignment = new Assignment();
//     assignment.id = req.body.id;
//     assignment.nom = req.body.nom;
//     assignment.dateDeRendu = req.body.dateDeRendu;
//     assignment.rendu = req.body.rendu;

//     console.log("POST assignment reçu :");
//     console.log(assignment)

//     assignment.save( (err) => {
//         if(err){
//             res.send('cant post assignment ', err);
//         }
//         res.json({ message: `${assignment.nom} saved!`})
//     })
// }

// // Update d'un assignment (PUT)
// function updateAssignment(req, res) {
//     console.log("UPDATE recu assignment : ");
//     console.log(req.body);
//     Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
//         if (err) {
//             console.log(err);
//             res.send(err)
//         } else {
//           res.json({message: 'updated'})
//         }

//       // console.log('updated ', assignment)
//     });

// }

// // suppression d'un assignment (DELETE)
// function deleteAssignment(req, res) {

//     Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json({message: `${assignment.nom} deleted`});
//     })
// }



// module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
