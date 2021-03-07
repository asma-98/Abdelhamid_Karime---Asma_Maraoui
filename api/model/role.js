let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RoleSchema = Schema({ 
    role:{
        type:String,
        required:true,
        min:4,
    }
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Role', RoleSchema);