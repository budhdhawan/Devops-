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
stage('Build') {
steps {
sh 'npm install'
}
}
stage('SonarQube analysis') {
steps {
withSonarQubeEnv('sonarqube') {
 sh 'sonar-scanner -Dsonar.projectKey=<project_key> -Dsonar.sources=<source_directory> -Dsonar.host.url=<sonarqube_url> -Dsonar.login=<sonarqube_token>'
}
}
}
}
}
