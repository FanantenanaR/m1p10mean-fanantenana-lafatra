const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SortieSchema = new mongoose.Schema(
    {
      "idVoiture": {
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
          default: 5,
          min: 0,
          max: 5
        },
      },
      "dateHeure": {
        type: Date,
        default: Date.now
      },
      "idfacture": {
        type: String
      },
    },
    {
      collection: "sortie"
    }
);


const Sortie = mongoose.model('Sortie', SortieSchema);

module.exports = Sortie;
