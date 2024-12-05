pipeline {
    agent any

    environment {
        REGISTRY = 'dta32'
        REPO_FE = 'tiketin-v2-fe'
        REPO_BE = 'tiketin-v2-be'
        DOCKER_UNAME = 'dta32'
        DOCKER_TOKEN = credentials('docker-creds')
        KUBE_CREDS = credentials('kube-creds')
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }
        
        stage('Detect Changes'){
            steps {
                script{
                    def changedFiles = sh(script: 'git diff --name-only HEAD~1 HEAD', returnStdout: true).trim()
                    env.FRONTEND_CHANGED = changedFiles.contains('frontend/')
                    env.BACKEND_CHANGED = changedFiles.contains('backend/')
                }
            }
        }

        // Frontend
        stage('Build Frontend') {
            when {
                expression {
                    return env.FRONTEND_CHANGED
                }
            }
            steps {
                dir('frontend'){
                    script {
                        def commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                        sh """
                        docker build -t ${REGISTRY}/${REPO_FE}:${commitId} -f Dockerfile .
                        echo "${DOCKER_TOKEN}" | docker login --username ${DOCKER_UNAME} --password-stdin
                        docker push ${REGISTRY}/${REPO_FE}:${commitId}
                        """
                    }
                }
            }
        }

        stage('Deploy Frontend') {
            when {
                expression {
                    return env.FRONTEND_CHANGED && env.BRANCH_NAME == 'main'
                }
            }
            steps {
                script {
                    def commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    sh """
                    sed -i 's|replacedbycicd|${REGISTRY}/${REPO_FE}:${commitId}|' frontend/k8s/deployment.yaml
                    kubectl apply -f frontend/k8s/deployment.yaml --kubeconfig=${KUBE_CREDS}
                    """
                }
            }
        }
        
        // Backend
        stage('Build Backend') {
            when {
                expression {
                    return env.BACKEND_CHANGED
                }
            }
            steps {
                dir('backend'){
                    script {
                        def commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                        sh """
                        docker build -t ${REGISTRY}/${REPO_BE}:${commitId} -f Dockerfile .
                        echo "${DOCKER_TOKEN}" | docker login --username ${DOCKER_UNAME} --password-stdin
                        docker push ${REGISTRY}/${REPO_BE}:${commitId}
                        """
                    }
                }
            }
        }
        
        stage('Deploy Backend') {
            when {
                expression {
                    return env.BACKEND_CHANGED && env.BRANCH_NAME == 'main'
                }
            }
            steps {
                script {
                    def commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    sh """
                    sed -i 's|replacedbycicd|${REGISTRY}/${REPO_BE}:${commitId}|' backend/k8s/deployment.yaml
                    kubectl apply -f backend/k8s/deployment.yaml --kubeconfig=${KUBE_CREDS}
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}