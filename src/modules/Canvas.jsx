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
  const [canvasWidth, setCanvasWidth] = React.useState(0);
  const [canvasHeight, setCanvasHeight] = React.useState(0);
  const [fieldType, setFieldType] = React.useState("full");
  const [text, setText] = React.useState("");

  const drawGreen = (ctx) => {
    ctx.beginPath();

    // Draw green stripes
    ctx.strokeStyle = "white";
    ctx.lineWidth = "2";
    ctx.fillStyle = "#74CB8B";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "white";

    for (let y = 0; y < ctx.canvas.height; y += 50) {
      ctx.fillStyle = "#75C181";
      ctx.fillRect(0, y, ctx.canvas.width, 25);
    }

    ctx.stroke();
  };

  const drawFull = (ctx) => {
    setCanvasHeight(750);
    setCanvasWidth(500);
    ctx.beginPath();

    // Draw green stripes
    ctx.fillStyle = "#74CB8B";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let y = 0; y < ctx.canvas.height; y += 50) {
      ctx.fillStyle = "#75C181";
      ctx.fillRect(0, y, ctx.canvas.width, 25);
    }

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
    // Draw inverted penalty box arcs
    ctx.moveTo(250, 600);
    ctx.arc(250, 600, 60, 0, Math.PI, true);
    ctx.stroke();
    ctx.beginPath();

    // Draw penalty spots
    ctx.arc(250, 100, 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(250, 650, 2, 0, 2 * Math.PI);

    ctx.stroke();
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log(ctxRef.current.strokeStyle);
    ctxRef.current.strokeStyle = "white";
    ctxRef.current.fillStyle = "white";
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
      let ball = new Image();
      ball.src = "./ball.svg";
      ball.onload = () => {
        ctxRef.current.drawImage(ball, offsetX - 7, offsetY - 7, 15, 15);
      };
    } else if (tool === "cone") {
      let cone = new Image();
      cone.src = "./cone.svg";
      cone.onload = () => {
        ctxRef.current.drawImage(cone, offsetX - 7, offsetY - 7, 20, 20);
      };
    } else if (tool === "mv") {
      // Write mv text
      ctxRef.current.font = "20px Arial";
      ctxRef.current.fillStyle = "white";
      ctxRef.current.fillText("MV", offsetX - 10, offsetY + 10);
      ctxRef.current.stroke();
    } else if (tool === "text" && text !== "") {
      // Write text
      ctxRef.current.font = "20px Arial";
      ctxRef.current.fillStyle = "white";
      ctxRef.current.fillText(text, offsetX - 10, offsetY + 10);
      ctxRef.current.stroke();
    } else {
      setStartX(offsetX);
      setStartY(offsetY);
    }
    setImage(canvasRef.current.toDataURL("image/png"));
  };

  const stopDrawing = ({ nativeEvent }) => {
    // const { offsetX, offsetY } = nativeEvent;
    // Set stroke color to white
    ctxRef.current.strokeStyle = "white";
    ctxRef.current.fillStyle = "white";
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

      let img = new Image();
      img.src = "./playerwayball.svg";
      img.onload = () => {
        // Draw the image rotated towards end
        ctxRef.current.translate(startX, startY);
        ctxRef.current.rotate(angle);
        ctxRef.current.drawImage(img, 0, 0, length, 25);
        ctxRef.current.rotate(-angle);
        ctxRef.current.translate(-startX, -startY);
      };

      const angle = Math.atan2(endY - startY, endX - startX);
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
    // Set line color to white
    ctx.strokeStyle = "white";

    if (fieldType === "full") {
      drawFull(ctx);
    } else if (fieldType === "half") {
      drawFull(ctx);
      setCanvasHeight(750 / 2);
      setCanvasWidth(500);
    } else if (fieldType === "halfgreen") {
      setCanvasHeight(750 / 2);
      setCanvasWidth(500);
      drawGreen(ctx);
    } else if (fieldType === "fullgreen") {
      setCanvasHeight(750);
      setCanvasWidth(500);
      drawGreen(ctx);
    }
    ctxRef.current = ctx;
    setHistory([canvas.toDataURL("image/png")]);
  }, [canvasHeight, canvasWidth, fieldType]);

  return (
    <div className="container">
      <div className="row">
        <h2>Skissa din övning</h2>
      </div>
      <hr />
      <div className="row">
        <div className="grid-2">
          <div></div>
        </div>
      </div>
      <div className="grid">
        <div>
          <h3>Typ av plan</h3>
          <div
            class="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="field1"
              autocomplete="off"
              onChange={() => setFieldType("full")}
            />

            {fieldType === "full" ? (
              <label className="btn btn-outline-primary active" for="field1">
                Helplan
              </label>
            ) : (
              <label className="btn btn-outline-primary" for="field1">
                Helplan
              </label>
            )}
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="field3"
              autocomplete="off"
              onChange={() => setFieldType("fullgreen")}
            />

            {fieldType === "fullgreen" ? (
              <label className="btn btn-outline-primary active" for="field3">
                Helplan grön
              </label>
            ) : (
              <label className="btn btn-outline-primary" for="field3">
                Helplan grön
              </label>
            )}

            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="field2"
              autocomplete="off"
              onChange={() => setFieldType("half")}
            />

            {fieldType === "half" ? (
              <label className="btn btn-outline-primary active" for="field2">
                halvplan
              </label>
            ) : (
              <label className="btn btn-outline-primary" for="field2">
                halvplan
              </label>
            )}

            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="field4"
              autocomplete="off"
              onChange={() => setFieldType("halfgreen")}
            />

            {fieldType === "halfgreen" ? (
              <label className="btn btn-outline-primary active" for="field4">
                halvplan grön
              </label>
            ) : (
              <label className="btn btn-outline-primary" for="field4">
                halvplan grön
              </label>
            )}
          </div>
          <canvas
            id="canvas"
            width={canvasWidth + "px"}
            height={canvasHeight + "px"}
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={setPos}
            className="canvas"
          />
        </div>
        <div>
          <h3>Verktyg</h3>
          <div
            className="btn-group"
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
            {tool === "circleX" ? (
              <label class="btn btn-outline-primary active" for="btnradio1">
                Anfallare med boll
              </label>
            ) : (
              <label class="btn btn-outline-primary" for="btnradio1">
                Anfallare med boll
              </label>
            )}

            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio2"
              autocomplete="off"
              onChange={() => setTool("X")}
            />

            {tool === "X" ? (
              <label class="btn btn-outline-primary active" for="btnradio2">
                Anfallare utan boll
              </label>
            ) : (
              <label class="btn btn-outline-primary" for="btnradio2">
                Anfallare utan boll
              </label>
            )}
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio3"
              autocomplete="off"
              onChange={() => setTool("circle")}
            />

            {tool === "circle" ? (
              <label class="btn btn-outline-primary active" for="btnradio3">
                Försvarare
              </label>
            ) : (
              <label class="btn btn-outline-primary" for="btnradio3">
                Försvarare
              </label>
            )}
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio10"
              autocomplete="off"
              onChange={() => setTool("mv")}
            />

            {tool === "mv" ? (
              <label class="btn btn-outline-primary active" for="btnradio10">
                Målvakt
              </label>
            ) : (
              <label class="btn btn-outline-primary" for="btnradio10">
                Målvakt
              </label>
            )}
          </div>
          <hr />
          <div className="col-md-6">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio5"
                autocomplete="off"
                onChange={() => setTool("player")}
              />

              {tool === "player" ? (
                <label class="btn btn-outline-primary active" for="btnradio5">
                  Spelarens väg
                </label>
              ) : (
                <label class="btn btn-outline-primary" for="btnradio5">
                  Spelarens väg
                </label>
              )}

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio7"
                autocomplete="off"
                onChange={() => setTool("playerWithBall")}
              />

              {tool === "playerWithBall" ? (
                <label class="btn btn-outline-primary active" for="btnradio7">
                  Spelarens väg med boll
                </label>
              ) : (
                <label class="btn btn-outline-primary" for="btnradio7">
                  Spelarens väg med boll
                </label>
              )}

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio6"
                autocomplete="off"
                onChange={() => setTool("arrow")}
              />
              {tool === "arrow" ? (
                <label class="btn btn-outline-primary active" for="btnradio6">
                  Bollens bana
                </label>
              ) : (
                <label class="btn btn-outline-primary" for="btnradio6">
                  Bollens bana
                </label>
              )}
            </div>
            <hr />
            <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio4"
                autocomplete="off"
                onChange={() => setTool("ball")}
              />
              {tool === "ball" ? (
                <label class="btn btn-outline-primary active" for="btnradio4">
                  Boll
                </label>
              ) : (
                <label class="btn btn-outline-primary" for="btnradio4">
                  Boll
                </label>
              )}

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio8"
                autocomplete="off"
                onChange={() => setTool("cone")}
              />
              {tool === "cone" ? (
                <label class="btn btn-outline-primary active" for="btnradio8">
                  Kona
                </label>
              ) : (
                <label class="btn btn-outline-primary" for="btnradio8">
                  Kona
                </label>
              )}
            </div>
            <hr />
            <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio12"
                autocomplete="off"
                onChange={() => setTool("text")}
              />
              {tool === "text" ? (
                <label class="btn btn-outline-primary active" for="btnradio12">
                  Text
                </label>
              ) : (
                <label class="btn btn-outline-primary" for="btnradio12">
                  Text
                </label>
              )}

              <input
                type="input"
                name="btnradio"
                id="btnradio12"
                placeholder="Text"
                autocomplete="off"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                onClick={() => {
                  setText("");
                }}
                className="btn btn-outline-danger"
              >
                Rensa
              </button>
            </div>
            <hr />
            <button onClick={undo} className="btn btn-danger">
              Undo
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6"></div>
        <hr />
      </div>
    </div>
  );
}
