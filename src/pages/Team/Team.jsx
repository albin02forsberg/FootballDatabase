import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase-config";

export default function Team() {
  const [team, setTeam] = React.useState(null);
  const { id } = useParams();
  useEffect(() => {
    const teamCollectionRef = collection(db, "teams");
    const teamRef = doc(teamCollectionRef, id);
    getDoc(teamRef).then(
      (team) => {
        setTeam(team.data());
      },
      (error) => {
        console.error(error);
      }
    );
  }, [id]);

  return (
    <div className="container">
      <div className="row">{team && <h1>{team.name}</h1>}</div>
    </div>
  );
}
