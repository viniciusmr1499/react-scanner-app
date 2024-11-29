import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export const IntuitiveCropper = ({ imageSrc, onSave }) => {
  const cropperRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleRotate = (degree) => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.rotate(degree);
    }
  };

  const handleSave = () => {
    if (croppedImage && onSave) {
      onSave(croppedImage);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Cropper
          id="oiiiii"
          src={imageSrc}
          style={{
            height: "400px",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
          }}
          guides={true}
          ref={cropperRef}
          viewMode={1} // Limita a exibição fora do canvas
          background={false}
          aspectRatio={1} // Proporção de corte
          autoCropArea={1}
          movable={true}
          rotatable={true}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={() => handleRotate(-90)}>🔄 Rotar -90°</button>
        <button onClick={handleCrop}>✂️ Cortar</button>
        <button onClick={handleSave}>💾 Salvar</button>
      </div>

      {croppedImage && (
        <div style={{ marginTop: "20px" }}>
          <h3>Imagem cortada:</h3>
          <img
            src={croppedImage}
            alt="Cropped"
            style={{ maxWidth: "100%", border: "1px solid #ddd" }}
          />
        </div>
      )}
    </div>
  );
};
