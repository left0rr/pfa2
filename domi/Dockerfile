
FROM rasa/rasa:3.6.21

WORKDIR /app
COPY . /app

COPY actions/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN rasa train

CMD ["run", "--enable-api", "--cors", "*", "--debug"]

