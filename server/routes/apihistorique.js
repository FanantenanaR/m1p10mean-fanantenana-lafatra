var express = require('express');

var router = express.Router();

let depot = require('../services/depotservice')

router.get("/", (request, response) => {
  response.status(200).send("OK api-historique");
});

router.get("/historique", depot.historiqueVoiture);

router.post("/historiqueClient", depot.historiqueVoitureClient);

router.get("/voiture/liste", depot.listeVoiture);

router.post("/ownerCar", depot.proprietaireVoiture);

router.post("/detail", depot.historiqueReparation);

module.exports = router;
