pipeline {
    agent { label 'local-agent' }

    stages {
        stage('Identify Branch') {
            steps {
                echo "Running automation for branch: ${env.BRANCH_NAME}"
            }
        }
        stage('Quality Check') {
            steps {
                echo 'Checking for "Task Manager" text...'
                // Using quotes to handle the space correctly
                sh 'grep -i "Task Manager" index.html'
            }
        }
        stage('HTML Structural Validation') {
            steps {
                echo 'Verifying mandatory HTML tags...'
                // These commands will fail the build if the tags are missing
                sh 'grep -i "</body>" index.html'
                sh 'grep -i "</html>" index.html'
            }
        }
    }
    post {
        always {
            echo "Finished building ${env.BRANCH_NAME}"
        }
    }
}
