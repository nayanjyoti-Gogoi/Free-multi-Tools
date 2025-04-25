document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const input = document.getElementById('input');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const sentenceCount = document.getElementById('sentenceCount');
    const paragraphCount = document.getElementById('paragraphCount');
    const avgWordLength = document.getElementById('avgWordLength');
    const readingTime = document.getElementById('readingTime');

    // Add input event listener
    input.addEventListener('input', updateCounts);

    // Initial update
    updateCounts();

    function updateCounts() {
        const text = input.value;
        
        // Word count
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        wordCount.value = words;

        // Character count
        charCount.value = text.length;

        // Sentence count
        const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        sentenceCount.value = sentences;

        // Paragraph count
        const paragraphs = text.trim() === '' ? 0 : text.split(/\n+/).filter(p => p.trim().length > 0).length;
        paragraphCount.value = paragraphs;

        // Average word length
        if (words > 0) {
            const totalWordLength = text.trim().split(/\s+/).reduce((sum, word) => sum + word.length, 0);
            avgWordLength.value = (totalWordLength / words).toFixed(2) + ' characters';
        } else {
            avgWordLength.value = '0 characters';
        }

        // Reading time
        if (words > 0) {
            const minutes = Math.ceil(words / 200); // Assuming 200 words per minute reading speed
            readingTime.value = minutes === 1 ? '1 minute' : `${minutes} minutes`;
        } else {
            readingTime.value = '0 minutes';
        }
    }

    // Show error message
    function showError(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show';
        alertDiv.innerHTML = `
            <i class="bi bi-exclamation-triangle"></i> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.tool-content').prepend(alertDiv);
        setTimeout(() => alertDiv.remove(), 5000);
    }

    // Show success message
    function showSuccess(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show';
        alertDiv.innerHTML = `
            <i class="bi bi-check-circle"></i> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.tool-content').prepend(alertDiv);
        setTimeout(() => alertDiv.remove(), 5000);
    }
}); 