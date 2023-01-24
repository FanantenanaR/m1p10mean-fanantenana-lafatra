const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
            type: Number
        }
    },
    {
        collection: "voiture"
    }
);

VoitureSchema.pre('save', async function(next) {
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
const Voiture = mongoose.model('Voiture', VoitureSchema);

module.exports = Voiture;
