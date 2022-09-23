import React, { useEffect, lazy, Suspense } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useRouter } from "next/router";
import Loading from "../../modules/Loading";
import {
  Button,
  Container,
  FormControl,
  ListSubheader,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";

const Canvas = lazy(() => {
  return Promise.all([
    import("../../modules/canvas"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

export default function CreateDrill() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("Spelövning");
  const [what, setWhat] = React.useState("Aktivering");
  const [difficulty, setDifficulty] = React.useState("3 mot 3");
  const [why, setWhy] = React.useState("");
  const [how, setHow] = React.useState("");
  const [org, setOrg] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [img, setImg] = React.useState("");

  const drillCollectionRef = collection(db, "drills");

  // if user is not logged in, redirect to login page
  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/login");
    }
  }, []);

  const createDrill = async () => {
    addDoc(drillCollectionRef, {
      name,
      type,
      difficulty,
      what,
      why,
      how,
      org,
      desc,
      imgLink: img,
      uname: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      created: new Date(),
    }).then((doc) => {
      navigate("/drill/" + doc.id);
    });
  };

  return (
    <Container>
      <Paper
        style={{
          padding: "1rem",
          margin: "0.5rem",
          backgroundColor: "#fafafa",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box mb={3}></Box>
        <Box mb={3}>
          <Typography variant="h4">Skapa övning</Typography>
        </Box>
        <FormControl fullWidth margin="normal">
          <TextField
            id="name"
            label="Namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="type">Typ</InputLabel>
          <Select label="Typ" onChange={(e) => setType(e.target.value)}>
            <MenuItem value="Spelövning">Spelövning</MenuItem>
            <MenuItem value="Färdighetsövning">Färdighetsövning</MenuItem>
            <MenuItem value="Fysövning">Fysövning</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="what">Nivå</InputLabel>
          <Select label="Nivå" onChange={(e) => setDifficulty(e.target.value)}>
            <MenuItem value="3 mot 3">3 mot 3</MenuItem>
            <MenuItem value="5 mot 5">5 mot 5</MenuItem>
            <MenuItem value="7 mot 7">7 mot 7</MenuItem>
            <MenuItem value="9 mot 9">9 mot 9</MenuItem>
            <MenuItem value="11 mot 11">11 mot 11</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="what">Vad</InputLabel>
          {/* Select with options grupps */}
          <Select label="Vad" onChange={(e) => setWhat(e.target.value)}>
            <ListSubheader component="div">
              Fotbollsuppvärmning - förberedelseträning
            </ListSubheader>
            <MenuItem value="Aktivering">Aktivering</MenuItem>
            <MenuItem value="Fotbollsrörlighet">Fotbollsrörlighet</MenuItem>
            <MenuItem value="Löpteknink">Löpteknik</MenuItem>
            <MenuItem value="Fotarbete">Fotarbete</MenuItem>
            <MenuItem value="Hoppa-landa-löp">Hoppa-landa-löp</MenuItem>
            <ListSubheader component="div">Anfallsspel</ListSubheader>
            <MenuItem value="Speluppbyggnad">Speluppbyggnad</MenuItem>
            <MenuItem value="Kontring">Kontring</MenuItem>
            <MenuItem value="Komma till avslut och göra mål">
              Komma till avslut och göra mål
            </MenuItem>
            <ListSubheader component="div">Försvarsspel</ListSubheader>
            <MenuItem value="Förhindra speluppbyggnad">
              Förhindra speluppbyggnad
            </MenuItem>
            <MenuItem value="Återerövring av bollen">
              Återerövring av bollen
            </MenuItem>
            <MenuItem value="Förhindra och rädda avslut">
              Förhindra och rädda avslut
            </MenuItem>
            <ListSubheader component="div">Fotbollsfys</ListSubheader>
            <MenuItem value="Explosiv träning">Explosiv träning</MenuItem>
            <MenuItem value="Förbättra och behålla återhämtningsförmågan mellan fotbollsaktioner">
              Förbättra och behålla återhämtningsförmågan mellan
              fotbollsaktioner
            </MenuItem>
            <MenuItem value="Fotbollsstyrka">Fotbollsstyrka</MenuItem>
            <MenuItem value="Fotbollsrörlighet">Fotbollsrörlighet</MenuItem>
            <MenuItem value="Fotbollskoordination">
              Fotbollskoordination
            </MenuItem>
            <MenuItem value="Lek">Lek</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField label="Varför" onChange={(e) => setWhy(e.target.value)} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField label="Hur" onChange={(e) => setHow(e.target.value)} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Organisation"
            multiline
            onChange={(e) => setOrg(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Anvisningar"
            multiline
            onChange={(e) => setDesc(e.target.value)}
          />
        </FormControl>
      </Paper>
      <Paper>
        <Suspense fallback={<Loading />}>
          <Canvas setImg={setImg} />
        </Suspense>
      </Paper>
      <Paper>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={createDrill}
            disabled={
              !name ||
              !type ||
              !difficulty ||
              !what ||
              !why ||
              !how ||
              !org ||
              !desc
            }
          >
            Skapa övning
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
