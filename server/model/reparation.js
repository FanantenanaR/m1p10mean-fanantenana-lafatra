const mongoose = require('mongoose');

const reparationSchema = new mongoose.Schema(
    {
        "idVoiture": {
          type: String,
          required: true
        },
        "aReparer": {
          type: String,
          required: true
        },
        "Responsable": {
          "nom": String,
          "prenom": String,
          "tel": String,
          "email": String
        },
        "idDepot": {
          type: String,
          required: true,
        },
        "dateCommencement": {
          type: Date,
          default: null
        },
        "avancement": {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        "prixAPayer": {
          type: Number,
          required: true,
          min: 0,
        },
        "etat": {
          type: Number,
          min: 0,
          max: 10,
          default: 0,
        },
        "dateFin": {
          type: Date,
          default: null
        }
    },
    {
        collection: "reparation"
    }
);

const Reparation = mongoose.model('Reparation', reparationSchema);

module.exports = Reparation;
