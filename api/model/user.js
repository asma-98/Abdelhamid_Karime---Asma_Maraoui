let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = Schema({ 
    nom:{
        type:String,
        required:true,
        min:4,
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:30,
        uniqueemail:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:30
    },
    date:{
        type:Date,
        default:Date.now
    }
    ,
    image:{
        type: Schema.Types.ObjectId,
        ref: 'Image'
        },
    role:{
            type: Schema.Types.ObjectId,
            ref: 'Role'
         }    
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('User', userSchema);