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
          type: String
        },
        "dateCommencement": {
          type: Date
        },
        "avancement": {
          type: Number,
          min: 0,
          max: 100
        },
        "prixAPayer": {
          type: Number,
          required: true
        },
        "etat": {
          type: Number,
          min: 0,
          max: 10
        },
        "dateFin": {
          type: Date
        }
    },
    {
        collection: "reparation"
    }
);

const Reparation = mongoose.model('Reparation', reparationSchema);

module.exports = Reparation;
