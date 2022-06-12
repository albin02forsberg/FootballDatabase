import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../firebase-config";

export default function AddPlayer() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [birth, setBirth] = React.useState("");

  const addPlayer = () => {
    const playersCollectionRef = collection(db, "players");

    addDoc(playersCollectionRef, {
      name,
      birth,
      addedById: auth.currentUser.uid,
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
    <Container>
      <Box mb={3}>
        <Typography variant="h4">Lägg till spelare</Typography>
      </Box>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Namn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
      </FormControl>
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={addPlayer}
          disabled={name === ""}
        >
          Lägg till
        </Button>
      </Box>
    </Container>
  );
}
