const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ClientSchema = new mongoose.Schema(
    {
        "nom": {
            type: String,
            required: true
        },
        "prenom": {
            type: String,
            required: true
        },
        "dateNaissance": Date,
        "tel": {
            type: String,
            required: true
        },
        "email": {
            type: String,
            unique: true,
            required: true
        },
        "adresse": {
            type: String,
            required: true
        },
        "cin": {
            "numero": {
                type: Number,
                required: true
            },
            "dateDelivrance": {
                type: Date,
                required: true
            },
            "lieuDelivrance": {
                type: String,
                required: true
            },
        },
        "dateInscription": {
            type: Date,
            default: Date.now
        },
        "login": {
            type: String,
            unique: true,
            required: true
        },
        "password": {
            type: String,
            required: true
        },
        "etatcompte": {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        }
    },
    {
        collection: "client"
    }
);

ClientSchema.pre('save', async function(next) {
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Generate a password hash (salt + hash)
      const passwordHash = await bcrypt.hash(this.password, salt);
      // Re-assign hashed version over original, plain text password
      this.password = passwordHash;
      next();
    } catch(error) {
      next(error);
    }
});
const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
