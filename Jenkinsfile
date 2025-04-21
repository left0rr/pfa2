pipeline {
    agent any

  environment {
        BACKEND_IMAGE = "pfa2-backend"
    FRONTEND_IMAGE = "pfa2-frontend"
    RASA_IMAGE = "pfa2-rasa-server"
    RASA_ACTIONS_IMAGE = "pfa2-rasa-actions"
  }

  stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
        checkout scm
      }
    }

    stage('Build Laravel Backend') {
            steps {
                dir('.') {
                    script {
                        docker.build(env.BACKEND_IMAGE, '.')
          }
        }
      }
    }

    stage('Build React Frontend') {
            steps {
                dir('frontend') {
                    script {
                        docker.build(env.FRONTEND_IMAGE, '.')
          }
        }
      }
    }

    stage('Build Rasa Server') {
            steps {
                dir('domi') {
                    script {
                        docker.build(env.RASA_IMAGE, '.')
          }
        }
      }
    }

    stage('Build Rasa Actions') {
            steps {
                dir('domi/actions') {
                    script {
                        docker.build(env.RASA_ACTIONS_IMAGE, '.')
          }
        }
      }
    }

    stage('Post Build Summary') {
            steps {
                echo "✔ All images built successfully"
      }
    }
  }

  post {
        failure {
            echo "❌ Build failed. Check logs."
    }
    success {
            echo "✅ Pipeline completed."
    }
  }
}
