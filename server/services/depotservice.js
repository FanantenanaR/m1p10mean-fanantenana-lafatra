const Voiture = require('../model/voiture');
const checker = require("../helper/checker");
const Depot = require("../model/depot");


const Personnel = require('../model/personnel');
const ObjectID = require('mongoose').Schema.Types.ObjectId;

const Client = require('../model/client');
const Reparation = require('../model/reparation');
const depotWorker = require("../function/depotworker");
const moment = require('moment');

const async = require('async');
const Facture = require('../model/facture');

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
      const idVoit = result[0]._id.toString();
      new Depot().collection.find({idVoiture: idVoit, etat: 0}).toArray((errorDepot, result) => {
        if (errorDepot) {
          throw errorDepot;
        }
        if (result.length > 0) {
          const messageError = {
            "status": 500,
            "message": "Vehicule déjà déposé.",
            "errorType": "DataAlreadyIn"
          };
          response.status(500).send(messageError);
          return;
        }
        const newDepot = new Depot({
          "idVoiture": idVoit,
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


      })


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

const detailsDepot = (request, response) => {
  const idDepot = request.body.idDepot;
  Depot.findById(idDepot, (errorFind, resultatDepot) => {
    if (errorFind || !resultatDepot) {
      const messageError = {
        "status": 500,
        "message": "Une erreur s'est produite",
        "errorType": "ErrorServer"
      }
      response.status(500).send(messageError);
      return;
    }
    Reparation.find({
      idDepot: idDepot,
      dateCommencement: {
        $ne: null
      }
    }, (errorReparation, resultatReparation) => {
      let sommeAvancement = 0;
      let sommeTempsReparation = 0;
      let nombreTemps = 0;
      console.log(resultatReparation);
      resultatReparation.forEach((reparation) => {
        sommeAvancement += reparation.avancement;
        if (reparation.dateFin !== null) {
          const difference = moment.duration(moment(reparation.dateFin).diff(moment(reparation.dateCommencement)));
          sommeTempsReparation += difference.hours();
          nombreTemps += 1;
        }
      });

      Voiture.findById(resultatDepot.idVoiture, (errorFind, resultatVoiture) => {
        const resultatFinal = {
          "depot": resultatDepot,
          "sommeAvancement": sommeAvancement,
          "moyenneAvancement": sommeAvancement === 0 ? 0 : sommeAvancement / resultatDepot.length,
          "sommeTempsReparation": sommeTempsReparation,
          "moyenneAvancement": sommeTempsReparation === 0 ? 0 : sommeTempsReparation / nombreTemps,
          "voiture": resultatVoiture
        };
        response.status(200).send(resultatFinal);
        return;
      })
    })
  } )
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

const vehiculeDepose = (request, response) => {
  Depot.find({
    etat: 0
  }, async (errorFind, resultatDepot) => {
    if (errorFind) {
      const messageError = {
        "status": 500,
        "message": "Une erreur s'est produite.",
        "errorType": "ErrorServer"
      }
      response.status(500).send(messageError);
      return;
    }
    if (resultatDepot) {
      let tableau = resultatDepot;
      let resultat = [];
      for (let depot of tableau) {
        console.log("entered in", depot);
        const voiture = await Voiture.findById(depot.idVoiture);
        const client = await Client.findById(voiture.idClient);
        client.password = null;
        const addMe = {
          _id: depot._id,
          Depositeur: depot.Depositeur,
          Recepteur: depot.Recepteur,
          etat: depot.etat,
          dateHeure: depot.dateHeure,
          idVoiture: depot.idVoiture,
          voiture: voiture,
          client: client,
          __v: depot.__v
        }
        resultat.push(addMe);
      }
      response.status(200).send(resultat);
      return;
    } else {
      response.status(200).send([]);
    }

  })
}

const ajouterVehicule = (request, response) => {
  const clientID = request.body.idclient;
  const plaque = request.body.plaque;
  const marque = request.body.marque;
  const modele = request.body.modele;

  if(!checker.isInputValid(plaque, "String") || !checker.isInputValid(clientID, "String") || !checker.isInputValid(marque, "String") || !checker.isInputValid(modele, "String")){
    const error = {
      "status": 500,
      "message": "Veuillez remplir les champs",
      "errorType": "MissingField"
    };
    response.status(500).send(error);
  }

  Voiture.findOne({"plaque": plaque}, (error, resultat) => {
    if(error) {
      const errorSend = {
        "status": 500,
        "message": "Erreur durant le saisi",
        "errorType": "Error finding any vehicule"
      };
      response.status(500).send(errorSend);
    }
    if (resultat) {
      const errorSend = {
        "status": 500,
        "message": resultat.idClient === clientID ? "Voiture déjà ajouté." : "Véhicule déjà enregistré sous un autre propriétaire.",
        "errorType": "ExistingUser"
      };
      response.status(500).send(errorSend);
    } else {
      const addMe = new Voiture({
        "idClient": clientID,
        "marque": marque,
        "modele": modele,
        "plaque": plaque
      });

      addMe.save().then(() => {
       const success = {
        "status": 200,
        "message": "Véhicule ajouté avec success.",
       };
       response.status(200).send(success);
      }).catch((errorSave) => {
        console.log("Save error", errorSave);
        const errorMessageSave = {
          "status": 500,
          "message": "Un erreur s'est produite.",
          "errorType": "ErrorDuringSave",
        };
        response.status(500).send(errorMessageSave);
      });

    }

  });
}

const ajouterReparation = (request, response) => {
  try {
    const aReparer = request.body.aReparer;
    const idDepot = request.body.idDepot;
    const prixAPayer = request.body.prix;
    const updateIfExist = request.body.updateIfExist !== undefined && (request.body.updateIfExist === "true");
    if (!checker.isInputValid(aReparer, checker.IS_EMPTY_STRING)) {
      const errorMessage = {
        "status": 500,
        "message": "Veuillez remplir le champs libelle de la réparation (à réparer).",
        "errorType": "InvalidField"
      };
      response.status(500).send(errorMessage);
      return;
    }

    if (!checker.isInputValid(idDepot, checker.IS_EMPTY_STRING)) {
      const errorMessage = {
        "status": 500,
        "message": "Champs manquant concernant le dépot.",
        "errorType": "InvalidField"
      };
      response.status(500).send(errorMessage);
      return;
    }
    if (!checker.isInputValid(prixAPayer, checker.IS_VALID_NUMBER)) {
      const errorMessage = {
        "status": 500,
        "message": "Veuillez remplir le champs prix à payer (et doit être supérieur ou égale à 0).",
        "errorType": "InvalidField"
      };
      response.status(500).send(errorMessage);
      return;
    }
    Depot.findOne({_id: idDepot}, (errorFindDepot, resultatDepot) => {
      if (errorFindDepot) {
        const errorMessage = {
          "status": 500,
          "message": "Une erreur s'est produite. Les details sur le dépot est introuvable.",
          "errorType": "ErrorDuringFind"
        };
        response.status(500).send(errorMessage);
        return;
      }
      if (resultatDepot) {
        if (resultatDepot.etat === 5 && !updateIfExist) {
          const errorMessage = {
            "status": 500,
            "message": "Dépot déjà terminé.",
            "errorType": "ErrorLogic"
          };
          response.status(500).send(errorMessage);
          return;
        }
        if (updateIfExist) {
          Reparation.findOneAndUpdate({
            idDepot: idDepot,
            idVoiture: resultatDepot.idVoiture,
            aReparer: aReparer
          }, {
            $inc: {
              prixAPayer: prixAPayer
            },
            $set: {
              etat: 0,
              dateFin: null
            }
          }, {
            upsert: true,
            returnDocument: true
          }, (errorUpdateInsert, resultat) => {
            if (errorUpdateInsert) {
              console.log(errorUpdateInsert)
              const errorMessage = {
                "status": 500,
                "message": "Erreur durant l'ajout de la réparation.",
                "errorType": "ErrorLogic"
              };
              response.status(500).send(errorMessage);
              return;
            }
            if (resultat) {
              Reparation.findByIdAndUpdate(resultat._id, {
                $set: {
                  avancement: resultat.avancement/2
                }
              }, (errorUpdateAvancement, resultat) => {
                if (errorUpdateAvancement) {
                  console.log(errorUpdateAvancement)
                  const errorMessage = {
                    "status": 500,
                    "message": "Erreur durant la mise à jour de l'avancement de la réparation.",
                    "errorType": "ErrorLogic"
                  };
                  response.status(500).send(errorMessage);
                  return;
                }
                console.log(resultat);
                const successMessage = {
                  "status": 200,
                  "message": "Mise à jour réparation fait avec succes."
                };
                response.status(200).send(successMessage);
                return;
              })
            }
            else {
              const successMessage = {
                "status": 200,
                "message": "Ajout réparation fait avec succes."
              };
              response.status(200).send(successMessage);
              return;
            }


          })
        } else {

          Reparation.findOne({
            idDepot: idDepot,
            idVoiture: resultatDepot.idVoiture,
            aReparer: aReparer,
          }, (errorFind, resultatReparation) => {
            if (errorFind) {
              console.log("find reparation", errorFind);
              const errorMessage = {
                "status": 500,
                "message": "Erreur durant l'ajout de la réparation.",
                "errorType": "ErrorServer"
              };
              response.status(500).send(errorMessage);
              return;
            }
            if (resultatReparation) {
              const errorMessage = {
                "status": 500,
                "message": "Erreur durant l'ajout de la réparation. Valeur similaire déjà enregistré.",
                "errorType": "ErrorDuplicate"
              };
              response.status(500).send(errorMessage);
              return;
            } else {
              const addMe = new Reparation({
                idDepot: idDepot,
                idVoiture: resultatDepot.idVoiture,
                aReparer: aReparer,
                prixAPayer: prixAPayer,
                avancement: 0
              });
              addMe.save().then(() => {
                Voiture.findById(resultatDepot.idVoiture, (errorFindVoiture, resultatVoiture) => {
                  if (errorFindVoiture) {
                    const errorMessage = {
                      "status": 500,
                      "message": "Une erreur s'est produite (voiture).",
                      "errorType": "ErrorDuplicate"
                    };
                    response.status(500).send(errorMessage);
                    return;
                  }
                  Reparation.find({idDepot: idDepot}, (errorFindReparation, resultatReparation) => {
                    if (errorFindReparation) {
                      const errorMessage = {
                        "status": 500,
                        "message": "Une erreur s'est produite (reparation).",
                        "errorType": "ErrorDuplicate"
                      };
                      response.status(500).send(errorMessage);
                      return;
                    }
                    let tableauDetailsFacture = [];
                    let totalPrix = 0;
                    resultatReparation.forEach((reparation) => {
                      tableauDetailsFacture.push({
                        libelle: reparation.aReparer,
                        prix: reparation.prixAPayer
                      });
                      totalPrix += parseInt(reparation.prixAPayer);
                    });
                    const addFacture = new Facture({
                      idClient: resultatVoiture.idClient,
                      idVoiture: resultatDepot.idVoiture,
                      idDepot: idDepot,
                      detailFacture: tableauDetailsFacture,
                      total: totalPrix
                    })
                    addFacture.save().then(() => {
                      const successMessage = {
                        "status": 200,
                        "message": "Ajout réparation fait avec succes."
                      }
                      response.status(200).send(successMessage);
                      return;
                    }).catch((errorFacture) => {

                    });

                  } )
                });
              }).catch((errorSave) => {
                console.log("find reparation", errorSave);
                const errorMessage = {
                  "status": 500,
                  "message": "Erreur durant l'ajout de la réparation.",
                  "errorType": "ErrorServer"
                };
                response.status(500).send(errorMessage);
                return;
              })
            }
          })

        }
      } else {
        const errorMessage = {
          "status": 500,
          "message": "Une erreur s'est produite. Les details sur le dépot est introuvable.",
          "errorType": "ErrorDuringFind"
        };
        response.status(500).send(errorMessage);
        return;
      }
    });

  } catch (errorCatched) {
    const errorMessage = {
      "status": 500,
      "message": "Une erreur s'est produite.",
      "errorType": "ErrorCatched"
    };
    response.status(500).send(errorMessage);
    return;
  }



}

const assignerReparation = (request, response) => {
  // TODO Update, assigner personne to reparation
  const idResponsable = request.body.idResponsable;
  const idReparation = request.body.idReparation;

  if (!checker.isInputValid(idResponsable, checker.IS_EMPTY_STRING)) {
    const errorMessage = {
      "status": 500,
      "message": "Information importante manquant.",
      "errorType": "InvalidField"
    };
    response.status(500).send(errorMessage);
    return;
  }

  if (!checker.isInputValid(idReparation, checker.IS_EMPTY_STRING)) {
    const errorMessage = {
      "status": 500,
      "message": "Information importante manquant.",
      "errorType": "InvalidField"
    };
    response.status(500).send(errorMessage);
    return;
  }

  Personnel.findOne({_id: idResponsable}, (errorFind, resultat) => {
    if (errorFind) {
      const messageError = {
        "status": 500,
        "message": "Utilisateur introuvable.",
        "errorType": "ResultNotFound"
      };
      response.status(500).send(messageError);
      return;
    }
    Reparation.findOneAndUpdate({_id: idReparation}, {
      "Responsable": {
        nom: resultat.nom,
        prenom: resultat.prenom,
        tel: resultat.tel,
        email: resultat.email
      }
    }, (errorUpdateFind, resultatUpdate) => {
      if (errorUpdateFind) {
        console.log("error during update find ", errorUpdateFind)
        const messageErrorUpdate = {
          "status": 500,
          "message": "Erreur durant la mise à jour",
          "errorType": "ErrorUpdate",
        }
        response.status(500).send(messageErrorUpdate);
      }
      console.log("resultat update", resultatUpdate);
      const reponseSuccess = {
        "status": 200,
        "message": "Mise à jour avec succes"
      }
      response.status(200).send(reponseSuccess);
    })
  });
};

const listerReparation = (request, response) => {
  const idDepot = request.body.idDepot;
  if (!checker.isInputValid(idDepot, checker.IS_EMPTY_STRING)) {
    const errorMessage = {
      "status": 500,
      "message": "Champs obligatoire introuvable.",
      "errorType": "InvalidField"
    };
    response.status(500).send(errorMessage);
    return;
  }

  Reparation.find({
    idDepot: idDepot
  }, (errorFind, resultat) => {
    if (errorFind) {
      console.log("Update entamer reparation",errorFind);
      const errorMessage = {
        "status": 500,
        "message": "Une erreur s'est produite.",
        "errorType": "ErrorServer"
      };
      response.status(500).send(errorMessage);
      return;
    }
    response.status(200).send(resultat);
  });
}

const listerReparationNonEntamer = (request, response) => {
  const idDepot = request.body.idDepot;
  if (!checker.isInputValid(idDepot, checker.IS_EMPTY_STRING)) {
    const errorMessage = {
      "status": 500,
      "message": "Champs obligatoire introuvable.",
      "errorType": "InvalidField"
    };
    response.status(500).send(errorMessage);
    return;
  }

  Reparation.find({
    idDepot: idDepot,
    dateCommencement: null
  }, (errorFind, resultat) => {
    if (errorFind) {
      console.log("Update entamer reparation",errorFind);
      const errorMessage = {
        "status": 500,
        "message": "Une erreur s'est produite.",
        "errorType": "ErrorServer"
      };
      response.status(500).send(errorMessage);
      return;
    }
    response.status(200).send(resultat);
  });
}

const listerReparationEncours = (request, response) => {
  const idDepot = request.body.idDepot;
  if (!checker.isInputValid(idDepot, checker.IS_EMPTY_STRING)) {
    const errorMessage = {
      "status": 500,
      "message": "Champs obligatoire introuvable.",
      "errorType": "InvalidField"
    };
    response.status(500).send(errorMessage);
    return;
  }

  Reparation.find({
    idDepot: idDepot,
    dateCommencement: {
      $ne: null
    },
    etat: 0
  }, (errorFind, resultat) => {
    if (errorFind) {
      console.log("Update entamer reparation",errorFind);
      const errorMessage = {
        "status": 500,
        "message": "Une erreur s'est produite.",
        "errorType": "ErrorServer"
      };
      response.status(500).send(errorMessage);
      return;
    }
    response.status(200).send(resultat);
  });
}

const listerReparationTermine = (request, response) => {
  const idDepot = request.body.idDepot;
  if (!checker.isInputValid(idDepot, checker.IS_EMPTY_STRING)) {
    const errorMessage = {
      "status": 500,
      "message": "Champs obligatoire introuvable.",
      "errorType": "InvalidField"
    };
    response.status(500).send(errorMessage);
    return;
  }

  Reparation.find({
    idDepot: idDepot,
    etat: 5,
  }, (errorFind, resultat) => {
    if (errorFind) {
      console.log("Update entamer reparation",errorFind);
      const errorMessage = {
        "status": 500,
        "message": "Une erreur s'est produite.",
        "errorType": "ErrorServer"
      };
      response.status(500).send(errorMessage);
      return;
    }
    response.status(200).send(resultat);
  });
}

const entamerReparation = (request, response) => {
  try {
    const idReparation = request.body.idReparation;
    if (!checker.isInputValid(idReparation, checker.IS_EMPTY_STRING)) {
      const errorMessage = {
        "status": 500,
        "message": "Champs obligatoire introuvable.",
        "errorType": "InvalidField"
      };
      response.status(500).send(errorMessage);
      return;
    }
    Reparation.findByIdAndUpdate(idReparation, {
      dateCommencement: Date.now()
    }, (errorUpdate, result) => {
      if (errorUpdate) {
        console.log("Update entamer reparation",errorUpdate);
        const errorMessage = {
          "status": 500,
          "message": "Une erreur s'est produite.",
          "errorType": "ErrorServer"
        };
        response.status(500).send(errorMessage);
        return;
      }
      if (result) {
        const successMessage = {
          "status": 200,
          "message": "Mise à jour avec succès.",
        };
        response.status(200).send(successMessage);
        return;
      } else {
        const errorMessage = {
          "status": 500,
          "message": "Réparation introuvable.",
          "errorType": "DataNotFound"
        };
        response.status(500).send(errorMessage);
        return;
      }


    })
  } catch (errorEntamer) {
    console.log("error in entamer", errorEntamer);
    const errorMessage = {
      "status": 500,
      "message": "Une erreur s'est produite.",
      "errorType": "ErrorServer"
    };
    response.status(500).send(errorMessage);
    return;
  }

};

const updateAvancementReparation = (request, response) => {
  const idReparation = request.body.idReparation;
  const avancement = request.body.avancement;


  if (!checker.isInputValid(idReparation, checker.IS_EMPTY_STRING)) {
    const errorMessage = {
      "status": 500,
      "message": "Champs obligatoire invalide ou introuvable.",
      "errorType": "InvalidField"
    };
    response.status(500).send(errorMessage);
    return;
  }

  if (!checker.isInputValid(avancement, checker.IS_VALID_NUMBER) && avancement >= 0) {
    const errorMessage = {
      "status": 500,
      "message": "Champs avancement invalide.",
      "errorType": "InvalidField"
    };
    response.status(500).send(errorMessage);
    return;
  }

  const etat = parseInt(avancement) === 100 ? 5 : 0;
  let updateMe = {
    avancement: avancement,
    etat: etat
  }
  if (etat === 5) {
    updateMe = {
      avancement: avancement,
      etat: etat,
      dateFin: Date.now()
    };
  }
  Reparation.findByIdAndUpdate(idReparation, updateMe, (errorUpdate, result) => {
    if (errorUpdate) {
      console.log("error update avancement", errorUpdate);
      const errorMessage = {
        "status": 500,
        "message": "Un erreur s'est produite.",
        "errorType": "ErrorServer"
      };
      response.status(500).send(errorMessage);
      return;
    }
    if (result) {
      // Hita ilay updatena
      const successMessage = {
        "status": 200,
        "message": "Mise à jour réussi."
      };
      response.status(200).send(successMessage);
    } else {
      const failedMessage = {
        "status": 500,
        "message": "Mise à jour échoué.",
        "errorType": "DataNotFound"
      };
      response.status(500).send(failedMessage);
    }
  })


}

const mesVehicule = (request, response) => {
  // TODO get la liste de mes voitures (client)
}

const suiviReparation = (request, response) => {
  // TODO afficher les reparations d'un vehicule
}

const getResponsable = (request, response) => {
  Personnel.find((error, resultat) => {
    if (error) {
      console.log(error);
      const errorMessage = {
        "status": 500,
        "message": "Champs obligatoire invalide ou introuvable.",
        "errorType": "InvalidField"
      };
      response.status(500).send(errorMessage);
      return;
    }
    response.status(200).send(resultat);
  });
}

module.exports = {
  enregistrementDepot,
  historiqueVoiture,
  historiqueVoitureClient,
  listeVoiture,
  historiqueReparation,
  proprietaireVoiture,
  assignerReparation,
  vehiculeDepose,
  ajouterVehicule,
  ajouterReparation,
  listerReparation,
  listerReparationNonEntamer,
  updateAvancementReparation,
  mesVehicule,
  suiviReparation,
  entamerReparation,
  getResponsable,
  listerReparationEncours,
  listerReparationTermine,
  detailsDepot
}
