var express = require('express');
const { route } = require('.');
const Client = require('../model/client');
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

router.post("/inscrire", (req, response) => {

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const dateNaissance = req.body.dateNaissance;
    const tel = req.body.tel;
    const email = req.body.email;
    const adresse = req.body.adresse;
    const numerocin = req.body.numerocin;
    const dateDelivrance = req.body.dateDelivrance;
    const lieuDelivrance = req.body.lieuDelivrance;
    const login = req.body.login;
    const mdp = req.body.mdp;
    const newClient = new Client({
        "nom": nom,
        "prenom": prenom,
        "dateNaissance": dateNaissance,
        "tel": tel,
        "email": email,
        "adresse": adresse,
        "cin": {
            "numero": numerocin,
            "dateDelivrance": dateDelivrance,
            "lieuDelivrance": lieuDelivrance
        },
        "login": login,
        "password": mdp
    });
    newClient.save().then(() => {
        response.status(200).send("Saved successfully");
    }).catch((e) => {
        console.log(`Error in inscrire ${e}`, e);
        response.status(500).send("There is an error");
    })
});

module.exports = router;
