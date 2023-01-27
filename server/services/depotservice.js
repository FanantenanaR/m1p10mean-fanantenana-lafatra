const Voiture = require('../model/voiture');
const checker = require("../helper/checker");
const Depot = require("../model/depot");
const Personnel = require('../model/personnel');

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

      // response.send(result[0]._id.toString());
      // console.log(result[0]._id.toString());

      //response.status(200).send(valeur);
      //idVoiture = result[0]._id;
      //response.send(depositeurNom);

      /*new Personnel().collection.find({ Recepteur:{email: recepteurMail} }).toArray(function(error, results) {
        if(error) throw error;
        if(results.length == 1){
          // const newDepot = new Depot({
          //   "idVoiture": result[0]._id,
          //   "Depositeur": {
          //     "nom": depositeurNom,
          //     "prenom": depositeurPrenom,
          //     "tel": depositeurTel,
          //     "email": depositeurMail
          //   },
          //   "Recepteur": {
          //     "nom": results[0].nom,
          //     "prenom": results[0].prenom,
          //     "tel": results[0].tel,
          //     "email": results[0].email,
          //     "role": results[0].role
          //   }
          // });
          // newDepot.save().then(() => {
          //   response.status(200).send("Saved successfully");
          // }).catch((e) =>{
          //   console.log(`Error in inscrire ${e}`, e);
          //   response.status(500).send("There is an error");
          // })
          response.status(200).send(results);
        }
      })*/

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

const vehiculeDepose = (request, response) => {

}

module.exports = {
  enregistrementDepot,
  vehiculeDepose
}
