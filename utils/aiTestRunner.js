const { test } = require('@playwright/test');

class AITestRunner {
    constructor(page) {
        this.page = page;
    }

    async executePrompt(prompt) {
        // Add metadata for Cursor's AI to understand the prompt
        await this.page.evaluate((promptText) => {
            window.__CURSOR_AI_CONTEXT__ = {
                prompt: promptText,
                type: 'test_execution'
            };
        }, prompt);

        // Log the prompt for debugging
        console.log('Executing AI prompt:', prompt);

        // Parse the prompt to extract key information
        const promptLines = prompt.split('\n');
        const title = promptLines[0].replace('Title: ', '').trim();
        const steps = this.extractSteps(promptLines);
        const expectedResults = this.extractExpectedResults(promptLines);

        return {
            title,
            steps,
            expectedResults
        };
    }

    extractSteps(promptLines) {
        const steps = [];
        let isInSteps = false;

        for (const line of promptLines) {
            if (line.startsWith('Steps:')) {
                isInSteps = true;
                continue;
            }
            if (line.startsWith('Expected Result:')) {
                isInSteps = false;
                break;
            }
            if (isInSteps && line.trim()) {
                // Remove number and dot from the beginning of the step
                const step = line.replace(/^\d+\.\s*/, '').trim();
                if (step) {
                    steps.push(step);
                }
            }
        }
        return steps;
    }

    extractExpectedResults(promptLines) {
        const results = [];
        let isInResults = false;

        for (const line of promptLines) {
            if (line.startsWith('Expected Result:')) {
                isInResults = true;
                continue;
            }
            if (isInResults && line.trim()) {
                // Remove dash from the beginning of the result
                const result = line.replace(/^-\s*/, '').trim();
                if (result) {
                    results.push(result);
                }
            }
        }
        return results;
    }

    async generateTestFromPrompt(prompt) {
        const { title, steps, expectedResults } = await this.executePrompt(prompt);
        
        // Generate test code based on the prompt structure
        const testCode = `
test('${title}', async ({ page }) => {
    const testRunner = new AITestRunner(page);
    
    // Log test execution
    console.log('Executing test:', '${title}');
    
    // Execute test steps
    ${steps.map((step, index) => `
    // Step ${index + 1}: ${step}
    console.log('Executing step ${index + 1}:', '${step}');
    // Add step implementation here
    `).join('\n')}
    
    // Verify expected results
    ${expectedResults.map((result, index) => `
    // Verify result ${index + 1}: ${result}
    console.log('Verifying result ${index + 1}:', '${result}');
    // Add verification implementation here
    `).join('\n')}
});
`;
        return testCode;
    }
}

module.exports = { AITestRunner };
