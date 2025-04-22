FROM rasa/rasa-sdk:3.6.2

WORKDIR /app

COPY actions/ /app/actions/
COPY requirements.txt /app/

RUN pip install --no-cache-dir -r /app/requirements.txt

EXPOSE 5055

CMD ["python", "-m", "rasa_sdk", "--actions", "actions"]
