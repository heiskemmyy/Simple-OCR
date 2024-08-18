# OCR Text Recognition App

This project is a simple OCR (Optical Character Recognition) web application that extracts text from image files and allows users to export the extracted text to a Word file. The app features a clear button to reset the process and a responsive design for both desktop and mobile views.

## Features
1. **Image Preview**: Preview the selected image before extracting the text.
2. **Extract to Text**: Extract text from the image using Tesseract.js.
3. **Export to Word**: Download the extracted text as a `.doc` file.
4. **Clear Functionality**: Reset the image preview and extracted text.
5. **Responsive Design**: Optimized for mobile and desktop views.
6. **Loading Indicator**: Displays a spinner while the text extraction is in progress.

## Technologies Used
- **HTML**: Structure of the app.
- **CSS**: Styling and responsiveness.
- **JavaScript**: Image handling, text extraction, export functionality, and clear button.
- **Tesseract.js**: OCR engine for text extraction.
- **Bootstrap**: UI framework for styling and loading indicator.

## Getting Started

### Prerequisites
- A modern browser (Chrome, Firefox, Edge, etc.).
- An internet connection to access the Tesseract.js and Bootstrap CDNs.

### Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ocr-text-recognition.git
    cd ocr-text-recognition
    ```

2. **Open the project:**
   Open the `index.html` file in a browser.

### Usage

1. **Select an image**: Click the file input to select an image from your device.
2. **Preview the image**: The image will be displayed in the preview area.
3. **Extract text**: Click the "Extract to Text" button to start the OCR process and view the extracted text in the textarea.
4. **Export to Word**: After extracting the text, click the "Export to Word" button to download the text as a Word

 document.
5. **Clear**: Click the "Clear" button to reset the image preview and extracted text.

## Project Structure

```
- public/
  - css/
    - styles.css        # Styles for the UI
  - js/
    - script.js         # OCR and export logic
  - index.html          # Main UI
- README.md             # Project documentation
```

## Future Improvements
- Add support for multiple languages in OCR.
- Include additional image processing features to improve text recognition.
- Allow users to copy or edit extracted text directly within the app.

## License
This project is licensed under the MIT License.
