import React, { useEffect, lazy, Suspense } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Loading from "../modules/Loading";
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
    import("../modules/Canvas"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

export default function CreateDrill() {
  let navigate = useNavigate();
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

  useEffect(() => {
    document.title = "Skapa övning";
    if (!auth.currentUser) {
      navigate("/");
    }
  }, [navigate]);

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

    // <div className="container">
    //   <div className="row">
    //     <h1>Skapa övning</h1>
    //     <div className="form">
    //       <label class="form-label">Övningens namn</label>
    //       <input
    //         className="form-control"
    //         placeholder="Övningens namn"
    //         onChange={(e) => {
    //           setName(e.target.value);
    //         }}
    //       />
    //     </div>
    //     <div className="form">
    //       <label class="form-label">
    //         <b>Typ</b> av övning
    //       </label>
    //       <select
    //         className="form-control"
    //         onChange={(e) => {
    //           setType(e.target.value);
    //         }}
    //       >
    //         <option value="Spelövning">Spelövning</option>
    //         <option value="Färdighetsövning">Färdighetsövning</option>
    //         <option value="Fysövning">Fysövning</option>
    //       </select>
    //     </div>
    //     <div className="form">
    //       <label class="form-label">
    //         <b>Vilka</b> ska träna?
    //       </label>
    //       <select
    //         className="form-control"
    //         onChange={(e) => {
    //           setDifficulty(e.target.value);
    //         }}
    //       >
    //         <option value="3 mot 3">3 mot 3</option>
    //         <option value="5 mot 5">5 mot 5</option>
    //         <option value="7 mot 7">7 mot 7</option>
    //         <option value="9 mot 9">9 mot 9</option>
    //         <option value="11 mot 11">11 mot 11</option>
    //       </select>
    //     </div>
    //     <div className="form">
    //       <label class="form-label">
    //         <b>Vad</b> ska tränas?
    //       </label>
    //       <select
    //         className="form-control"
    //         onChange={(e) => {
    //           setWhat(e.target.value);
    //         }}
    //       >
    //         <optgroup label="Fotbollsuppvärmning - förberedelseträning">
    //           <option value="Aktivering">Aktivering</option>
    //           <option value="Fotbollsrörlighet">Fotbollsrörlighet</option>
    //           <option value="Löpteknik">Löpteknik</option>
    //           <option value="Fotarbete">Fotarbete</option>
    //           <option value="Hoppa-landa-löp">Hoppa-landa-löp</option>
    //         </optgroup>
    //         <optgroup label="Anfallsspel">
    //           <option value="Speluppbyggnad">Speluppbyggnad</option>
    //           <option value="Kontring">Kontring</option>
    //           <option value="Komma till avslut och göra mål">
    //             Komma till avslut och göra mål
    //           </option>
    //         </optgroup>
    //         <optgroup label="Försvarsspel">
    //           <option value="Förhindra speluppbyggnad">
    //             Förhindra speluppbyggnad
    //           </option>
    //           <option value="Återerövring av bollen">
    //             Återerövring av bollen
    //           </option>
    //           <option value="Förhindra och rädda avslut">
    //             Förhindra och rädda avslut
    //           </option>
    //         </optgroup>
    //         <optgroup label="Fotbollsfys">
    //           <option value="Explosiv träning">Explosiv träning</option>
    //           <option value="Förbättra och behålla återhämtningsförmågan mellan fotbollsaktioner">
    //             Förbättra och behålla återhämtningsförmågan mellan
    //             fotbollsaktioner
    //           </option>
    //           <option value="Fotbollsstyrka">Fotbollsstyrka</option>
    //           <option value="Fotbollsrörlighet">Fotbollsrörlighet</option>
    //           <option value="Fotbollskoordination">Fotbollskoordination</option>
    //           <option value="Lek">Lek</option>
    //         </optgroup>
    //       </select>
    //     </div>
    //     <div className="form">
    //       <label className="form-label">
    //         <b>Varför</b> ska detta tränas?
    //       </label>
    //       <textarea
    //         className="form-control"
    //         rows="5"
    //         placeholder="Ange varför detta ska tränas kopplat till vad spelaren och laget ska förstärka eller förbättra. Exempelvis: spela sig ur press i speluppbyggnaden. Färdighetsövning: förbättra tillslagstekniken inför spelet"
    //         onChange={(e) => {
    //           setWhy(e.target.value);
    //         }}
    //       />
    //     </div>
    //     <div className="form">
    //       <label className="form-label">
    //         <b>Hur</b> ska det tränas?
    //       </label>
    //       <textarea
    //         className="form-control"
    //         rows="5"
    //         placeholder="Beteenden/aktioner som gör att övningens 'vad' uppfylls. För spelövning: Vad prioriteras i de aktuella skedena? När ska spelarna agera? Vilket arbetssätt ska spelarna tillämpa? För färdighetsövning: Ange när och hur spelaren ska agera. Driv bollen framåt för att erövra tom yta"
    //         onChange={(e) => {
    //           setHow(e.target.value);
    //         }}
    //       />
    //     </div>
    //     <div className="form">
    //       <label class="form-label">Organisation</label>
    //       <textarea
    //         class="form-control"
    //         rows="5"
    //         aria-label="With textarea"
    //         placeholder="Antal spelare (inklusive målvakter och jokrar), yta, eller spelplan med mål, bollar, koner och västar. För spelövning: Lagets formation"
    //         onChange={(e) => {
    //           setOrg(e.target.value);
    //         }}
    //       ></textarea>
    //     </div>
    //     <div className="form">
    //       <label class="form-label">Anvisningar</label>
    //       <textarea
    //         class="form-control"
    //         rows="5"
    //         aria-label="With textarea"
    //         placeholder="Regler, förutsättningar och kort övningsbeskrivning. Var är uppgiften?"
    //         onChange={(e) => {
    //           setDesc(e.target.value);
    //         }}
    //       ></textarea>
    //     </div>
    //     {/* <div className="form">
    //         <label for="formFile" class="form-label">
    //           Bild på övningen
    //         </label>
    //         <input
    //           class="form-control"
    //           type="file"
    //           id="formFile"
    //           onChange={(e) => {
    //             setImg(e.target.files[0]);
    //           }}
    //         ></input>
    //       </div> */}
    //   </div>
    //   <div className="row">
    //     <Suspense fallback={<Loading />}>
    //       <Canvas setImage={setImg} />
    //     </Suspense>
    //     <div className="form">
    //       <button className="btn btn-primary" onClick={createDrill}>
    //         Skapa övning
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
