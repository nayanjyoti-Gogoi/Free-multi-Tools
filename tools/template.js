document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const processBtn = document.getElementById('process');
    const copyBtn = document.getElementById('copy');
    const downloadBtn = document.getElementById('download');
    const options = document.getElementById('options');

    // Process button click handler
    processBtn.addEventListener('click', function() {
        try {
            // Get input value
            const inputValue = input.value.trim();
            
            // Validate input
            if (!inputValue) {
                showError('Please enter some input');
                return;
            }

            // Process the input based on selected options
            const result = processInput(inputValue, options.value);
            
            // Display the result
            output.value = result;
            showSuccess('Processing completed successfully');
        } catch (error) {
            showError('An error occurred while processing: ' + error.message);
        }
    });

    // Copy button click handler
    copyBtn.addEventListener('click', function() {
        try {
            // Select the text
            output.select();
            // Copy to clipboard
            document.execCommand('copy');
            showSuccess('Copied to clipboard');
        } catch (error) {
            showError('Failed to copy to clipboard');
        }
    });

    // Download button click handler
    downloadBtn.addEventListener('click', function() {
        try {
            const content = output.value;
            if (!content) {
                showError('No content to download');
                return;
            }

            // Create a blob and download link
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'result.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showSuccess('Download started');
        } catch (error) {
            showError('Failed to download file');
        }
    });

    // Function to process input
    function processInput(input, option) {
        // Tool-specific processing logic goes here
        return input;
    }

    // Function to show error message
    function showError(message) {
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger alert-dismissible fade show';
        errorDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insert before the tool content
        document.querySelector('.tool-content').prepend(errorDiv);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Function to show success message
    function showSuccess(message) {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success alert-dismissible fade show';
        successDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insert before the tool content
        document.querySelector('.tool-content').prepend(successDiv);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}); 