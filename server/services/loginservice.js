const checker = require('../helper/checker')
const Client = require('../model/client');
const Personnel = require('../model/personnel');

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
  }

  console.log("login = "+login);
  console.log("mdp = "+mdp);

  new Client().collection.find({login: login, password: mdp}).toArray(function(err, result){
    //if(err) throw err;
    if(result.length == 1){
      const valeur = {
        "status": 200,
        "message": result
      };
      response.status(200).send(valeur);
    }
    else{
      const error = {
        "status": 404,
        "messages": "Les valeurs n'existent pas",
        "errorType": "Data not found"
      };
      response.status(404).send(error);
    }

  });
}

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
  }

  console.log("login = "+login);
  console.log("mdp = "+mdp);

  new Personnel().collection.find({login: login, password: mdp}).toArray(function(err, result){
    if(err) throw err;
    if(result.length == 1){
      const valeur = {
        "status": 200,
        "message": result
      };
      response.status(200).send(valeur);
    }
    else{
      const error = {
        "status": 404,
        "messages": "Les valeurs n'existent pas",
        "errorType": "Data not found"
      };
      response.status(404).send(error);
    }
  });
}

module.exports = {
  traitementLoginClient,
  traitementLoginPersonnel
}
