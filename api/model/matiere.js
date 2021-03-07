let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Img=require('./image');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");



let MatierSchema = Schema({
   lebele:{
       type:String,
       required:true,
       min:3
   },
   assigments:[{
    type: Schema.Types.ObjectId,
    ref: 'Assignment'
   }],  
   image:{
       type: Schema.Types.ObjectId,
       ref: 'Image'
       }
});
MatierSchema.plugin(aggregatePaginate);
const myModel=mongoose.model('Matier', MatierSchema);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Matier', MatierSchema);

 

