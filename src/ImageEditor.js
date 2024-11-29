import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import pica from "pica";

export const ImageEditor = ({ src, width = 800 }) => {
  const [image, setImage] = useState(src);
  const [resizedImage, setResizedImage] = useState(null);
  const cropperRef = useRef(null);

  const resizeImage = (imageSrc) => {
    const resizer = new pica();
    const img = new Image();

    img.onload = () => {
      // Calcular a altura mantendo a proporção
      const { width: imgWidth, height: imgHeight } = img;
      const resizeHeight = (width * imgHeight) / imgWidth;

      // Criar um canvas para desenhar a imagem redimensionada
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = resizeHeight;

      // Usar pica.js para redimensionar a imagem
      resizer
        .resize(img, canvas)
        .then((result) => resizer.toBlob(result, "image/png")) // Converte o canvas em um Blob
        .then((blob) => {
          // Cria uma URL a partir do Blob e exibe no <img>
          setResizedImage(URL.createObjectURL(blob));
        })
        .catch((error) =>
          console.error("Erro ao redimensionar a imagem:", error)
        );
    };

    img.onerror = (err) => console.error("Erro ao carregar a imagem:", err);
    img.src = imageSrc; // Definir o caminho da imagem (base64 ou URL)
  };

  const onCrop = () => {
    const cropperInstance = cropperRef.current?.cropper;
    if (cropperInstance) {
      const croppedCanvas = cropperInstance.getCroppedCanvas();
      const croppedDataUrl = croppedCanvas.toDataURL();
      setImage(croppedDataUrl); // Atualiza a imagem com a parte cortada
      resizeImage(croppedDataUrl); // Redimensiona a imagem cortada
    }
  };

  useEffect(() => {
    if (src) {
      resizeImage(src); // Redimensiona a imagem inicial
    }
  }, [src, width]);

  return (
    <div>
      <h2>Editor de Imagem</h2>

      <Cropper
        ref={cropperRef}
        src={image}
        aspectRatio={1}
        guides={false}
        style={{
          width: "100%",
          height: "400px",
        }}
      />
      <br />
      <button onClick={onCrop}>Aplicar Corte</button>

      <h3>Imagem Redimensionada</h3>
      {resizedImage ? (
        <img src={resizedImage} alt="Imagem Redimensionada" />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};
