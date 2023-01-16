const checker = require("../helper/checker");
const Client = require('../model/client');

const clientInscription = (request, response) => {
    const nom = request.body.nom;
    if (!checker.isInputValid(nom, "String")) {
        const error = {
            "status": 500,
            "message": "Veuillez remplir le champs 'nom'",
            "errorType": "MissingField"
        };
        response.status(500).send(error);
    }
    const prenom = request.body.prenom;
    const dateNaissance = request.body.dateNaissance;
    const tel = request.body.tel;
    const email = request.body.email;
    const adresse = request.body.adresse;
    const numerocin = request.body.numerocin;
    const dateDelivrance = request.body.dateDelivrance;
    const lieuDelivrance = request.body.lieuDelivrance;
    const login = request.body.login;
    const mdp = request.body.mdp;
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
};

module.exports = {
    clientInscription
};
