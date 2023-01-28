const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SortieSchema = new mongoose.Schema(
    {
      "idvoiture": {
          type: String,
          required: true
      },
      "preneur": {
          "nom": {
              type: String,
              required: true
          },
          "prenom": {
              type: String,
              required: true
          },
          "tel": {
              type: String,
              required: true
          },
          "email": {
            type: String,
            required: true
          },
      },
      "responsable": {
        "nom": {
          type: String,
          required: true
        },
        "prenom": {
            type: String,
            required: true
        },
        "tel": {
            type: String,
            required: true
        },
        "email": {
          type: String,
          required: true
        },
        "role": {
          type: Number,
          required: true
        },
      },
      "dateHeure": {
        type: Date,
        default: Date.now
      },
      "idfacture": {
        type: String,
        required: true
      },
    },
    {
      collection: "sortie"
    }
);

SortieSchema.pre('save', async function(next) {
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
const Sortie = mongoose.model('Sortie', SortieSchema);

module.exports = Sortie;
