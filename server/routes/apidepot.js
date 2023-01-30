var express = require('express');

var router = express.Router();

let depot = require('../services/depotservice')

router.get("/", depot.vehiculeDepose);

router.post("/enregistrementVehicule", depot.ajouterVehicule);

router.post('/enregistrementDepot', depot.enregistrementDepot);

router.post('/detailsDepot', depot.detailsDepot);

router.post('/ajouterReparation', depot.ajouterReparation);

router.post('/assignerReparation', depot.assignerReparation );

router.post("/entamerReparation", depot.entamerReparation);

router.post("/updateAvancement", depot.updateAvancementReparation);

router.post("/listeReparation", depot.listerReparation);

router.post("/listeReparationNonEntamer", depot.listerReparationNonEntamer);

router.post("/listeReparationEncours", depot.listerReparationEncours);

router.post("/listeReparationTermine", depot.listerReparationTermine);

router.get("/listerResponsable", depot.getResponsable);

module.exports = router;
