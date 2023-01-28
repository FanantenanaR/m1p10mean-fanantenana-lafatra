var express = require('express');

var router = express.Router();

let traitementLogin = require("../services/loginservice");

router.get("/", (request, response) => {
  response.status(200).send("OK api-login");
});

router.post('/login/loginClient', traitementLogin.traitementLoginClient);

router.post('/login/loginPersonnel', traitementLogin.traitementLoginPersonnel);

module.exports = router;
