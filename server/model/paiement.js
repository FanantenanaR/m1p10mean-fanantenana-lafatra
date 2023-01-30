const mongoose = require('mongoose');

const PaiementSchema = new mongoose.Schema(
  {
    "idFacture": {
      type: String,
      required: true
    },
    "montantTotal": {
      type: String,
      required: true
    },
    "details": [
      {
        "montant": String,
        "dateHeure": {
          type: Date,
          default: Date.now
        },
        "idPersonnel": String
      }
    ],
    "etat": {
      type: Number,
      min: 0,
      max: 5
    },
  },
  {
      collection: "paiement"
  }
);

const Paiement = mongoose.model('Paiement', PaiementSchema);

module.exports = Paiement;
