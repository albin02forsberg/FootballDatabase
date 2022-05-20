import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase-config";

export default function AddGame() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [homeTeam, setHomeTeam] = React.useState("");
  const [awayTeam, setAwayTeam] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [location, setLocation] = React.useState("");

  const addGame = () => {
    const game = {
      homeTeam,
      awayTeam,
      date,
      time,
      location,
      teamID: id,
    };

    const gameCollectionRef = collection(db, "games");

    addDoc(gameCollectionRef, game).then((doc) => {
      console.log("Added game");
      navigate("/game/" + doc.id);
    });

    console.log(game);
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Lägg till match</h1>
        <div className="form">
          <label htmlFor="homeTeam">Hemmalag</label>
          <input
            type="text"
            id="homeTeam"
            onChange={(e) => {
              setHomeTeam(e.target.value);
            }}
          />
        </div>
        <div className="form">
          <label htmlFor="awayTeam">Bortalag</label>
          <input
            type="text"
            id="awayTeam"
            onChange={(e) => {
              setAwayTeam(e.target.value);
            }}
          />
        </div>
        <div className="form">
          <label htmlFor="date">Datum</label>
          <input
            type="date"
            id="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className="form">
          <label htmlFor="time">Tid</label>
          <input
            type="time"
            id="time"
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </div>
        <div className="form">
          <label htmlFor="location">Plats</label>
          <input
            type="text"
            id="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div className="form">
          <button className="btn btn-primary" onClick={addGame}>
            Lägg till match
          </button>
        </div>
      </div>
    </div>
  );
}
