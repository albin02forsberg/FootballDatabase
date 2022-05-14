import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { db } from "../firebase-config";

export default function Club() {
  const { id } = useParams();
  const [club, setClub] = React.useState(null);
  const [teams, setTeams] = React.useState([]);

  useEffect(() => {
    const clubCollectionRef = collection(db, "clubs");
    const clubRef = doc(clubCollectionRef, id);
    getDoc(clubRef).then((club) => {
      setClub(club.data());
      const teamCollectionRef = collection(db, "teams");
      const teamQ = query(
        teamCollectionRef,
        where("__name__", "in", club.data().teams)
      );

      getDocs(teamQ).then((teams) => {
        setTeams(teams.docs);
      });
    });
  }, [id]);

  return (
    <div className="container">
      <div className="row">{club && <h1>{club.name}</h1>}</div>
      <div className="row">
        <div className="grid">
          {teams.map((team) => (
            <Link to={`/team/${team.id}`} key={team.id}>
              <div className="card"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
