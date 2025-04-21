pipeline {
    agent any

    options {
        // Prevent Jenkins from doing an automatic SCM checkout before pipeline starts
        skipDefaultCheckout(true)
    }

    environment {
        BACKEND_IMAGE = "pfa2-backend"
        FRONTEND_IMAGE = "pfa2-frontend"
        RASA_IMAGE = "pfa2-rasa-server"
        RASA_ACTIONS_IMAGE = "pfa2-rasa-actions"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Cloning repository...'
                checkout scm
            }
        }

        stage('Build Laravel Backend') {
            steps {
                dir('.') {
                    script {
                        echo '🔨 Building Laravel Backend image...'
                        docker.build(env.BACKEND_IMAGE, '.')
                    }
                }
            }
        }

        stage('Build React Frontend') {
            steps {
                dir('frontend') {
                    script {
                        echo '🔧 Building React Frontend image...'
                        docker.build(env.FRONTEND_IMAGE, '.')
                    }
                }
            }
        }

        stage('Build Rasa Server') {
            steps {
                dir('domi') {
                    script {
                        echo '🤖 Building Rasa Server image...'
                        docker.build(env.RASA_IMAGE, '.')
                    }
                }
            }
        }

        stage('Build Rasa Actions') {
            steps {
                dir('domi/actions') {
                    script {
                        echo '⚙️ Building Rasa Actions Server image...'
                        docker.build(env.RASA_ACTIONS_IMAGE, '.')
                    }
                }
            }
        }

        stage('Post Build Summary') {
            steps {
                echo '✔ All images built successfully!'
            }
        }
    }

    post {
        failure {
            echo '❌ Build failed. Check the logs above ☝️'
        }
        success {
            echo '✅ Pipeline completed successfully!'
        }
    }
}
