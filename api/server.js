let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let AssigmentRouter = require('./routes/assignments');
let routetype = require('./routes/typ');
let authRoute=require("./routes/auth");
let matierRouter=require("./routes/matierRouter");
const dotenv=require('dotenv');
const verify=require('./routes/verifyToken');
const roleRouter=require('./routes/roleRouter');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);
dotenv.config();

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = process.env.DB_CON;


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};





mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,auth-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

// app.route(prefix + '/assignments')
//   .get(assignment.getAssignments);

// app.route(prefix + '/assignments/:id')
//   .get(assignment.getAssignment)
//   .delete(assignment.deleteAssignment);


// app.route(prefix + '/assignments')
//   .post(assignment.postAssignment)
//   .put(assignment.updateAssignment);
app.use('/api/assignments',AssigmentRouter);
app.use('/api/type',routetype);
app.use('/api/matier',matierRouter);
app.use('/api/user',authRoute);
app.use('/api/role',roleRouter);


  // app.route(prefix + '/auth/register')
  // .post(authRoute.postAuth);  

  // app.route(prefix + '/auth/login') 
  // .post(authRoute.loginuser); 
  
  




// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


