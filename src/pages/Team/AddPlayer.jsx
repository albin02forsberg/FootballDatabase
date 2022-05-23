import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../firebase-config";

export default function AddPlayer() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [name, setName] = React.useState("");

  const addPlayer = () => {
    const playersCollectionRef = collection(db, "players");

    addDoc(playersCollectionRef, {
      name,
    }).then((doc) => {
      const playerTeamCollectionRef = collection(db, "PlayerTeam");
      addDoc(playerTeamCollectionRef, {
        name,
        uid: auth.currentUser.uid,
        teamId: id,
        playerId: doc.id,
        games: [],
        sessions: [],
        yellowCards: 0,
        redCards: 0,
        goals: 0,
        assists: 0,
      }).then(() => {
        navigate("/team/" + id);
      });
    });
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Lägg till spelare</h1>
        <div className="form">
          <div className="form-group">
            <label htmlFor="name">Namn</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              addPlayer();
            }}
          >
            Lägg till
          </button>
        </div>
      </div>
    </div>
  );
}
