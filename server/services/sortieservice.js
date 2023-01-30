const Depot = require("../model/depot");
const Facture = require("../model/facture");
const Reparation = require("../model/reparation");
const Sortie = require("../model/sortie");
const Voiture = require("../model/voiture");

var ObjectID = require('mongodb').ObjectID;

const voitureDeposee = (request, response) => {
  new Depot().collection.find({"etat": 0}).toArray((err, res) => {
    if(res.length == 0){
      const valeur = {
        "status": 500,
        "message": "Aucune voiture déposée"
      }
      response.status(500).send(valeur);
    } else {
      const valeur = {
        "status": 200,
        "message": res
      }
      response.status(200).send(valeur);
    }
  })
}

const getDetailDepotFacture = (request, response) => {
  const idDepot = request.body.idDepot;
  new Depot().collection.findOne({ "_id": new ObjectID(idDepot) }, (errorDepot, resultDepot) => {
    console.log(resultDepot);
    new Facture().collection.findOne({ "idDepot": idDepot }, (errorDepot, resultFacture) => {
      console.log(resultDepot);
      new Voiture().collection.findOne({ "_id": new ObjectID(resultDepot.idVoiture) }, (errorVoiture, resultVoiture) => {
        const message = {
          "status": 200,
          "depot": resultDepot,
          "facture": resultFacture,
          "voiture": resultVoiture
        };
        response.status(200).send(message);
      })

    })
  })
}

const validationSortie = (request, response) => {
  const idDepot = request.body.idDepot;
  new Depot().collection.findOneAndUpdate(
    {"_id": new ObjectID(idDepot)},
    {$set: {"etat": 5}},
    {upsert: true}
  ).then(res => {
    const idVoiture = res.value.idVoiture;
    const pNom = request.body.pNom;
    const pPrenom = request.body.pPrenom;
    const pTel = request.body.pTel;
    const rNom = request.body.rNom;
    const rPrenom = request.body.rPrenom;
    const rTel = request.body.rTel;
    const rEmail = request.body.rEmail;

    new Facture().collection.findOne({"idDepot": idDepot}, (error, result) => {
      if(error) throw error;
      if(result){
        const idFacture = result._id.toString();
        const newSortie = new Sortie({
          "idVoiture": idVoiture,
          "preneur": {
            "nom": pNom,
            "prenom": pPrenom,
            "tel": pTel
          },
          "responsable": {
            "nom": rNom,
            "prenom": rPrenom,
            "tel": rTel,
            "email": rEmail
          },
          "idfacture": idFacture
        });
        console.log(idFacture);
        newSortie.save().then(() => {
          const valeur = {
            "status": 200,
            "message": "Saved successfully"
          };
          response.status(200).send(valeur);
        })
      } else {
        const newSortie = new Sortie({
          "idVoiture": idVoiture,
          "preneur": {
            "nom": pNom,
            "prenom": pPrenom,
            "tel": pTel
          },
          "responsable": {
            "nom": rNom,
            "prenom": rPrenom,
            "tel": rTel,
            "email": rEmail
          }
        });
        newSortie.save().then(() => {
          const valeur = {
            "status": 200,
            "message": "Saved successfully"
          };
          response.status(200).send(valeur);
        })
      }
    })
  }).catch(err => console.log(err));

}

module.exports = {
  voitureDeposee,
  getDetailDepotFacture,
  validationSortie
}

