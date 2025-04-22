FROM rasa/rasa:3.6.21

USER root
WORKDIR /app

# Copie ciblée uniquement des fichiers nécessaires à Rasa
COPY data/ /app/data/
COPY config.yml /app/
COPY domain.yml /app/
COPY credentials.yml /app/
COPY endpoints.yml /app/

#USER 1001

RUN rasa train

CMD ["run", "--enable-api", "--cors", "*", "--debug"]
