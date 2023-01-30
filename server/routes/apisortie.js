var express = require('express');
var router = express.Router();

let sortie = require('../services/sortieservice');

router.get("/", (request, response) => {
  response.status(200).send("OK api-sortie");
});

router.get("/voituredepose", sortie.voitureDeposee);

router.post("/detailVoitureDeposee", sortie.getDetailDepotFacture);

router.post("/validationSortie", sortie.validationSortie);

module.exports = router;
