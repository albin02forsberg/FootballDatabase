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
  const [team, setTeam] = React.useState();
  const [games, setGames] = React.useState([]);
  const [players, setPlayers] = React.useState([]);
  const [playerStats, setPlayerStats] = React.useState([]);
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

    const playerCollectionRef = collection(db, "PlayerTeam");
    const playerQ = query(playerCollectionRef, where("teamId", "==", id));
    getDocs(playerQ).then((docs) => {
      setPlayers(docs.docs);
      docs.forEach((player) => {
        const playerCollectionRef = collection(db, "players");
        const playerRef = doc(playerCollectionRef, player.data().playerId);
        getDoc(playerRef).then((player) => {
          setPlayerStats((prev) => [...prev, player]);
        });
      });
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
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>Namn</th>
              <th>Träningar</th>
              <th>Matcher</th>
              <th>Gula kort</th>
              <th>Röda kort</th>
              <th>Mål</th>
              <th>Assist</th>
            </tr>
          </thead>
          <tbody>
            {players && players.length > 0 && (
              <>
                {players.map((player) => (
                  <tr key={player.id}>
                    <td>{player.data().name}</td>
                    <td>{player.data().sessions.length}</td>
                    <td>{player.data().games.length}</td>
                    <td>{player.data().yellowCards}</td>
                    <td>{player.data().redCards}</td>
                    <td>{player.data().goals}</td>
                    <td>{player.data().assists}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <Link to={"/addplayer/" + team.id}>
                  <button className="btn">Lägg till spelare</button>
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
