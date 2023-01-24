var express = require('express');

let identification = require("../services/identification");

var router = express.Router();

router.get("/health-check", (request, response) => {
    response.status(200).send("OK");
});

router.get("/", (request, response) => {
    response.status(200).send("OK");
});

router.get("/login", (request, response) => {
    response.send("login");
});

router.post("/inscription", identification.clientInscription);

module.exports = router;
