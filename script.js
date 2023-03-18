const form = document.getElementById("form");
const urlInput = document.getElementById("url");
const generateButton = document.getElementById("button-generate");
const qrCode = document.getElementById("qr-code");
const qrFileNameText = document.getElementById("qr-file-text");
const qrDimensionsText = document.getElementById("qr-dimensions-text");
const downloadButton = document.getElementById("button-download");

var hasGenerated = false;
var fileNameText;
var dimensionsText;
var qr = new QRCode(qrCode, {
  text: "https://fastqr.netlify.app",
  width: "200",
  height: "200",
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
  const image = qrCode.getElementsByTagName("img");
  const qrImage = image[0].src;
  const link = document.createElement("a");
  link.href = qrImage;
  link.download = "qr-code.png";
  link.addEventListener(
    "click",
    () => {
      setTimeout(() => URL.revokeObjectURL(link.href), 1500);
    },
    { once: true }
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

form.addEventListener("submit", onSubmit);

urlInput.addEventListener("keypress", (e) => {
  console.log("key pressed");
  if (e.key === "Enter") {
    //generateButton.click();
  }
});
