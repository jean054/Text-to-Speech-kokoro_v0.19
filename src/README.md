🎙️ Kokoro TTS Studio : Interface de Synthèse Vocale

🎯 Objectif du Projet

Ce projet est une interface utilisateur minimale développée en React.js qui permet d'interagir avec un service de Synthèse Vocale (Text-to-Speech ou TTS) hébergé localement. Il a été conçu pour tester le modèle Kokoro, notamment la voix française FF Siwis, en offrant des fonctionnalités de pré-écoute et de téléchargement.

✨ Fonctionnalités

Saisie de Texte : Champ de saisie pour le texte à synthétiser (limite de 500 caractères).

Contrôle de la Vitesse : Slider pour ajuster la vitesse de lecture (de 0.5x à 2.0x).

Génération Audio : Envoi asynchrone du texte au service TTS local.

Pré-écoute Intégrée : Lecture immédiate du fichier audio généré dans un lecteur HTML5.

Téléchargement : Possibilité de télécharger l'audio au format .wav.

Interface Moderne : Design en thème sombre "Deep Space" pour une expérience utilisateur agréable.

🛠️ Structure du Projet et Technologies

Ce projet se divise en deux parties principales :

Frontend (UI) :

Technologie : React.js (Vite).

Fichier Clé : src/App.jsx.

Backend (API) :

Technologie : Python avec le framework FastAPI.

Endpoint Requis : Le service doit exposer un endpoint POST /tts sur http://127.0.0.1:8001.

🚀 Démarrage Rapide

Prérequis

Node.js (avec npm ou yarn)

Le service Backend Kokoro TTS démarré sur http://127.0.0.1:8001.

1. Installation des Dépendances

Dans le répertoire du frontend :

npm install
# ou
yarn install


2. Lancement de l'Application

Lancez le serveur de développement :

npm run dev
# ou
yarn dev


L'application sera accessible sur http://localhost:5173 (ou un port similaire).