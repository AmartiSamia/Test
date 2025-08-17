pipeline {
  agent any
  environment {
    REGISTRY       = 'devopstestacr2025.azurecr.io'
    IMAGE_NAME     = 'test-app'
    RESOURCE_GROUP = 'devops-test-rg'
    APP_NAME       = 'devops-test-app2025'
  }
  stages {
    stage('Checkout'){ steps { checkout scm } }

    stage('Build Docker image'){
      steps {
        // Dockerfile is here at repo root, so build context is "."
        sh 'docker build -t ${REGISTRY}/${IMAGE_NAME}:latest .'
      }
    }

    stage('Push to ACR'){
      steps {
        withCredentials([usernamePassword(credentialsId: 'acr-creds', usernameVariable: 'U', passwordVariable: 'P')]) {
          sh '''
            echo "$P" | docker login ${REGISTRY} -u "$U" --password-stdin
            docker push ${REGISTRY}/${IMAGE_NAME}:latest
          '''
        }
      }
    }

    stage('Deploy to Azure'){
      steps {
        withCredentials([usernamePassword(credentialsId: 'acr-creds', usernameVariable: 'U', passwordVariable: 'P')]) {
          sh '''
            az webapp config container set \
              --name ${APP_NAME} --resource-group ${RESOURCE_GROUP} \
              --docker-custom-image-name ${REGISTRY}/${IMAGE_NAME}:latest \
              --docker-registry-server-url https://${REGISTRY} \
              --docker-registry-server-user $U \
              --docker-registry-server-password $P
            az webapp restart -g ${RESOURCE_GROUP} -n ${APP_NAME}
          '''
        }
      }
    }
  }
}
