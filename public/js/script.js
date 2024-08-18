// DOM Elements
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const extractTextBtn = document.getElementById('extractTextBtn');
const extractedTextArea = document.getElementById('extractedText');
const exportToWordBtn = document.getElementById('exportToWordBtn');
const clearBtn = document.getElementById('clearBtn');

// Image preview functionality
imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreviewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.src = '';
        imagePreviewContainer.style.display = 'none';
    }
});

// OCR text extraction functionality
extractTextBtn.addEventListener('click', function() {
    const file = imageUpload.files[0];
    if (!file) {
        alert("Please select an image first.");
        return;
    }

    Tesseract.recognize(
        file,
        'eng',
        {
            logger: function(m) {
                console.log(m); // Progress
            }
        }
    ).then(function(result) {
        extractedTextArea.value = result.data.text;
    }).catch(function(error) {
        console.error(error);
        alert("Text extraction failed. Please try again.");
    });
});

// Export text to Word file
exportToWordBtn.addEventListener('click', function() {
    const text = extractedTextArea.value;
    if (!text) {
        alert("No text to export. Please extract the text first.");
        return;
    }

    const blob = new Blob([text], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'extracted-text.doc';
    link.click();
});

// Clear button functionality
clearBtn.addEventListener('click', function() {
    imageUpload.value = '';
    imagePreview.src = '';
    imagePreviewContainer.style.display = 'none';
    extractedTextArea.value = '';
});
