FROM rasa/rasa-sdk:3.6.2

WORKDIR /app

COPY . /app/actions
COPY requirements.txt /app/


USER root
RUN pip install --no-cache-dir -r /app/requirements.txt


USER 1001

EXPOSE 5055

CMD ["python", "-m", "rasa_sdk", "--actions", "actions"]
