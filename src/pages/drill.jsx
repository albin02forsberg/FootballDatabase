import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Drill() {
  const { id } = useParams();
  const [drill, setDrill] = React.useState(null);

  // Get drill from firestore and set state to drill
  const drillCollectionRef = collection(db, "drills");
  const drillRef = doc(drillCollectionRef, id);

  // Get drill from firestore and set state to drill
  useEffect(() => {
    getDoc(drillRef)
      .then((drill) => {
        setDrill(drill);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, drillRef]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {drill && (
            <div>
              <h1>{drill.data().name}</h1>
              <hr></hr>
              <h2>Vad?</h2>
              <p>{drill.data().type}</p>
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
              src={drill.data().imgLink}
              className="img-thumbnail"
              alt={drill.data().name}
            />
          </div>
        )}
      </div>
    </div>
  );
}
