import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase-config";

export default function Player() {
  const [player, setPlayer] = React.useState(null);
  const [games, setGames] = React.useState([]);
  const [name, setName] = React.useState("");
  const { id } = useParams();

  useEffect(() => {
    const PlayerStatsRef = collection(db, "PlayerGame");
    const PlayerStatsQ = query(PlayerStatsRef, where("playerId", "==", id));
    getDocs(PlayerStatsQ).then((docs) => {
      setGames(docs.docs);
      setName(docs.docs[0].data().name);
      // Sum all the stats
      const sum = docs.docs.reduce(
        (acc, cur) => {
          return {
            games: acc.games + cur.data().games,
            goals: acc.goals + cur.data().goals,
            assists: acc.assists + cur.data().assists,
            yellowCards: acc.yellowCards + cur.data().yellowCards,
            redCards: acc.redCards + cur.data().redCards,
          };
        },
        {
          goals: 0,
          assists: 0,
          yellowCards: 0,
          redCards: 0,
          games: 0,
        }
      );
      setPlayer(sum);
    });
  }, [id]);

  if (!player || !games) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box mb={3}>
        {" "}
        <Typography variant="h4">{name}</Typography>
      </Box>
      <Box mb={3}>
        <Typography variant="h6">Games: {player.games}</Typography>
      </Box>
      <Box mb={3}>
        <Typography variant="h6">Goals: {player.goals}</Typography>
      </Box>
      <Box mb={3}>
        <Typography variant="h6">Assists: {player.assists}</Typography>
      </Box>
      <Box mb={3}>
        <Typography variant="h6">Yellow Cards: {player.yellowCards}</Typography>
      </Box>
      <Box mb={3}>
        <Typography variant="h6">Red Cards: {player.redCards}</Typography>
      </Box>
      <Box>
        <Typography variant="h6">{name}s matcher</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>MatchId</TableCell>
              <TableCell>Mål</TableCell>
              <TableCell>Assister</TableCell>
              <TableCell>Gula kort</TableCell>
              <TableCell>Röda kort</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game) => (
              <TableRow key={game.id}>
                <TableCell>
                  <Link
                    to={
                      "/team/" +
                      game.data().teamId +
                      "/game/" +
                      game.data().gameId
                    }
                  >
                    {game.data().gameId}
                  </Link>
                </TableCell>
                <TableCell>{game.data().goals}</TableCell>
                <TableCell>{game.data().assists}</TableCell>
                <TableCell>{game.data().yellowCards}</TableCell>
                <TableCell>{game.data().redCards}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
}
