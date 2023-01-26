const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { timestamp } = require('rxjs');

const DepotSchema = new mongoose.Schema(
    {
        "idVoiture": {
            type: String,
            required: true
        },
        "dateHeure": {
            type: Date,
            default: Date.now
        },
        "Depositeur": {
            "nom": String,
            "prenom": String,
            "tel": String,
            "email": String,
        },
        "Recepteur": {
            "nom": String,
            "prenom": String,
            "tel": String,
            "email": String,
            "role": Number
        },
        "etat": {
          type: Number,
          default: 0,
          min: 0,
          max: 10
        }
    },
    {
        collection: "depot"
    }
);

const Depot = mongoose.model('Depot', DepotSchema);

module.exports = Depot;
