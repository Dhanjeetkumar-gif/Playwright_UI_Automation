pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS' // Make sure NodeJS is configured in Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                // Add your SCM checkout here if needed
            }
        }
        
        stage('Clean') {
            steps {
                echo 'Cleaning previous test results...'
                bat '''
                    cd /d "C:\\Users\\11dha\\Playwright_UI_Automation"
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
                bat '''
                    cd /d "C:\\Users\\11dha\\Playwright_UI_Automation"
                    npm ci
                '''
            }
        }
        
        stage('Install Browsers') {
            steps {
                echo 'Installing Playwright browsers...'
                bat '''
                    cd /d "C:\\Users\\11dha\\Playwright_UI_Automation"
                    npx playwright install chromium
                '''
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running AI-powered tests...'
                bat '''
                    cd /d "C:\\Users\\11dha\\Playwright_UI_Automation"
                    npm run test:allure
                '''
            }
        }
        
        stage('Generate Reports') {
            steps {
                echo 'Generating Allure report...'
                bat '''
                    cd /d "C:\\Users\\11dha\\Playwright_UI_Automation"
                    npm run allure:generate
                '''
            }
        }
    }
    
    post {
        always {
            echo 'Publishing test results...'
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'allure-report',
                reportFiles: 'index.html',
                reportName: 'Allure Report'
            ])
            
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
        
        success {
            echo 'All tests passed successfully!'
        }
        
        failure {
            echo 'Some tests failed. Check the reports for details.'
        }
    }
}
