let serverIp = "";

const getServerIp = async () => {
  try {
    const response = await fetch("/server-ip");
    const data = await response.json();
    serverIp = data.ip;
  } catch (error) {
    console.error("Error fetching server IP:", error);
  }
};

document.addEventListener("DOMContentLoaded", getServerIp);

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
  } else {
    alert("Unsupported file type. Please upload an image.");
    preview.style.display = "none";
  }
});

const convertFileToText = () => {
  if (!serverIp) {
    alert("Server IP not fetched yet. Please try again.");
    return;
  }

  const fileUpload = document.getElementById("fileUpload").files[0];
  if (fileUpload) {
    const formData = new FormData();
    formData.append("file", fileUpload);

    fetch(`https://${serverIp}:4001/upload`, {
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
  document.getElementById('fileUpload').value = '';
  document.getElementById('filePreview').style.display = 'none';
  document.getElementById('result').innerText = '';
  document.getElementById('retryButton').style.display = 'none';
};

document.getElementById("convertButton").addEventListener("click", convertFileToText);
document.getElementById("retryButton").addEventListener("click", convertFileToText);
document.getElementById("resetButton").addEventListener("click", resetUpload);
