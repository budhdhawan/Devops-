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
env.PATH = "${env.PATH}:/opt/sonar-scanner/bin"
stage('SonarQube analysis') {
steps {
withSonarQubeEnv('sonarqube') {
 sh 'sonar-scanner'
}
}
}
}
}
