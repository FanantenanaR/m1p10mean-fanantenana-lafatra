const mongoose = require('mongoose');

const VoitureSchema = new mongoose.Schema(
    {
        "plaque": {
            type: String,
            required: true
        },
        "marque": {
            type: String,
            required: true
        },
        "modele": {
            type: String,
            required: true
        },
        "idClient": {
            type: String,
            required: true
        }
    },
    {
        collection: "voiture"
    }
);

const Voiture = mongoose.model('Voiture', VoitureSchema);

module.exports = Voiture;
