let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let typeschema=require('./type')

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom:String,
    auteur: String,
    rendu: Boolean,
    matier:{
        type: Schema.Types.ObjectId,
        ref: 'Matier'
    },
    prof:{      
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    note:Number,
    remarque:String
    
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
