pipeline {
    agent { label 'local-agent' }

    stages {
        stage('Identify Branch') {
            steps {
                // This will print whether it is building 'main' or 'testing-branch'
                echo "Running automation for branch: ${env.BRANCH_NAME}"
            }
        }
        stage('Quality Check') {
            steps {
                echo 'Checking HTML structure...'
                sh 'grep -i "Task Manager" index.html' 
            }
        }
    }
    post {
        always {
            echo "Finished building ${env.BRANCH_NAME}"
        }
    }
}
