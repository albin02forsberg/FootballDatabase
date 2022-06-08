import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
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
    const gameQ = query(
      gameCollectionRef,
      where("teamID", "==", id),
      orderBy("date", "asc")
    );
    getDocs(gameQ).then((docs) => {
      setGames(docs.docs);
    });

    const playerCollectionRef = collection(db, "PlayerTeam");
    const playerQ = query(playerCollectionRef, where("teamId", "==", id));
    getDocs(playerQ).then((docs) => {
      setPlayers(docs.docs);
    });
  }, [id]);

  if (!team) {
    return <Loading />;
  }

  return (
    <Container>
      <Box mb={3}>
        <Typography variant="h4">
          {team.data().club} {team.data().name}
        </Typography>
      </Box>
      <Box mb={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell>Hemmalag</TableCell>
              <TableCell>Bortalag</TableCell>
              <TableCell>Datum</TableCell>
              <TableCell>Tid</TableCell>
              <TableCell>Resultat</TableCell>
              <TableCell>Info</TableCell>
            </TableHead>
            <TableBody>
              {games.map((game) => {
                return (
                  <TableRow key={game.id}>
                    <TableCell>{game.data().homeTeam}</TableCell>
                    <TableCell>{game.data().awayTeam}</TableCell>
                    <TableCell>{game.data().date}</TableCell>
                    <TableCell>{game.data().time}</TableCell>
                    <TableCell>{game.data().result}</TableCell>
                    <TableCell>
                      <Link to={"game/" + game.id}>Info</Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <Link to={`/addgame/${id}`}>Lägg till</Link>
                </TableCell>
                <TableCell colSpan={2}>Antal matcher: {games.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      <Box mb={3}>
        <Typography variant="h4">Spelare</Typography>
      </Box>
      <Box mb={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell>Namn</TableCell>
              <TableCell>Träningar</TableCell>
              <TableCell>Matcher</TableCell>
              <TableCell>Mål</TableCell>
              <TableCell>Assister</TableCell>
              <TableCell>Gula kort</TableCell>
              <TableCell>Röda kort</TableCell>
              <TableCell>Info</TableCell>
            </TableHead>
            <TableBody>
              {players.map((player) => {
                return (
                  <TableRow key={player.id}>
                    <TableCell>{player.data().name}</TableCell>
                    <TableCell>{player.data().sessions.length}</TableCell>
                    <TableCell>{player.data().games.length}</TableCell>
                    <TableCell>{player.data().goals}</TableCell>
                    <TableCell>{player.data().assists}</TableCell>
                    <TableCell>{player.data().yellowCards}</TableCell>
                    <TableCell>{player.data().redCards}</TableCell>
                    <TableCell>
                      <Link to={`/player/${player.id}`}>Info</Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7}>
                  <Link to={`/addplayer/${id}`}>Lägg till</Link>
                </TableCell>
                <TableCell colSpan={2}>
                  Antal spelare: {players.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
