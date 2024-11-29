const from = document.getElementById("imgSrc");
const canvas = document.getElementById("imgTo");

export const generateImageData = async (img, minWidthHeigh = 224) => {
  console.log("aaaaaaa", img);
  let newHeight = img.height;
  let newWidth = img.width;

  if (img.width > img.height) {
    if (img.height >= minWidthHeigh) {
      const ratio = minWidthHeigh / img.height;

      newHeight = minWidthHeigh;
      newWidth = Math.round(img.width * ratio);
    }
  }

  if (img.width <= img.height) {
    if (img.width >= minWidthHeigh) {
      const ratio = minWidthHeigh / img.width;

      newHeight = Math.round(img.height * ratio);
      newWidth = minWidthHeigh;
    }
  }

  console.log(`w: ${img.width}, h: ${img.height}`);
  console.log(`w: ${newWidth}, h: ${newHeight}`);

  // console.time("transformInCanvas");
  // let canvas = new OffscreenCanvas(img.width, img.height);
  canvas.width = newWidth;
  canvas.height = newHeight;

  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, newWidth, newHeight);

  const imageData = canvas
    .getContext("2d")
    .getImageData(0, 0, newWidth, newHeight);

  // console.timeEnd("transformInCanvas");

  return imageData;
};
