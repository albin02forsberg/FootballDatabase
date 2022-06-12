import {
  Autocomplete,
  Button,
  FormControl,
  Switch,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import Loading from "../../modules/Loading";

export default function Game() {
  const [game, setGame] = React.useState(null);
  const [players, setPlayers] = React.useState([]);
  const [checkedPlayers, setCheckedPlayers] = React.useState([]);
  const [homeScore, setHomeScore] = React.useState();
  const [awayScore, setAwayScore] = React.useState();
  const [played, setPlayed] = React.useState(false);
  const { id, gameId } = useParams();

  useEffect(() => {
    const gameCollectionRef = collection(db, "games");
    const gameRef = doc(gameCollectionRef, gameId);
    getDoc(gameRef).then((game) => {
      setGame(game);
      setPlayed(game.data().played);
      setHomeScore(game.data().scoreHome);
      setAwayScore(game.data().scoreAway);
      console.log(game.data());

      // For every player in gp, get the player name and id  add it to the checkedPlayers array
      const playerCollectionRef = collection(db, "PlayerTeam");
      for (let i = 0; i < game.data().players.length; i++) {
        const playerRef = doc(playerCollectionRef, game.data().players[i]);
        getDoc(playerRef).then((player) => {
          checkedPlayers.push({
            id: player.id,
            name: player.data().name,
          });
        });
      }
    });

    const playerCollectionRef = collection(db, "PlayerTeam");
    const playerQ = query(playerCollectionRef, where("teamId", "==", id));

    getDocs(playerQ).then((docs) => {
      // Set players to the players id and name
      setPlayers(
        docs.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
      );

      // Get all collections in PlayerGame and filter out the ones that match the gameId
      const playerGameCollectionRef = collection(db, "PlayerGame");
      const playerGameQ = query(
        playerGameCollectionRef,
        where("gameId", "==", gameId)
      );
      getDocs(playerGameQ).then((playerGameDocs) => {
        // For every player in gp, get the player name and id  add it to the checkedPlayers array
        for (let i = 0; i < playerGameDocs.docs.length; i++) {
          const playerRef = doc(
            playerCollectionRef,
            playerGameDocs.docs[i].data().playerId
          );
          getDoc(playerRef).then((player) => {
            checkedPlayers.push({
              id: player.id,
              name: player.data().name,
            });
          });
        }
      });
    });
  }, [gameId, id, checkedPlayers]);

  if (!game) {
    <Loading />;
  }

  return (
    <Container>
      {game && (
        <>
          <Box mb={3}>
            <Typography variant="h4">
              {game.data().homeTeam} - {game.data().awayTeam}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{game.data().date}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">{game.data().time}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">{game.data().location}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">Resultat</Typography>
            <FormControl variant="filled">
              <TextField
                id="outlined-basic"
                label="Hemmalag mål"
                type="number"
                variant="outlined"
                defaultValue={game.data().scoreHome}
                onChange={(e) => {
                  setHomeScore(e.target.value);
                }}
              />

              <TextField
                id="outlined-basic"
                label="Bortalag mål"
                type="number"
                variant="outlined"
                defaultValue={game.data().scoreAway}
                onChange={(e) => {
                  setAwayScore(e.target.value);
                }}
              />
              <Typography variant="h6">Matchen spelad?</Typography>
              <Switch
                checked={played}
                onChange={(e) => setPlayed(e.target.checked)}
                name="played"
              />
            </FormControl>
          </Box>

          <Typography variant="h6">Spelare</Typography>
          <Box mt={3}>
            <Autocomplete
              multiple
              options={players}
              value={checkedPlayers}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              getOptionLabel={(option) => option.name}
              onLoadStart={() => {
                console.log("Loading...");
              }}
              onChange={(event, value) => {
                setCheckedPlayers(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Spelare"
                  placeholder="Spelare"
                  // if the player is in the checkedPlayers array, set the checked property to true
                  checked={checkedPlayers.some((player) => player.id === id)}
                />
              )}
            />
          </Box>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const gameCollectionRef = collection(db, "games");
                const gameRef = doc(gameCollectionRef, gameId);
                updateDoc(gameRef, {
                  players: checkedPlayers.map((player) => player.id),
                  scoreHome: homeScore,
                  scoreAway: awayScore,
                  played: played,
                })
                  .then(() => {
                    console.log("updated");
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                // for every player in selected, add doc in PlayerGame with the gameId,
                // if not already in there

                for (let i = 0; i < checkedPlayers.length; i++) {
                  const playerGameCollectionRef = collection(
                    db,
                    "PlayerGame/" + gameId + "/" + checkedPlayers[i].id
                  );
                  addDoc(playerGameCollectionRef, {
                    playerId: checkedPlayers[i].id,
                    gameId: gameId,
                    goals: 0,
                    assists: 0,
                    yellowCards: 0,
                    redCards: 0,
                  });
                  console.log("added new doc");
                }
              }}
            >
              Spara
            </Button>
          </Box>
        </>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Spelare</TableCell>
              <TableCell>Mål</TableCell>
              <TableCell>Assister</TableCell>
              <TableCell>Gula kort</TableCell>
              <TableCell>Röda kort</TableCell>
              <TableCell>Spara</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      {!game && <Loading />}
    </Container>
  );
}
