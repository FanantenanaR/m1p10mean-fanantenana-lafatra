var express = require('express');

let identification = require("../services/identification");
let traitementLogin = require("../services/loginservice");

var router = express.Router();

router.get("/health-check", (request, response) => {
    response.status(200).send("OK");
});

router.get("/", (request, response) => {
    response.status(200).send("OK");
});

router.post('/login', traitementLogin.traitementLoginClient);

router.post("/inscription", identification.clientInscription);

module.exports = router;
