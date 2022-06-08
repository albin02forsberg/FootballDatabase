import {
  Autocomplete,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import {
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
  const { id, gameId } = useParams();

  useEffect(() => {
    const gameCollectionRef = collection(db, "games");
    const gameRef = doc(gameCollectionRef, gameId);
    getDoc(gameRef).then((game) => {
      setGame(game);
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
    });
  }, [gameId, id]);

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
                variant="outlined"
                value={game.data().homeTeamScore}
                onChange={(e) => {
                  setGame({
                    ...game.data(),
                    homeTeamScore: e.target.value,
                  });
                }}
              />

              <TextField
                id="outlined-basic"
                label="Bortalag mål"
                variant="outlined"
                value={game.data().awayTeamScore}
                onChange={(e) => {
                  setGame({
                    ...game.data(),
                    awayTeamScore: e.target.value,
                  });
                }}
              />
            </FormControl>
          </Box>

          <Typography variant="h6">Spelare</Typography>
          <Box mt={3}>
            <Autocomplete
              multiple
              options={players}
              value={checkedPlayers}
              getOptionLabel={(option) => option.name}
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
                })
                  .then(() => {
                    console.log("updated");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Spara
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
