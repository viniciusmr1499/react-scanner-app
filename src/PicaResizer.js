import React, { useEffect, useRef, useState } from "react";
import pica from "pica";

export const PicaResizer = ({ src, width = 800 }) => {
  const [resizedImage, setResizedImage] = useState(null);
  const imageRef = useRef(null);

  // Função para carregar e redimensionar a imagem base64
  const resizeImage = (imageSrc) => {
    const resizer = new pica();
    const img = new Image();

    img.onload = () => {
      // Calcular a altura mantendo a proporção da imagem original
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

  useEffect(() => {
    if (src) {
      resizeImage(src); // Redimensionar a imagem quando o `src` mudar
    }
  }, [src, width]);

  return (
    <div>
      <h2>Imagem Redimensionada</h2>
      {resizedImage ? (
        <img ref={imageRef} src={resizedImage} alt="Redimensionada" />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};
