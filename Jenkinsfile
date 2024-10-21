pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Specify the name of your Node.js installation
    }
    environment {
        // Define environment variables here
        CLIENT_REPO = 'https://your-client-repo-url.git'
        SERVER_REPO = 'https://your-server-repo-url.git'
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout both repositories
                script {
                    dir('client') {
                        git branch: 'main', url: env.CLIENT_REPO
                    }
                    dir('server') {
                        git branch: 'main', url: env.SERVER_REPO
                    }
                }
            }
        }
        stage('Install Dependencies') {
            parallel {
                stage('Install Client Dependencies') {
                    steps {
                        dir('client') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Install Server Dependencies') {
                    steps {
                        dir('server') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }
        stage('Run Tests') {
            parallel {
                stage('Test Client') {
                    steps {
                        dir('client') {
                            sh 'npm test'
                        }
                    }
                }
                stage('Test Server') {
                    steps {
                        dir('server') {
                            sh 'npm test'
                        }
                    }
                }
            }
        }
        stage('Build Client') {
            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Deploy client and server
                    // This could involve copying files to a server, running Docker containers, etc.
                    // Example: If deploying to a remote server via SSH
                    sh '''
                        # Deploy client build files
                        scp -r client/build/* user@yourserver:/path/to/your/client/deployment/
                        
                        # Deploy server
                        scp -r server/* user@yourserver:/path/to/your/server/deployment/
                        
                        # Optionally restart services
                        ssh user@yourserver "pm2 restart your-app-name"
                    '''
                }
            }
        }
    }
    post {
        always {
            // Cleanup if needed
            deleteDir()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
