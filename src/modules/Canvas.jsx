import { collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import React, { useEffect } from "react";
import { db, storage } from "../firebase-config";

export default function Canvas() {
  const canvasRef = React.useRef(null);
  const ctxRef = React.useRef(null);
  let imgBg = new Image();
  //   imgBg.src =
  //     "https://firebasestorage.googleapis.com/v0/b/footballdatabase-437cb.appspot.com/o/assets%2Ffield.png?alt=media&token=680e6eb5-5c9c-4d8e-9577-bf19759759ee";
  imgBg.src = "./field.png";
  const [tool, setTool] = React.useState("");
  const [img, setImg] = React.useState("");

  const draw = (ctx) => {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (tool === "circle") {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
      // Draw circle with red border and white fill
      ctxRef.current.lineWidth = 2;
      ctxRef.current.beginPath();
      ctxRef.current.arc(offsetX, offsetY, 10, 0, Math.PI * 2, true);
      ctxRef.current.stroke();
    } else if (tool === "X") {
      // Draw x
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
      ctxRef.current.lineWidth = 2;
      ctxRef.current.lineTo(offsetX + 10, offsetY + 10);
      ctxRef.current.stroke();
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY + 10);
      ctxRef.current.lineTo(offsetX + 10, offsetY);
      ctxRef.current.stroke();
    } else if (tool === "circleX") {
      // Draw x inside a circle
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
      ctxRef.current.lineWidth = 2;
      ctxRef.current.beginPath();
      ctxRef.current.arc(offsetX, offsetY, 10, 0, Math.PI * 2, true);
      ctxRef.current.stroke();
      // Draw x
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
      ctxRef.current.lineWidth = 2;
      ctxRef.current.lineTo(offsetX + 7, offsetY + 7);
      ctxRef.current.moveTo(offsetX, offsetY);
      ctxRef.current.lineTo(offsetX + 7, offsetY - 7);
      ctxRef.current.moveTo(offsetX, offsetY);
      ctxRef.current.lineTo(offsetX - 7, offsetY - 7);
      ctxRef.current.moveTo(offsetX, offsetY);
      ctxRef.current.lineTo(offsetX - 7, offsetY + 7);
      ctxRef.current.stroke();
    } else if (tool === "ball") {
      // Draw circle and fill with black
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
      ctxRef.current.lineWidth = 2;
      ctxRef.current.beginPath();
      ctxRef.current.arc(offsetX, offsetY, 5, 0, Math.PI * 2, true);
      ctxRef.current.fill();
    }
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imgBg, 0, 0, canvas.width, canvas.height);
    ctxRef.current = ctx;
  }, []);

  const testing = collection(db, "test");

  const test = () => {
    const storageRef = ref(storage, "test/" + Date.now() + ".png");
    // Upload the canvas as a PNG to Firebase Storage
    const imgData = ctxRef.current.getImageData(
      0,
      0,
      imgBg.width,
      imgBg.height
    );
    uploadBytes(storageRef, ImageData, { contentType: "image/png" });
  };

  return (
    <div className="canvas">
      <canvas
        id="canvas"
        width={imgBg ? imgBg.width : 0}
        height={imgBg ? imgBg.height : 0}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
      />
      <div
        class="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          autocomplete="off"
          onChange={() => setTool("circleX")}
        />
        <label class="btn btn-outline-primary" for="btnradio1">
          Anfallare med boll
        </label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          autocomplete="off"
          onChange={() => setTool("X")}
        />
        <label class="btn btn-outline-primary" for="btnradio2">
          Anfallare utan boll
        </label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio3"
          autocomplete="off"
          onChange={() => setTool("circle")}
        />
        <label class="btn btn-outline-primary" for="btnradio3">
          Försvarare
        </label>
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio4"
          autocomplete="off"
          onChange={() => setTool("ball")}
        />
        <label class="btn btn-outline-primary" for="btnradio4">
          Boll
        </label>
      </div>
      <button onClick={test}>Test</button>
    </div>
  );
}
