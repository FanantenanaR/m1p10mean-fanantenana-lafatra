const Voiture = require('../model/voiture');
const checker = require("../helper/checker");
const Depot = require("../model/depot");
const Client = require('../model/client');
const Reparation = require('../model/reparation');

var ObjectID = require('mongodb').ObjectID;

const enregistrementDepot = (request, response) => {
  const plaque = request.body.plaque;

  const depositeurNom = request.body.nom;
  const depositeurPrenom = request.body.prenom;
  const depositeurTel = request.body.tel;
  const depositeurMail = request.body.email;

  const recepteurNom = request.body.rNom;
  const recepteurPrenom = request.body.rPrenom;
  const recepteurTel = request.body.rTel
  const recepteurMail = request.body.rMail;

  if(!checker.isInputValid(plaque, "String") || !checker.isInputValid(depositeurNom, "String") || !checker.isInputValid(depositeurPrenom, "String") || !checker.isInputValid(depositeurTel, "String") || !checker.isInputValid(depositeurMail, "String") || !checker.isInputValid(recepteurMail, "String")){
    const error = {
      "status": 500,
      "message": "Veuillez remplir les champs",
      "errorType": "MissingField"
    };
    response.status(500).send(error);
  }

  new Voiture().collection.find({ plaque: plaque }).toArray(function(err, result){
    if(err) throw err;
    if(result.length == 1){
      const newDepot = new Depot({
        "idVoiture": result[0]._id.toString(),
        "Depositeur": {
          "nom": depositeurNom,
          "prenom": depositeurPrenom,
          "tel": depositeurTel,
          "email": depositeurMail
        },
        "Recepteur": {
          "nom": recepteurNom,
          "prenom": recepteurPrenom,
          "tel": recepteurTel,
          "email": recepteurMail,
          "role": 0
        }
      });

      newDepot.save().then(() => {
        const valeur = {
          "status": 200,
          "message": "Saved successfully"
        };
        response.status(200).send(valeur);
      }).catch((e) =>{
        console.log(`Error in enregistrement depot ${e}`, e);
        response.status(500).send("There is an error");
      });

    }
    else{
      const error = {
        "status": 404,
        "messages": "La voiture n'a pas de proprietaire",
        "errorType": "Car not found"
      };
      response.status(404).send(error);
    }
  });
}

const historiqueVoiture = (request, response) => {
  new Depot().collection.find().toArray(function(error, result) {
    response.status(200).send(result);
    console.log(result);
  });
}

const historiqueVoitureClient = (request, response) => {
  const idClient = request.body.idClient;

  new Voiture().collection.find({ idClient: idClient }).toArray(function(err, result){
    result.forEach(data => {
      const idVoiture = data._id.toString();
      console.log(idVoiture);
      new Depot().collection.find({ idVoiture: idVoiture }).toArray(function(error, res){
        console.log(res);
        if(result.length == 0){
          return;
        }else{
          if(result.length == 0){
            return;
          }
          response.send(res);
        }

      });
    })
    //response.send("ok");
    // if(err) throw err;
    // if(result.length == 0){
    //   const message = {
    //     "status": 404,
    //     "message": "Aucune voiture à votre nom n'a été enregistrée."
    //   }
    //   response.status(404).send(message);
    // } else {
    //   const message = {
    //     "status": 200,
    //     "message": result
    //   }
    //   response.status(200).send(message);
    // }
  })
}

const listeVoiture = (request, response) => {
  new Voiture().collection.find().toArray(function(error, res){
    console.log(res);
    const message = {
      "status": 200,
      "message": res
    }
    response.status(200).send(message);
  })
}

const proprietaireVoiture = (request, response) => {
  const idVoiture = new ObjectID(request.body.idVoiture);


  new Voiture().collection.find({ "_id": idVoiture }).toArray(function(err, res){
    const idClient = new ObjectID(res[0].idClient);
    new Client().collection.find({ "_id": idClient }).toArray(function(error, result){
      const message = {
        "status": 200,
        "aboutVoiture": res,
        "aboutProprietaire": result
      }
      response.status(200).send(message);
    })
  })
}

//tsy miasa
const historiqueDepotEtReparation = (request, response) => {
  const idVoiture = request.body.idVoiture;
  new Depot().collection.find({ idVoiture: idVoiture }).toArray(function (error, result){
    result.forEach(data => {
      const idDepot = data._id.toString();
      console.log(idDepot);
      new Reparation().collection.find({ idDepot: idDepot }).toArray(function(err, res){
        if(result.length == 0){
          const message = {
            "status": 404,
            "message": "Cette voiture n'a pas été encore enregistrée."
          };
          response.status(404).send(message);
        } else {
          if(res.length == 0){
            const message = {
              "status": 404,
              "message": "Cette voiture n'a pas été encore entamée une réparation."
            }
          } else {
            const message = {
              "status": 200,
              "depot": result,
              "reparation": res
            };
            response.status(200).send(message);
          }
        }
      })
    });
  });
}

const historiqueReparation = (request, response) => {
  const idVoiture = request.body.idVoiture;
  new Reparation().collection.find({ idVoiture: idVoiture }).toArray(function(err, res){
    if(res.length == 0){
      const message = {
        "status": 404,
        "message": "Cette voiture n'a pas été encore entamée une réparation."
      }
      response.status(404).send(message);
    } else {
      const message = {
        "status": 200,
        "message": res
      }
      response.status(200).send(message);
    }
  })
}

module.exports = {
  enregistrementDepot,
  historiqueVoiture,
  historiqueVoitureClient,
  listeVoiture,
  historiqueReparation,
  proprietaireVoiture
}
