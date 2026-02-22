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
                sh 'cat index.html'
                echo ' checking HTML structure.....'
                sh 'grep -i "Task Manager" index.html'
            }
        }
        stage('HTML Validation') {
    steps {
        echo 'Checking for HTML syntax errors...'
        // This command looks for the closing body tag. 
        // If it is missing, the command fails and the build turns RED.
        sh 'tidy -e index.html'
    }
}
    }
    post {
        always {
            echo "Finished building ${env.BRANCH_NAME}"
        }
    }
}
