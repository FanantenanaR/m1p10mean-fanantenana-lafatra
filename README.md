# m1p10mean-fanantenana-lafatra
Projet M1 - P10 - MEAN - Web Avancé 


# Preparation environnement
## General 
- Installer les dependances
    ```cmd
    npm install
    ```
- Copier ceux dans `.env.example` dans `.env` qui devra être d'abord créer puis completer les informations
    ```cmd
    cp .env.example .env
    ```
- Changer le port que le server va écouter dans `www`
  ``` www ligne 28
    server.listen(3000); 

## Server
Si vous voulez utiliser le live reload, installer en global *nodemon*
```cmd
npm install --global nodemon
```
## Angular
Aucun pour l'instant 
# Lancement du projet
## Server
Pour lancer le serveur API
```cmd 
npm run start
```
Pour lancer avec le live reload
```cmd
npm run start-with-nodemon
```

## Angular
Pour lancer Angular
```cmd
npm run start-front
```

# Structure du projet
## Server 
```
+---bin // emplacement lancement server
+---routes // emplacement des routes
+---views // emplacement des views si besoin
app.js
```
## Angular

``` 
+---app
|   +---responsableaccueil
|   +---responsbleheader
+---assets
+---environments
```
