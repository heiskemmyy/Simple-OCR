document.getElementById("fileUpload").addEventListener("change", (event) => {
  const file = event.target.files[0];
  const preview = document.getElementById("filePreview");
  const reader = new FileReader();

  if (file && file.type.startsWith("image/")) {
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else if (file && file.type === "application/pdf") {
    preview.style.display = "none";
  } else {
    alert("Unsupported file type. Please upload an image or PDF.");
    preview.style.display = "none";
  }
});

const convertFileToText = () => {
  const fileUpload = document.getElementById("fileUpload").files[0];
  if (fileUpload) {
    const formData = new FormData();
    formData.append("file", fileUpload);

    fetch("http://10.40.65.17:4001/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        document.getElementById("result").innerText = data.text;
        document.getElementById("retryButton").style.display = "none";
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        document.getElementById("result").innerText =
          "Error recognizing text. Please try again.";
        document.getElementById("retryButton").style.display = "block";
      });
  } else {
    alert("Please upload a file first.");
  }
};

const resetUpload = () => {
  document.getElementById("fileUpload").value = "";
  document.getElementById("filePreview").style.display = "none";
  document.getElementById("result").innerText = "";
  document.getElementById("retryButton").style.display = "none";
};

document
  .getElementById("convertButton")
  .addEventListener("click", convertFileToText);
document
  .getElementById("retryButton")
  .addEventListener("click", convertFileToText);
document.getElementById("resetButton").addEventListener("click", resetUpload);
