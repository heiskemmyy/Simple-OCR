document.getElementById('convertButton').addEventListener('click', () => {
    const imageUpload = document.getElementById('imageUpload').files[0];
    if (imageUpload) {
        const formData = new FormData();
        formData.append('image', imageUpload);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = data.text;
        })
        .catch(error => {
            console.error(error);
            document.getElementById('result').innerText = 'Error recognizing text.';
        });
    } else {
        alert('Please upload an image first.');
    }
});
