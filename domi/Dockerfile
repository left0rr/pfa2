FROM rasa/rasa:3.6.21

# Passe en root pour installer proprement
USER root

WORKDIR /app

# Copie tous les fichiers du projet dans /app
COPY . /app

# Copie le fichier requirements du dossier actions
COPY actions/requirements.txt .

# Mets à jour pip (facultatif mais recommandé)
RUN pip install --upgrade pip

# Installe les dépendances Python (en root pour éviter les erreurs)
RUN pip install --no-cache-dir -r requirements.txt

# Reviens à l'utilisateur Rasa par défaut (1001)
USER 1001

# Entraîne le modèle Rasa
RUN rasa train

# Lance le serveur Rasa
CMD ["run", "--enable-api", "--cors", "*", "--debug"]
