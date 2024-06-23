pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "frontend"
        DOCKER_CONTAINER = "web_container"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/Andres13025/FrontendDocker.git', branch: 'master'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Construir la imagen Docker usando el Dockerfile en el repositorio
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }
        stage('Deploy Docker Container') {
            steps {
                script {
                    // Detener y eliminar el contenedor existente, si es necesario
                    sh 'docker stop $DOCKER_CONTAINER || true'
                    sh 'docker rm $DOCKER_CONTAINER || true'

                    // Desplegar el nuevo contenedor
                    sh 'docker run -d --name $DOCKER_CONTAINER -p 4200:4200 $DOCKER_IMAGE'
                }
            }
        }
    }
}