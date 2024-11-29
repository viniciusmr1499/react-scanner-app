import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { ImageEditor } from "./ImageEditor";
import { IntuitiveCropper } from "./IntuitiveCropper";

export const DocumentScanner = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState("");

  const captureImage = () => {
    if (webcamRef.current) {
      const capturedImage = webcamRef.current.getScreenshot();
      if (capturedImage) {
        setImage(capturedImage);
      }
    }
  };
  return (
    <div>
      <h1>Capturar imagem</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ maxHeight: "100%", height: 400, maxWidth: "100%" }}
      />
      <br />
      <button onClick={captureImage}>Capturar Imagem</button>

      {/* {image && <ImageEditor src={image} width={400} />} */}
      {image && <IntuitiveCropper src={image} />}
    </div>
  );
};
