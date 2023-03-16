const form = document.getElementById("form");
const qrCode = document.getElementById("qrCode");
const qrFileNameText = document.getElementById("qrFileNameText");
const qrDimensionsText = document.getElementById("qrDimensionsText");
const downloadButton = document.getElementById("downloadButton");

var hasGenerated = false;
var fileNameText;
var dimensionsText;
var qr = new QRCode(qrCode, {
  text: "https://fastqr.netlify.app",
  width: "600",
  height: "600",
  colorDark: "#141414",
  colorLight: "rgb(100, 100, 100)",
});

const onSubmit = (e) => {
  console.log("submitted");
  e.preventDefault();
  const url = document.getElementById("url").value;
  const size = 100;

  if (url === "") {
    alert("please enter a url");
  } else {
    clear();
    generateQrCode(url, size);
    formatBorder(size);
    changeCaption(url, size);
    if (!hasGenerated) {
      enableDownload();
    }
  }
};

const clear = () => {
  qrCode.innerHTML = "";
};

const formatBorder = (size) => {
  qrCode.style.padding = (size / 10).toString() + "px";
  qrCode.style.backgroundColor = "white";
};

const generateQrCode = (url, size) => {
  qr = new QRCode(qrCode, {
    text: url,
    width: size,
    height: size,
  });
};

const changeCaption = (url, size) => {
  fileNameText = `${url}.png`;
  dimensionsText = `${size}x${size}px`;
  qrFileNameText.textContent = fileNameText;
  qrDimensionsText.textContent = dimensionsText;
};

const enableDownload = () => {
  qrFileNameText.style.color = "var(--primary-color)";
  qrDimensionsText.style.color = "var(--primary-color)";
  downloadButton.disabled = false;
  hasGenerated = true;
};

const download = () => {
  console.log("download");
  const link = document.createElement("a");
  link.download = fileNameText;
  link.href = qrCode.querySelector("img").src;
  link.click();
};

form.addEventListener("submit", onSubmit);
