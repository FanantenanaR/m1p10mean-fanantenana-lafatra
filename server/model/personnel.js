const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PersonnelSchema = new mongoose.Schema(
    {
        "nom": {
            type: String,
            required: true
        },
        "prenom": {
            type: String,
            required: true
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
        "tel": {
            type: String,
            required: true
        },
        "email": {
            type: String,
            unique: true,
            required: true
        },
        "dateInscription": {
            type: Date,
            default: Date.now
        },
        "role":{
          type: Number,
          default: 0,
          min: 0,
          max: 5
        }
    },
    {
        collection: "personnel"
    }
);

PersonnelSchema.pre('save', async function(next) {
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
const Personnel = mongoose.model('Personnel', PersonnelSchema);

module.exports = Personnel;
