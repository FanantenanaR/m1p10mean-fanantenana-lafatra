var express = require('express');
var router = express.Router();

let traitementLogin = require("../services/loginservice");
let depot = require("../services/depotservice");

/* GET home page. */
router.get('/', function(req, res, next) {
  response.status(200).send("OK");
});

router.get("/health-check", (request, response) => {
  response.status(200).send("OK");
});


// // liens
// router.use(function(req, res, next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

router.post('/loginClient', traitementLogin.traitementLoginClient);

router.post('/loginPersonnel', traitementLogin.traitementLoginPersonnel);

router.post('/depot/enregistrementDepot', depot.enregistrementDepot);

router.get("/voitures/depose", depot.vehiculeDepose);
module.exports = router;
