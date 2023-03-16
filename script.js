const form = document.getElementById("form");
const qr = document.getElementById("qrcode");
const qrborder = document.getElementById("qrborder");
const qrFileNameText = document.getElementById("qrFileNameText");
const qrDimensionsText = document.getElementById("qrDimensionsText");
const downloadButton = document.getElementById("downloadButton");

var isGenerated = false;

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
    createBorder(size);
    changeCaption(url, size);
    if (!isGenerated) {
      enableDownload();
    }
  }
};

const clear = () => {
  qr.innerHTML = "";
};

const createBorder = (size) => {
  const padding = (size / 10).toString() + "px";
  qrborder.style.padding = padding;
  qrborder.style.backgroundColor = "white";
};

const generateQrCode = (url, size) => {
  new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const changeCaption = (url, size) => {
  const fileNameText = `${url}.png`;
  const dimensionsText = `${size}x${size}px`;
  qrFileNameText.textContent = fileNameText;
  qrDimensionsText.textContent = dimensionsText;
};

const enableDownload = () => {
  qrFileNameText.style.color = "var(--primary-color)";
  qrDimensionsText.style.color = "var(--primary-color)";
  downloadButton.disabled = false;
  isGenerated = true;
};

form.addEventListener("submit", onSubmit);
