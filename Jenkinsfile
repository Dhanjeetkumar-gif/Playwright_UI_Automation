pipeline {
    agent any

    tools {
        nodejs 'NodeJS'   // NodeJS must be configured in Jenkins "Global Tool Configuration"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Dhanjeetkumar-gif/Playwright_UI_Automation.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test --reporter=line,allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'npm run report:allure'
            }
        }
    }

    post {
        always {
            echo 'Publishing test results...'
            publishHTML(target: [
                reportDir: 'allure-report',
                reportFiles: 'index.html',
                reportName: 'Allure Report'
            ])
        }
        failure {
            echo 'Some tests failed. Check the reports for details.'
        }
    }
}
