pipeline {
    agent {
        docker { 
            image 'node:18-alpine' // This pulls a clean environment automatically
        }
    }
    stages {
        stage('Test inside Docker') {
            steps {
                sh 'node -v'
                sh 'grep -i "Task Manager" index.html'
            }
        }
    }
}
