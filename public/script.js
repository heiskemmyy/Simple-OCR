document.getElementById('fileUpload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const preview = document.getElementById('filePreview');
    const reader = new FileReader();

    reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = 'block';
    };

    if (file && file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
});

document.getElementById('convertButton').addEventListener('click', () => {
    const fileUpload = document.getElementById('fileUpload').files[0];
    if (fileUpload) {
        const formData = new FormData();
        formData.append('file', fileUpload);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('result').innerText = data.text;
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('result').innerText = 'Error recognizing text. Please try again.';
        });
    } else {
        alert('Please upload a file first.');
    }
});
