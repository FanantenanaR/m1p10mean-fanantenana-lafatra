const mongoose = require('mongoose');
const Client = new mongoose.Schema(
    {
        "_id": {
            type: String,
            index: true,
            unique: true,
        },
        "nom": String,
        "prenom": String,
        "dateNaissance": String,
        "tel": String,
        "email": String,
        "adress": String,
        "cin": {
            "numero": Number,
            "dateDelivrance": Date,
            "LieuDelivrance": String
        },
        "dateInscription": {
            type: Date,
            default: Date.now
        },
        "login": String,
        "mdp": String,
        "etatcompte": {
            type: number,
            default: 0,
            min: 0,
            max: 5
        }
    },
    {
        collection: "client"
    }
);

exports.default = Client = mongoose.model('client', Client);
