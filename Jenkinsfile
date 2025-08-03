pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'movie-api:latest'
        BACKEND_CONTAINER = 'movie-api'
        BACKEND_PORT = '80'

        FRONTEND_IMAGE = 'movie-ui:latest'
        FRONTEND_CONTAINER = 'movie-ui'
        FRONTEND_PORT = '4200'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Phuong22122003/Movie-web.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build --tag ${BACKEND_IMAGE} back-end"
                    sh "docker build --tag ${FRONTEND_IMAGE} front-end"
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker rm -f ${BACKEND_CONTAINER} || true"
                    sh "docker rm -f ${FRONTEND_CONTAINER} || true"

                    sh """
                        docker run -d --name ${BACKEND_CONTAINER} -p ${BACKEND_PORT}:${BACKEND_PORT} \\
                        -e PORT=${BACKEND_PORT} \\
                        -e DB_CONNECTION_URL="jdbc:sqlserver://host.docker.internal:1433;databaseName=Movie;encrypt=true;trustServerCertificate=true" \\
                        -e DB_CONNECTION_USERNAME=sa \\
                        -e DB_CONNECTION_PASSWORD=123456789 \\
                        -e UPLOAD_DIR=File \\
                        ${BACKEND_IMAGE}
                    """

                    sh "docker run -d --name ${FRONTEND_CONTAINER} -p ${FRONTEND_PORT}:${8080} ${FRONTEND_IMAGE}"
                }
            }
        }
    }

    post {
        success {
            echo "App is deployed and running"
        }
        failure {
            echo 'Build or deployment failed'
        }
    }
}
