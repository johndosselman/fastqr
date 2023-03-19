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

const onSubmit = async (e) => {
  console.log("submitted");
  e.preventDefault();
  const url = document.getElementById("url").value;
  const size = 100;

  if (url === "") {
    alert("please enter a url");
  } else {
    await clear();
    generateQrCode(url, size);
    formatBorder(size);
    changeCaption(url, size);
    if (!hasGenerated) {
      enableDownload();
    }
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

// // Create a div element
// const trailer = document.getElementById("trailer");

// // Set the CSS properties for the div
// trailer.style.zIndex = "-1";
// trailer.style.width = "200rem";
// trailer.style.height = "200rem";
// trailer.style.borderRadius = "50%";
// trailer.style.position = "fixed";
// trailer.style.background =
//   "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(20,20,20,0) 100%)";
// trailer.style.pointerEvents = "none";

// // Add the div to the document body
// document.body.appendChild(trailer);

// // Move the div with the cursor
// window.onmousemove = (e) => {
//   const x = e.clientX - trailer.offsetWidth / 2;
//   const y = e.clientY - trailer.offsetHeight / 2;

//   const keyframes = {
//     transform: `translate(${x}px, ${y}px)`,
//   };

//   trailer.animate(keyframes, {
//     duration: 5000,
//     fill: "forwards",
//   });
// };
