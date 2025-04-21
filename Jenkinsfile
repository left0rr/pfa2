pipeline {
    agent any

    options {
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
                echo '📥 Manually cloning repository...'
                sh 'rm -rf pfa2 && git clone https://github.com/left0rr/pfa2.git'
            }
        }

        stage('Build Laravel Backend') {
            steps {
                dir('pfa2') {
                    script {
                        echo '🔨 Building Laravel Backend image...'
                        docker.build(env.BACKEND_IMAGE, '.')
                    }
                }
            }
        }

        stage('Build React Frontend') {
            steps {
                dir('pfa2/frontend') {
                    script {
                        echo '🔧 Building React Frontend image...'
                        docker.build(env.FRONTEND_IMAGE, '.')
                    }
                }
            }
        }

        stage('Build Rasa Server') {
            steps {
                dir('pfa2/domi') {
                    script {
                        echo '🤖 Building Rasa Server image...'
                        docker.build(env.RASA_IMAGE, '.')
                    }
                }
            }
        }

        stage('Build Rasa Actions') {
            steps {
                dir('pfa2/domi/actions') {
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
