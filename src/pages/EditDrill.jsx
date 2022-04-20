import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";

export default function EditDrill() {
  const { id } = useParams();
  const [drill, setDrill] = React.useState();

  useEffect(() => {
    const drillCollectionRef = collection(db, "drills");
    const drillRef = doc(drillCollectionRef, id);

    getDoc(drillRef)
      .then((drill) => {
        setDrill(drill);
        document.title = drill.data().name;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="container">
      <h1>Redigera övningen</h1>
      <p>id: {id}</p>
      {drill && (
        <>
          <p>Namn: {drill.data().name}</p>
          <p>Bild: {drill.data().imgLink}</p>
        </>
      )}
    </div>
  );
}
