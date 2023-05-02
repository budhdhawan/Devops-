pipeline {
agent any
environment{
PATH = "${env.PATH}:/opt/sonar-scanner/bin"
}
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
 sh sonar-scanner \
  -Dsonar.projectKey=myproject \
  -Dsonar.sources=.\
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=06aefe274317de33ac00d1140ca3e545f4804066'
}
}
}
}
}
