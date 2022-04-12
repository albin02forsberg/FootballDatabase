import React, { useEffect } from "react";

export default function Canvas({ setImage }) {
  const canvasRef = React.useRef(null);
  const ctxRef = React.useRef(null);
  const [tool, setTool] = React.useState("");
  const [startX, setStartX] = React.useState(0);
  const [startY, setStartY] = React.useState(0);
  const [endX, setEndX] = React.useState(0);
  const [endY, setEndY] = React.useState(0);
  const [history, setHistory] = React.useState([]);

  const drawFull = (ctx) => {
    ctx.beginPath();

    // Draw green stripes
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = "white";
    ctx.lineWidth = "2";

    ctx.moveTo(1, 1);
    ctx.lineTo(499, 1);
    ctx.lineTo(499, 749);
    ctx.lineTo(1, 749);
    ctx.lineTo(1, 1);

    ctx.moveTo(1, 375);
    ctx.lineTo(499, 375);

    ctx.moveTo(250, 375);

    // Draw middle circle
    ctx.arc(250, 375, 5, 0, 2 * Math.PI);
    ctx.arc(250, 375, 90, 0, 2 * Math.PI);

    // Draw penalty boxes
    ctx.moveTo(250, 1);
    ctx.moveTo(100, 1);
    ctx.lineTo(100, 150);
    ctx.lineTo(400, 150);
    ctx.lineTo(400, 1);

    ctx.moveTo(100, 749);
    ctx.lineTo(100, 600);
    ctx.lineTo(400, 600);
    ctx.lineTo(400, 749);

    // Draw goal boxes
    ctx.moveTo(250, 1);
    ctx.moveTo(200, 1);
    ctx.lineTo(200, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 1);

    ctx.moveTo(200, 749);
    ctx.lineTo(200, 700);
    ctx.lineTo(300, 700);
    ctx.lineTo(300, 749);

    // Draw corner arcs
    ctx.moveTo(1, 1);
    ctx.arc(1, 1, 5, 2, 2 * Math.PI);
    ctx.moveTo(1, 749);
    ctx.arc(1, 749, 5, 0, 2 * Math.PI);
    ctx.moveTo(499, 1);
    ctx.arc(499, 749, 5, 0, 2 * Math.PI);
    ctx.moveTo(499, 749);
    ctx.arc(499, 1, 5, 0, 2 * Math.PI);

    // Adding penalty box arcs
    ctx.moveTo(250, 150);
    ctx.arc(250, 150, 60, 0, Math.PI);

    ctx.moveTo(250, 600);
    ctx.arc(250, 600, 60, 180, Math.Pi);

    ctx.stroke();
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
    } else {
      setStartX(offsetX);
      setStartY(offsetY);
    }
    setImage(canvasRef.current.toDataURL("image/png"), 0.001);
  };

  const stopDrawing = ({ nativeEvent }) => {
    // const { offsetX, offsetY } = nativeEvent;
    if (tool === "player") {
      // Draw dashed arrow from start to end
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(startX, startY);
      ctxRef.current.lineTo(endX, endY);
      ctxRef.current.setLineDash([5, 5]);
      ctxRef.current.lineWidth = 2;
      ctxRef.current.stroke();
      ctxRef.current.setLineDash([]);

      // Draw arrow head pointing in the degree of the arrow
      const angle = Math.atan2(endY - startY, endX - startX);
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(endX, endY);
      ctxRef.current.lineTo(
        endX - 10 * Math.cos(angle - Math.PI / 6),
        endY - 10 * Math.sin(angle - Math.PI / 6)
      );
      ctxRef.current.moveTo(endX, endY);
      ctxRef.current.lineTo(
        endX - 10 * Math.cos(angle + Math.PI / 6),
        endY - 10 * Math.sin(angle + Math.PI / 6)
      );
    } else if (tool === "arrow") {
      // Draw solid arrow from start to end
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(startX, startY);
      ctxRef.current.lineTo(endX, endY);
      ctxRef.current.lineWidth = 2;
      ctxRef.current.stroke();

      // Draw arrow head pointing in the degree of the arrow
      const angle = Math.atan2(endY - startY, endX - startX);
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(endX, endY);
      ctxRef.current.lineTo(
        endX - 10 * Math.cos(angle - Math.PI / 6),
        endY - 10 * Math.sin(angle - Math.PI / 6)
      );
      ctxRef.current.moveTo(endX, endY);
      ctxRef.current.lineTo(
        endX - 10 * Math.cos(angle + Math.PI / 6),
        endY - 10 * Math.sin(angle + Math.PI / 6)
      );
    } else if (tool === "playerWithBall") {
      // Draw wave from start to end
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(startX, startY);

      ctxRef.current.lineWidth = 2;

      let length = Math.sqrt(
        Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
      );

      // // Draw 10 archs with a length of lenght/10
      // for (let i = 0; i < 10; i++) {
      //   if (i % 2 === 0) {
      //     ctxRef.current.bezierCurveTo(
      //       startX + ((endX - startX) / 10) * i + 20,
      //       startY + ((endY - startY) / 10) * i + 20,
      //       startX + ((endX - startX) / 10) * i,
      //       startY + ((endY - startY) / 10) * i,
      //       startX + ((endX - startX) / 10) * i,
      //       startY + ((endY - startY) / 10) * i
      //     );
      //   } else {
      //     ctxRef.current.bezierCurveTo(
      //       startX + ((endX - startX) / 10) * i - 20,
      //       startY + ((endY - startY) / 10) * i - 20,
      //       startX + ((endX - startX) / 10) * i,
      //       startY + ((endY - startY) / 10) * i,
      //       startX + ((endX - startX) / 10) * i,
      //       startY + ((endY - startY) / 10) * i
      //     );
      //   }
      // }

      // Draw sinus wave with length of length and pointing in the degree of the arrow
      for (let i = 0; i < length; i++) {
        ctxRef.current.lineTo(
          startX +
            ((endX - startX) / length) * i +
            20 * Math.sin((i / length) * Math.PI * 2),
          startY +
            ((endY - startY) / length) * i +
            20 * Math.cos((i / length) * Math.PI * 2)
        );
      }

      // Draw arrow head pointing in the degree of the arrow
      const angle = Math.atan2(endY - startY, endX - startX);
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(endX, endY);
      ctxRef.current.lineTo(
        endX - 10 * Math.cos(angle - Math.PI / 6),
        endY - 10 * Math.sin(angle - Math.PI / 6)
      );
      ctxRef.current.moveTo(endX, endY);
      ctxRef.current.lineTo(
        endX - 10 * Math.cos(angle + Math.PI / 6),
        endY - 10 * Math.sin(angle + Math.PI / 6)
      );
    }

    ctxRef.current.stroke();
    ctxRef.current.closePath();

    setHistory([...history, canvasRef.current.toDataURL("image/png")]);
  };

  const setPos = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setEndX(offsetX);
    setEndY(offsetY);
  };

  const undo = () => {
    if (history.length > 1) {
      ctxRef.current.clearRect(0, 0, 500, 750);

      // Change canvas to previous image
      const img = new Image();
      img.src = history[history.length - 2];
      img.onload = () => {
        ctxRef.current.drawImage(img, 0, 0);
      };

      setHistory(history.slice(0, history.length - 1));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    drawFull(ctx);
    setHistory([canvas.toDataURL("image/png")]);
  }, []);

  return (
    <div className="canvas">
      <button onClick={undo}>Undo</button>
      <canvas
        id="canvas"
        width={500}
        height={750}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={setPos}
        className="canvas"
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
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio5"
          autocomplete="off"
          onChange={() => setTool("player")}
        />
        <label class="btn btn-outline-primary" for="btnradio5">
          Spelarens väg
        </label>
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio7"
          autocomplete="off"
          onChange={() => setTool("playerWithBall")}
        />
        <label class="btn btn-outline-primary" for="btnradio7">
          Spelarens väg med boll
        </label>
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio6"
          autocomplete="off"
          onChange={() => setTool("arrow")}
        />
        <label class="btn btn-outline-primary" for="btnradio6">
          Bollens bana
        </label>
      </div>
    </div>
  );
}
