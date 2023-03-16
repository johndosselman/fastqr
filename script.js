const form = document.getElementById("form");
const qr = document.getElementById("qrcode");

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
  }
};

const clear = () => {
  qr.innerHTML = "";
};

const createBorder = (size) => {
  const padding = (size / 10).toString() + "px";
  document.getElementById("qrborder").style.padding = padding;
  document.getElementById("qrborder").style.backgroundColor = "white";
};

const generateQrCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

form.addEventListener("submit", onSubmit);
