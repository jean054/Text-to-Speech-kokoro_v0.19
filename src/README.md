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

Technologie : React.js (développé pour être lancé via un outil comme Vite).

Fichier Clé : App.jsx (contient toute la logique et le style de l'interface).

Backend (API) :

Technologie : Python avec le framework FastAPI (implémentation non incluse ici, mais requise pour le fonctionnement).

Endpoint Requis : Le service doit exposer un endpoint POST /tts sur http://127.0.0.1:8001.

🚀 Mise en Route (Procédure Git)

Une fois les fichiers du projet organisés, utilisez les commandes suivantes dans votre terminal pour initialiser votre dépôt et le lier à GitHub.

1. Initialisation Locale et Fichiers

Assurez-vous que vos fichiers de code (App.jsx, README.md, .gitignore, etc.) sont dans le répertoire de votre projet.

2. Commandes Git

# Initialiser le dépôt Git local
git init

# Ajouter tous les fichiers au suivi (sauf ceux exclus par .gitignore)
git add .

# Enregistrer les modifications avec un message descriptif
git commit -m "Initial commit: Setup project structure and functional TTS UI"

# --- Étape de Liaison à GitHub (Remplacer L'URL) ---

# Remplacer <VOTRE_URL_GITHUB> par l'URL fournie par GitHub après la création du dépôt en ligne.
git remote add origin <VOTRE_URL_GITHUB>

# Envoyer le code vers la branche principale sur GitHub
git push -u origin main


Votre projet est maintenant versionné, sauvegardé sur GitHub, et prêt pour les prochaines étapes de développement ou de déploiement !