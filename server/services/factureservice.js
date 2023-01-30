const { request } = require("express");
const Depot = require("../model/depot");
const Facture = require("../model/facture");
const Voiture = require("../model/voiture");
const checker = require("../helper/checker");
const Paiement = require("../model/paiement");
const Client = require("../model/client");

var ObjectID = require('mongodb').ObjectID;

const voitureClient = (request, response) => {
  idClient = request.body.idClient;

  new Voiture().collection.find({ idClient: idClient }).toArray(function(err, result){
    // console.log(result);
    // response.send("ok");
    if(err) throw err;

    if(result.length == 0){
      const message = {
        "status": 404,
        "message": "Aucune voiture à votre nom n'a été enregistrée."
      }
      response.status(404).send(message);
    } else {
      const message = {
        "status": 200,
        "message": result
      }
      response.status(200).send(message);
      console.log(result);
    }
  })
}

const depotClient = (request, response) => {
  idVoiture = request.body.idVoiture;

  new Depot().collection.find({ idVoiture: idVoiture }).toArray(function(err, result){
    if(err) throw err;

    if(result.length == 0){
      const message = {
        "status": 404,
        "message": "Aucune voiture à votre nom n'a été enregistrée."
      }
      response.status(404).send(message);
    } else {
      const message = {
        "status": 200,
        "message": result
      }
      response.status(200).send(message);
    }
  })
}

const factureDepotVoiture = (request, response) => {
  const idDepot = request.body.idDepot;

  new Facture().collection.find({ idDepot: idDepot }).toArray(function(err, result){
    if(err) throw err;

    if(result.length == 0){
      const message = {
        "status": 404,
        "message": "Aucune voiture à votre nom n'a été enregistrée."
      }
      response.status(404).send(message);
    } else {
      new Voiture().collection.find({ "_id": new ObjectID(result[0].idVoiture) }).toArray(function(error, res){
        new Depot().collection.find({ "_id": new ObjectID(idDepot) }).toArray(function(e, r){
          const message = {
            "status": 200,
            "proposVoiture": res,
            "proposDepot": r,
            "message": result
          }
          response.status(200).send(message);
        })
      })
    }
  })
}

const insertDetailPaiement = (request, response) => {
  const montant = request.body.montant;
  const idPersonnel = request.body.idPersonnel;
  const idFacture = request.body.idFacture;

  if(!checker.isInputValid(montant)){
    const error = {
      "status": 500,
      "message": "Veuillez mettre le montant à payer",
      "errorType": "MissungField"
    }
    response.status(500).send(error);
  }

  new Paiement().collection.find({ idFacture: idFacture }).toArray(function(error, result){
    new Facture().collection.find({ "_id": new ObjectID(idFacture) }).toArray(function(err, res){
      if(error) throw error;
      if(result.length == 0){
        etat = 0;
        if(res[0].total <= montant){
          etat = 5;
        }
        const newPaiement = new Paiement({
          "idFacture": idFacture,
          "montantTotal": res[0].total,
          "details":[{
            "montant": montant,
            "idPersonnel": idPersonnel
          }],
          "etat": etat
        });

        newPaiement.save().then(() => {
          const valeur = {
            "status": 200,
            "message": "Saved successfully"
          };
          response.status(200).send(valeur);
        }).catch((e) => {
          console.log(`Error in paiement ${e}`, e);
          response.status(500).send("There is an error");
        })
      } else {
        const element = {
          montant: montant,
          idPersonnel: idPersonnel,
          dateHeure: new Date()
        };

        new Paiement().collection.updateOne({ idFacture :result[0].idFacture }, { $push: { details: element } },
        (error) => {
          if(error) {
            response.send(error);
          } else {
            console.log(element);
            response.send('Ajout réussi');
          }
        } )
      }
    })
  })
}

const proposPaiement = (request, response) => {
  const idFacture = request.body.idFacture;
  new Paiement().collection.find({ "idFacture": idFacture }).toArray((errorPaie, resultPaie) => {
    if(errorPaie) throw errorPaie;
    if(resultPaie.length == 0){
      return;
    }
    console.log(resultPaie);
    const idFacture = resultPaie[0].idFacture;
    new Facture().collection.find({ "_id": new ObjectID(idFacture) }).toArray((errorFacture, resultFacture) => {
      if(errorFacture) throw errorFacture;
      if(resultFacture.length == 0){
        return;
      }
      console.log(resultFacture);
      const idVoiture = resultFacture[0].idVoiture;
      const idClient = resultFacture[0].idClient;
      new Voiture().collection.findOne({ "_id": new ObjectID(idVoiture) }, (errorVoiture, resultVoiture) => {
        if(errorVoiture) throw errorVoiture;
        if(resultVoiture.length == 0){
          return;
        }
        console.log(resultVoiture);
        new Client().collection.findOne({ "_id": new ObjectID(idClient) }, (errorClient, resultClient) => {
          if(errorClient) throw errorClient;
          console.log(resultClient);

          const valeur = {
            "status": 200,
            "paiement": resultPaie,
            "facture": resultFacture,
            "voiture": resultVoiture,
            "client": resultClient
          };
          response.status(200).send(valeur);

        })
      })
    })
  })
}

const paiementNonValide = (request, response) => {
  new Facture().collection.find({ "etat": 0 }).toArray(function(errorPaie, resultPaie){
    if(errorPaie) throw errorPaie;
    console.log(resultPaie);
    response.status(200).send(resultPaie);
  })
}

const factureDetail = (request, response) => {
  const idFacture = request.body.idFacture;
  new Facture().collection.findOne({ "_id": new ObjectID(idFacture) }, (error, result) => {
    console.log(result);
    response.status(200).send(result);
  })
}

const validePaiement = (request, response) => {
  const idPaiement = request.body.idPaiement;

  new Paiement().collection.findOneAndUpdate(
    { "_id": new ObjectID(idPaiement) },
    { $set: {"etat": 5} },
    { upsert: true }
  ).then(result => {
    console.log(result.value.idFacture);
    new Facture().collection.findOneAndUpdate(
      {"_id": new ObjectID(result.value.idFacture)},
      {$set: {"etat": 5}},
      {upsert: true}
    ).then(res => {
      console.log(res);
      response.send("ok");
    }).catch(err => console.log(err));
  }).catch(error => console.log(error));
}


module.exports = {
  voitureClient,
  depotClient,
  factureDepotVoiture,
  insertDetailPaiement,
  proposPaiement,
  paiementNonValide,
  factureDetail,
  validePaiement
}
