pipeline {
    agent any

    tools {
        nodejs 'NodeJS'       // Configure NodeJS in Jenkins Global Tool Configuration
        allure 'allure'       // Configure Allure in Jenkins Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                git branch: 'master', url: 'https://github.com/Dhanjeetkumar-gif/Playwright_UI_Automation.git'
            }
        }

        stage('Clean') {
            steps {
                echo 'Cleaning previous test results...'
                bat '''
                    if exist "test-results" rmdir /s /q "test-results"
                    if exist "playwright-report" rmdir /s /q "playwright-report"
                    if exist "allure-results" rmdir /s /q "allure-results"
                    if exist "allure-report" rmdir /s /q "allure-report"
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm ci'
            }
        }

        stage('Install Browsers') {
            steps {
                echo 'Installing Playwright browsers...'
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running Playwright tests with Allure...'
                bat 'npm run test:allure'
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo 'Generating Allure report...'
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Publish Reports') {
            steps {
                echo 'Publishing reports...'
                publishHTML([[
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Allure Report'
                ]])
                publishHTML([[
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ]])
            }
        }
    }

    post {
        always {
            echo 'Archiving test reports...'
            archiveArtifacts artifacts: '**/allure-report/**, **/playwright-report/**', allowEmptyArchive: true
        }
        failure {
            echo 'Some tests failed. Please check the reports.'
        }
        success {
            echo 'Build and tests completed successfully!'
        }
    }
}
