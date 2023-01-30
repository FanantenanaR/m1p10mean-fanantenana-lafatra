const Voiture = require("../model/voiture");

const getVoiture = async (idVoiture) => {
  return await Voiture.findById(idVoiture);
};

module.exports = {
  getVoiture
}
