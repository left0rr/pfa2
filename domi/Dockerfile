FROM rasa/rasa:3.6.21

USER root  #Deviens root pour installer

WORKDIR /app
COPY . /app
COPY actions/requirements.txt .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

USER 1001

RUN rasa train

CMD ["run", "--enable-api", "--cors", "*", "--debug"]
