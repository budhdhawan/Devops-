pipeline {
    agent any
  
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                          branches: [[name: '*/main']],
                          doGenerateSubmoduleConfigurations: false,
                          extensions: [[$class: 'CleanCheckout']],
                          submoduleCfg: [],
                          userRemoteConfigs: [[url: 'https://github.com/budhdhawan/Devops-.git']]])
            }
        }
    
        stage('Build and push Docker image') {
            steps {
                script {
                    def dockerImage = docker.build('<your-docker-image-name>:<tag>')
                    dockerImage.push()
                }
            }
        }
    
        stage('Deploy Docker container') {
            steps {
                sshagent(['<your-ssh-credentials-id>']) {
                    sh 'ssh <your-production-server-username>@<your-production-server-hostname> "docker stop <your-docker-container-name> || true && docker rm <your-docker-container-name> || true"'
                    sh "ssh <your-production-server-username>@<your-production-server-hostname> 'docker pull <your-docker-image-name>:<tag>'"
                }
            }
        }

        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh 'sonar-scanner'
                }
            }
        }
    }
}
