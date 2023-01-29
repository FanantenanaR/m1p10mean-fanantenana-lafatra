var express = require('express');

var router = express.Router();

let depot = require('../services/depotservice')

router.get("/", (request, response) => {
  response.status(200).send("OK api-depot");
});

router.post("/depot/enregistrementDepot", depot.enregistrementDepot);

router.get("/historique/historique", depot.historiqueVoiture);

router.post("/historique/historiqueClient", depot.historiqueVoitureClient);

router.get("/historique/voiture/liste", depot.listeVoiture);

router.post("/historique/ownerCar", depot.proprietaireVoiture);

router.post("/historique/detail", depot.historiqueReparation);

module.exports = router;
