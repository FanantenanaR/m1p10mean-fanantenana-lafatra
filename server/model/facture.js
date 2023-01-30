const mongoose = require('mongoose');

const FactureSchema = new mongoose.Schema(
  {
    "idClient": {
      type: String,
      required: true
    },
    "idVoiture": {
      type: String,
      required: true
    },
    "idDepot":{
      type: String,
      required: true
    },
    "daty": {
      type: Date,
      default: Date.now
    },
    "etat": {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    "detailFacture": [
      {
        "libelle": String,
        "prix": Number
      }
    ],
    "total": {
      type: Number
    },
  },
  {
      collection: "facture"
  }
);

const Facture = mongoose.model('Facture', FactureSchema);

module.exports = Facture;
