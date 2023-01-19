const checker = require("../helper/checker");
const Client = require('../model/client');

const clientInscription = (request, response) => {
    const nom = request.body.nom;
    if (!checker.isInputValid(nom, checker.IS_EMPTY_STRING)) {
        const error = {
            "status": 500,
            "message": "Veuillez remplir le champs 'nom'.",
            "errorType": "InvalidField",
            "field": "nom"
        };
        response.status(500).send(error);
        return;
    }
    const prenom = request.body.prenom;
    if (!checker.isInputValid(prenom, checker.IS_EMPTY_STRING)) {
        const error = {
            "status": 500,
            "message": "Veuillez remplir le champs 'prenom'.",
            "errorType": "InvalidField",
            "field": "prenom"
        };
        response.status(500).send(error);
        return;
    }
    const dateNaissance = request.body.dateNaissance;
    if (!checker.isInputValid(dateNaissance, checker.IS_VALID_DATE)) {
        const error = {
            "status": 500,
            "message": "Veuillez remplir une date valide dans le champs 'date de naissance'.",
            "errorType": "InvalidField",
            "field": "dateNaissance"
        };
        response.status(500).send(error);
        return;
    }
    const tel = request.body.tel;
    if (!checker.isInputValid(tel, checker.IS_EMPTY_STRING)) {
        const error = {
            "status": 500,
            "message": "Veuillez remplir le champs 'numero de telephone'.",
            "errorType": "InvalidField",
            "field": "tel"
        };
        response.status(500).send(error);
        return;
    }
    const email = request.body.email;
    if (!checker.isInputValid(email, checker.IS_VALID_EMAIL)) {
        const error = {
            "status": 500,
            "message": "Veuillez remplir le champs 'email' de la forme 'abc@example.com'.",
            "errorType": "InvalidField",
            "field": "email"
        };
        response.status(500).send(error);
        return;
    }
    const adresse = request.body.adresse;
    if (!checker.isInputValid(adresse, checker.IS_EMPTY_STRING)) {
        const error = {
            "status": 500,
            "message": "Veuillez remplir le champs 'adresse'.",
            "errorType": "InvalidField",
            "field": "adresse"
        };
        response.status(500).send(error);
        return;
    }
    const numerocin = request.body.numerocin;
    if (!checker.isInputValid(numerocin, checker.IS_VALID_INTEGER)) {
        const error = {
            "status": 500,
            "message": "Veuillez remplir le champs 'Numero CIN'.",
            "errorType": "InvalidField",
            "field": "numerocin"
        };
        response.status(500).send(error);
        return;
    }
    const dateDelivrance = request.body.dateDelivrance;
    if (!checker.isInputValid(dateDelivrance, checker.IS_VALID_DATE)) {
        const error = {
            "status": 500,
            "message": "Veuillez remplir une date valide dans le champs 'date de delivrance'.",
            "errorType": "InvalidField",
            "field": "dateDelivrance"
        };
        response.status(500).send(error);
        return;
    }
    const lieuDelivrance = request.body.lieuDelivrance;
    if (!checker.isInputValid(nom, checker.IS_EMPTY_STRING)) {
        const error = {
            "status": 500,
            "message": "Veuillez remplir le champs 'Lieu de délivrance'.",
            "errorType": "InvalidField",
            "field": "lieuDelivrance"
        };
        response.status(500).send(error);
        return;
    }
    const login = request.body.login;
    if (!checker.isInputValid(login, checker.IS_EMPTY_STRING)) {
        const error = {
            "status": 500,
            "message": "Veuillez remplir le champs 'login'.",
            "errorType": "InvalidField",
            "field": "login"
        };
        response.status(500).send(error);
        return;
    }
    const mdp = request.body.mdp;
    if (!checker.isInputValid(nom, checker.IS_EMPTY_STRING)) {
        const error = {
            "status": 500,
            "message": "Veuillez remplir le champs 'mot de passe'.",
            "errorType": "InvalidField",
            "field": "mdp"
        };
        response.status(500).send(error);
        return;
    }
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
