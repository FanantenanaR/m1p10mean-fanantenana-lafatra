export class Client {
  nom: string;
  prenom: string = "";
  dateNaissance: Date;
  tel: string;
  email: string;
  adresse: string;
  numerocin: number;
  dateDelivrance: Date;
  lieuDelivrance: string;
  login: string;
  mdp: string;

  constructor(
    nom: string,
    prenom: string,
    dateNaissance: Date,
    tel: string,
    email: string,
    adresse: string,
    numerocin: number,
    dateDelivrance: Date,
    lieuDelivrance: string,
    login: string,
    mdp: string
  ) {
    this.nom = nom;
    this.prenom = prenom;
    this.dateNaissance = dateNaissance;
    this.tel = tel;
    this.adresse = adresse;
    this.email = email;
    this.numerocin = numerocin;
    this.dateDelivrance = dateDelivrance;
    this.lieuDelivrance = lieuDelivrance;
    this.login = login;
    this.mdp = mdp;
  }
};
