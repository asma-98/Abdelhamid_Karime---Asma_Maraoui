
let mongoose = require('mongoose');
let Schema = mongoose.Schema;



let ImageSchema = Schema({
   image:{
       type:String,
       min:1000
   },
   matier:{
    type: Schema.Types.ObjectId,
    ref: 'Matier'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
        }

 
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Image', ImageSchema);