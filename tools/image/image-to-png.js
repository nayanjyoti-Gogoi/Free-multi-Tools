document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const imageInput = document.getElementById('imageInput');
    const qualitySlider = document.getElementById('quality');
    const qualityValue = document.getElementById('qualityValue');
    const convertBtn = document.getElementById('convert');
    const downloadBtn = document.getElementById('download');
    const preview = document.getElementById('preview');
    let convertedImage = null;

    // Update quality value display
    qualitySlider.addEventListener('input', function() {
        qualityValue.textContent = this.value + '%';
    });

    // Handle image input
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                showError('Please select an image file');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.classList.remove('d-none');
                convertBtn.disabled = false;
            };
            reader.readAsDataURL(file);
        }
    });

    // Convert button click handler
    convertBtn.addEventListener('click', function() {
        try {
            if (!imageInput.files[0]) {
                showError('Please select an image first');
                return;
            }

            const quality = qualitySlider.value / 100;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                // Convert to PNG
                convertedImage = canvas.toDataURL('image/png', quality);
                preview.src = convertedImage;
                downloadBtn.disabled = false;
                showSuccess('Image converted successfully');
            };

            img.src = URL.createObjectURL(imageInput.files[0]);
        } catch (error) {
            showError('Error converting image: ' + error.message);
        }
    });

    // Download button click handler
    downloadBtn.addEventListener('click', function() {
        try {
            if (!convertedImage) {
                showError('No converted image available');
                return;
            }

            const link = document.createElement('a');
            link.href = convertedImage;
            link.download = 'converted-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showSuccess('Download started');
        } catch (error) {
            showError('Error downloading image: ' + error.message);
        }
    });

    // Function to show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger alert-dismissible fade show';
        errorDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.tool-content').prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }

    // Function to show success message
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success alert-dismissible fade show';
        successDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.tool-content').prepend(successDiv);
        setTimeout(() => successDiv.remove(), 5000);
    }
}); 