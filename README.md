# Task Management API

Cette application est une API RESTful construite avec Express.js pour gérer des tâches. Elle permet d'ajouter, lister et supprimer des tâches avec une validation des données d'entrée grâce à `express-validator`.

## Prérequis

- Node.js
- npm (ou yarn)

## Installation

1. Clonez ce dépôt :

   git clone https://github.com/Hackthus/NodeJs-Express.git
  
   cd NodeJs-Express

3. Installez les dépendances :

   npm install

## Configuration

Assurez-vous d'avoir un fichier `db.js` qui exporte une fonction `connectDB` pour se connecter à votre base de données MongoDB. Le fichier `db.js` pourrait ressembler à ceci :

javascript
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // ou votre URI MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function connectDB() {
 if (!client.isConnected()) await client.connect();
 return client.db('nom-de-votre-bdd');
}

## Utilisation

Démarrez le serveur :
npm start
Le serveur sera accessible à l'adresse http://localhost:3000.

## Routes de l'API
 GET /

Récupère toutes les tâches.

   Réponse : 200 OK

   json

{
 "tasks": [
   {
     "id": 1,
     "sensitiveField": "hashed_value",
     ...
   },
   ...
 ]
}

Réponse en cas d'erreur : 500 Internal Server Error

json

   {
     "message": "An error occurred"
   }

 POST /

 Ajoute une nouvelle tâche.

   Corps de la requête :

   json

{
 "id": 1,
 "sensitiveField": "value",
 ...
}

Réponse : 200 OK

json

{
 "message": "Task added successfully!"
}

 Réponse en cas d'erreur de validation : 400 Bad Request

json

{
 "errors": [
   {
     "msg": "ID is required and should be an integer",
     "param": "id",
     "location": "body"
   },
   {
     "msg": "Sensitive field is required",
     "param": "sensitiveField",
     "location": "body"
   }
 ]
}

Réponse en cas d'erreur serveur : 500 Internal Server Error

json

   {
     "message": "An error occurred"
   }

##  DELETE /

Supprime une tâche en fonction de son taskId.

   Paramètre de la requête : taskId
 
DELETE /?taskId=1

Réponse : 200 OK

json

{
 "message": "Task deleted successfully!"
}

Réponse si la tâche n'est pas trouvée : 400 Bad Request

json

{
 "message": "Task not found"
}

Réponse en cas d'erreur de validation : 400 Bad Request

json

{
 "errors": [
   {
     "msg": "Invalid value",
     "param": "taskId",
     "location": "query"
   }
 ]
}

Réponse en cas d'erreur serveur : 500 Internal Server Error

json

   {
     "message": "An error occurred"
   }

## Auteur

   Votre Nom h@ckthus
   Email: hackthus@gmail.com
