Here’s the updated `README.md` for your OCR text recognition project, reflecting the latest changes:

---

# OCR Text Recognition

## Overview

This project is an OCR (Optical Character Recognition) tool that extracts text from image files. It provides a user-friendly interface to preview images, extract text, and export the extracted text to a Word document. The design is responsive and optimized for various devices.

## Features

- **Image Preview**: Allows users to preview the selected image before extraction.
- **Text Extraction**: Extracts text from the previewed image when the "Extract to Text" button is clicked.
- **Export to Word**: Exports the extracted text to a Word document for easy editing.
- **Clear Function**: Clears the image and extracted text, allowing for a new selection.
- **Responsive Design**: Ensures the application is usable on both mobile and desktop devices.
- **Loading Indicator**: Displays a spinner during the text extraction process to inform users of ongoing activity.

## Technologies Used

- **HTML**: Markup language for structuring the webpage.
- **CSS**: Styling the webpage with Bootstrap for responsive design and custom styles.
- **JavaScript**: Implements functionality for image handling, text extraction, and exporting.
- **Tesseract.js**: JavaScript library for performing OCR.
- **Bootstrap**: Framework for styling and responsive design.

## File Structure

```
public/
  css/
    styles.css
  js/
    script.js
  index.html
server.js
package.json
README.md
```

### `index.html`

Contains the HTML structure of the application, including:
- An image upload section.
- A preview section for the selected image.
- Buttons for extracting text, exporting to Word, and clearing inputs.
- A text area for displaying extracted text.
- A loading spinner to indicate ongoing text extraction.

### `styles.css`

Includes custom styles for:
- Container and layout adjustments.
- Image preview and text area styling.
- Button and loading spinner styling.
- Responsive design adjustments for various screen sizes.

### `script.js`

Handles the functionality for:
- Image previewing.
- Text extraction using Tesseract.js.
- Text exporting to a Word document.
- Clearing inputs and handling UI interactions.

### `server.js`

Sets up the Node.js server for handling requests. 

## Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd <project-directory>
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Start the Server**

   ```bash
   node server.js
   ```

5. **Open the Application**

   Visit `http://localhost:3000` in your browser.

## Usage

1. **Upload an Image**: Click the "Choose File" button to select an image from your device.
2. **Preview the Image**: The selected image will be displayed in the preview area.
3. **Extract Text**: Click the "Extract to Text" button to start the OCR process. The extracted text will appear in the text area.
4. **Export to Word**: Click the "Export to Word" button to download the extracted text as a Word document.
5. **Clear Inputs**: Click the "Clear" button to reset the application.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.