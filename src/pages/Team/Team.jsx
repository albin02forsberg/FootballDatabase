import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import Loading from "../../modules/Loading";

export default function Team() {
  const [team, setTeam] = React.useState(null);
  const [games, setGames] = React.useState([]);
  const { id } = useParams();
  useEffect(() => {
    const teamCollectionRef = collection(db, "teams");
    const teamRef = doc(teamCollectionRef, id);
    getDoc(teamRef).then(
      (team) => {
        setTeam(team);
      },
      (error) => {
        console.error(error);
      }
    );
    const gameCollectionRef = collection(db, "games");
    const gameQ = query(gameCollectionRef, where("teamID", "==", id));
    getDocs(gameQ).then((docs) => {
      setGames(docs.docs);
    });
  }, [id]);

  if (!team) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="row">
        {team && (
          <h1>
            {team.data().club} - {team.data().name}
          </h1>
        )}
      </div>
      <div className="row">
        <table className="table table-responsive">
          <h2>Matcher</h2>
          <thead>
            <tr>
              <th>Hemmalag</th>
              <th>Bortalag</th>
              <th>Datum</th>
              <th>Tid</th>
              <th>Plats</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {games && games.length > 0 && (
              <>
                {games.map((game) => (
                  <tr key={game.id}>
                    <td>{game.data().homeTeam}</td>
                    <td>{game.data().awayTeam}</td>
                    <td>{game.data().date}</td>
                    <td>{game.data().time}</td>
                    <td>{game.data().location}</td>
                    <td>
                      <Link to={`/game/${game.id}`}>Info</Link>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td>
                <Link to={"/addgame/" + team.id}>
                  <button className="btn">Lägg till match</button>
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
        <>
          <h2>Träningar</h2>
        </>
      </div>
      <div className="row">
        <h2>Spelare</h2>
      </div>
    </div>
  );
}
