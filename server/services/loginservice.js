const checker = require('../helper/checker')
const Client = require('../model/client');
const Personnel = require('../model/personnel');
const bcrypt = require('bcryptjs');

/**
  * express login client côté
*/
const traitementLoginClient = (request, response) => {
  const login = request.body.login;
  const mdp = request.body.mdp;

  if(!checker.isInputValid(login, "String") || !checker.isInputValid(mdp, "String")){
    const error = {
      "status": 500,
      "message": "Veuillez remplir les champs",
      "errorType": "MissingField"
    };
    response.status(500).send(error);
    return;
  }

  try {
    Client
    .findOne({login: login}, (errorFind, resultat) => {
      if(errorFind) {
        console.log(errorFind)
        const errorObj = {
          "status": 404,
          "messages": "Une erreur s'est produite. Veuillez reesayer plus tard.",
          "errorType": "LoginException"
        };
        response.status(404).send(errorObj);
        return;
      }
      bcrypt.compare(mdp, resultat.password, (errorCheck, isMatch) => {
        if (errorCheck) {
          console.log("error check", errorCheck);
          const errorObj = {
            "status": 404,
            "messages": "Login ou mot de passe introuvable.",
            "errorType": "UserNotFound"
          };
          response.status(404).send(errorObj);
          return;
        }
        if (isMatch) {
          const data = resultat;
          data.password = undefined;
          response.status(200).send(data);
        } else {
          const errorObj = {
            "status": 404,
            "messages": "Login ou mot de passe introuvable.",
            "errorType": "UserNotFound"
          };
          response.status(404).send(errorObj);
          return;
        }
      });
    })

  } catch (error) {
    console.log(error)
    const errorContent = {
      "status": 404,
      "messages": error,
      "errorType": "Data not found"
    };
    response.status(404).send(errorContent);
    return;
  }


}

/*
* express login responsable
*/
const traitementLoginPersonnel = (request, response) => {
  const login = request.body.login;
  const mdp = request.body.mdp;

  if(!checker.isInputValid(login, "String") || !checker.isInputValid(mdp, "String")){
    const error = {
      "status": 500,
      "message": "Veuillez remplir les champs",
      "errorType": "MissingField"
    };
    response.status(500).send(error);
    return;
  }

  Personnel.findOne({login: login}, (errorFind, resultat) => {
    if(errorFind) {
      console.log(errorFind)
      const errorObj = {
        "status": 404,
        "messages": "Une erreur s'est produite. Veuillez reesayer plus tard.",
        "errorType": "LoginException"
      };
      response.status(404).send(errorObj);
      return;
    }
    bcrypt.compare(mdp, resultat.password, (errorCheck, isMatch) => {
      if (errorCheck) {
        console.log("error check", errorCheck);
        const errorObj = {
          "status": 404,
          "messages": "Login ou mot de passe introuvable.",
          "errorType": "UserNotFound"
        };
        response.status(404).send(errorObj);
        return;
      }
      if (isMatch) {
        const data = resultat;
        data.password = undefined;
        response.status(200).send(data);
      } else {
        const errorObj = {
          "status": 404,
          "messages": "Login ou mot de passe introuvable.",
          "errorType": "UserNotFound"
        };
        response.status(404).send(errorObj);
        return;
      }
    });

  });
}

module.exports = {
  traitementLoginClient,
  traitementLoginPersonnel
}
