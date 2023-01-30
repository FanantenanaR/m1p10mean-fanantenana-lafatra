var express = require('express');
var router = express.Router();

let facture = require('../services/factureservice');

router.get("/", (request, response) => {
  response.status(200).send("OK api-facture");
});

router.post("/listeVoiture", facture.voitureClient);

router.post("/depotVoiture", facture.depotClient);

router.post("/factureDepot", facture.factureDepotVoiture);

router.post("/payer", facture.insertDetailPaiement);

router.post("/allAboutPaiement", facture.proposPaiement);

router.get("/factureNonPayer", facture.paiementNonValide);

router.post("/factureDetail", facture.factureDetail);

router.post("/validationPaiement", facture.validePaiement);


router.post('/envoieMail', (req, res) => {
  var adm = new Client({
      email: req.body.email,
      mdp: req.body.mdp
  });
  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "eto ilay mail mpandefa", // generated ethereal user
        pass: "code any anaty securite mail", // generated ethereal password
      },
      tls: {
      rejectUnauthorized: false
      }
  });
  let info = transporter.sendMail({
      from: "", // sender address
      to:  req.body.email, // list of receivers
      subject: "Facture", // Subject line
      html: '<html>' +

      '</html>'

  });
  res.send('{"msg": "mail envoyer"}');

});

module.exports = router;
