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
            required: true,
            // select: false
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
    let client = this;

    //only hash if the password hqs been modified (or is new)
    if (!client.isModified("password")) return next();

    // Generate a salt
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);

      bcrypt.hash(this.password, salt, (errorHash, hash) => {
        if (errorHash) return next(errorHash);
        this.password = hash;
        next();
      });
      // Re-assign hashed version over original, plain text password
    });
    // Generate a password hash (salt + hash)
  } catch(error) {
    next(error);
  }
});

ClientSchema.methods.comparePassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
    if (error) return callback(error);
    callback(null, isMatch);
  });
};

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
