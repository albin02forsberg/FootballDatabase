import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import Loading from "../modules/Loading";

export default function Drill() {
  const { id } = useParams();
  const [drill, setDrill] = React.useState(null);

  const canvasRef = React.useRef(null);
  const ctxRef = React.useRef(null);

  // Get drill from firestore and set state to drill

  // Get drill from firestore and set state to drill
  useEffect(() => {
    const drillCollectionRef = collection(db, "drills");
    const drillRef = doc(drillCollectionRef, id);
    getDoc(drillRef)
      .then((drill) => {
        document.title = drill.data().name;
        setDrill(drill);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let imageForeground = new Image();
        imageForeground.src = drill.data().imgLink;
        ctx.drawImage(imageForeground, 0, 0, canvas.width, canvas.height);
        ctxRef.current = ctx;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!drill) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {drill && (
            <div>
              <h1>{drill.data().name}</h1>
              <hr></hr>
              <h2>Vad?</h2>
              <p>
                {drill.data().type} - {drill.data().what}
              </p>
              <h2>Varför?</h2>
              <p>{drill.data().why}</p>
              <h2>Hur?</h2>
              <p>{drill.data().how}</p>
              <h2>Organisation</h2>
              <p>{drill.data().org}</p>
              <h2>Anvisningar</h2>
              <p>{drill.data().desc}</p>
            </div>
          )}
        </div>
        {drill && (
          <div className="col-md-6">
            <img
              className="img img-thumbnail"
              src={drill.data().imgLink}
              alt={drill.id}
            />
          </div>
        )}
      </div>
    </div>
  );
}
