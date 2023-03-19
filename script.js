const form = document.getElementById("form");
const urlInput = document.getElementById("url");
const generateButton = document.getElementById("button-generate");
const qrCode = document.getElementById("qr-code");
const qrFileNameText = document.getElementById("qr-file-text");
const qrDimensionsText = document.getElementById("qr-dimensions-text");
const downloadButton = document.getElementById("button-download");
const sizeInput = document.getElementById("size-input");
const sizeLabel = document.getElementById("size-input-label-text");

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

const onSubmit = async (e) => {
  console.log("submitted");
  e.preventDefault();
  const data = new FormData(form);
  const url = data.get("url");
  const size = data.get("size");
  const color = data.get("color");
  console.log(color);
  await clear();
  generateQrCode(url, size, color);
  formatBorder(size);
  changeCaption(url, size);
  if (!hasGenerated) {
    enableDownload();
  }
};

const clear = () => {
  return new Promise((resolve) => {
    // wrap the animation in a Promise
    const keyframes = {
      opacity: 0,
    };
    const animation = qrCode.animate(keyframes, {
      duration: 200,
    });
    animation.onfinish = () => {
      qrCode.innerHTML = "";
      resolve(); // resolve the Promise when the animation is finished
    };
  });
};

const formatBorder = (size) => {
  qrCode.style.padding = Math.min(25, size / 10).toString() + "px";
  qrCode.style.backgroundColor = "white";
};

const generateQrCode = (url, size, color) => {
  qr = new QRCode(qrCode, {
    text: url,
    width: size,
    height: size,
    colorDark: color,
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
  const canvas = document.querySelector("#qr-code canvas");
  link.href = canvas.toDataURL();
  link.download = fileNameText;
  link.click();
};

form.addEventListener("submit", onSubmit);

urlInput.addEventListener("keypress", (e) => {
  console.log("key pressed");
  if (e.key === "Enter") {
    //generateButton.click();
  }
});

sizeInput.addEventListener("change", (e) => {
  sizeLabel.textContent = `\u00D7${e.target.value}px`;
});
