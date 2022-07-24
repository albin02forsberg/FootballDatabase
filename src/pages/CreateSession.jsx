import React, { useEffect } from "react";
import { auth, db } from "../firebase-config";
import {
  getDocs,
  collection,
  where,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/system";
import {
  Button,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

export default function CreateSession() {
  let navigate = useNavigate();
  const [name, setName] = React.useState("");

  const [difficulty, setDifficulty] = React.useState("");
  const [type, setType] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [drills, setDrills] = React.useState([]);
  const [selectedDrills, setSelectedDrills] = React.useState([]);

  useEffect(() => {
    document.title = "Skapa pass";
    if (!auth.currentUser) {
      navigate("/");
    } else {
      const drillQ = query(
        collection(db, "drills"),
        orderBy("created", "desc"),
        where("uid", "==", auth.currentUser.uid)
      );
      getDocs(drillQ).then((docs) => {
        setDrills(docs.docs);
      });
    }
  }, [navigate]);

  const createSession = async () => {
    const sessionCollectionRef = collection(db, "sessions");
    const session = {
      name,
      difficulty,
      type,
      desc,
      drills: selectedDrills,
      uname: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      created: new Date(),
    };
    addDoc(sessionCollectionRef, session).then((doc) => {
      navigate("/session/" + doc.id);
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
        <Box mb={3}>
          <Typography variant="h4">Skapa pass</Typography>
        </Box>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <InputLabel id="what">Typ</InputLabel>
          <Select label="Typ" onChange={(e) => setType(e.target.value)}>
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
          <TextField
            label="Beskrivning"
            value={desc}
            multiline
            onChange={(e) => setDesc(e.target.value)}
          />
        </FormControl>

        <Box mb={3}>
          <Typography variant="h6">Välj övningar</Typography>
        </Box>
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              {drills.map((drill) => (
                <TableRow key={drill.id}>
                  <TableCell component="th" scope="row">
                    {drill.data().name}
                  </TableCell>
                  <TableCell align="right">
                    <Select
                      value={selectedDrills.includes(drill.id)}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedDrills([...selectedDrills, drill.id]);
                        } else {
                          setSelectedDrills(
                            selectedDrills.filter((id) => id !== drill.id)
                          );
                        }
                      }}
                    >
                      <MenuItem value={true}>Välj</MenuItem>
                      <MenuItem value={false}>Avvälj</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <FormControl fullWidth margin="normal">
          <Button
            onClick={createSession}
            variant="contained"
            disabled={!name || !difficulty || !type || !selectedDrills.length}
          >
            Skapa pass
          </Button>
        </FormControl>
      </Paper>
    </Container>

    // <div className="container">
    //   <div className="row">
    //     <h1>Skapa träningspass</h1>
    //     <div className="form">
    //       <label class="form-label">Passets namn</label>
    //       <input
    //         className="form-control"
    //         placeholder="Passets namn"
    //         onChange={(e) => {
    //           setName(e.target.value);
    //         }}
    //       />
    //     </div>
    //     <div className="form">
    //       <label class="form-label">
    //         <b>Vad</b> ska tränas?
    //       </label>
    //       <select
    //         className="form-control"
    //         onChange={(e) => {
    //           setType(e.target.value);
    //         }}
    //       >
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
    //       <label class="form-label">Beskrivning</label>
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
    //   </div>
    //   <div className="row">
    //     <h2>Välj övningar</h2>
    //     <div className="content">
    //       <table className="table table-striped table-responsive">
    //         <thead>
    //           <tr>
    //             <th scope="col">Namn</th>
    //             <th scope="col">Välj</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {drills &&
    //             drills.map((drill) => {
    //               return (
    //                 <tr key={drill.id}>
    //                   <td>{drill.data().name}</td>
    //                   <td>
    //                     <button
    //                       className="btn btn-outline-primary"
    //                       value={drill}
    //                       onClick={(e) => {
    //                         if (selectedDrills.includes(drill.id)) {
    //                           setSelectedDrills(
    //                             selectedDrills.filter((d) => d !== drill.id)
    //                           );
    //                           e.target.innerText = "Välj";
    //                           e.target.className = "btn bnt-primary";
    //                         } else {
    //                           setSelectedDrills([...selectedDrills, drill.id]);
    //                           e.target.innerText = "Ta bort";
    //                           e.target.className = "btn btn-danger";
    //                         }
    //                       }}
    //                     >
    //                       Välj
    //                     </button>
    //                   </td>
    //                 </tr>
    //               );
    //             })}
    //         </tbody>
    //       </table>
    //     </div>

    //     <div className="grid">
    //       {/* {drills &&
    //         drills.map((drill) => {
    //           return (
    //             <div className="card mb" key={drill.data().imgLink}>
    //               <div className="card-body">
    //                 <p className="card-text">{drill.data().description}</p>
    //                 <p className="card-text">
    //                   <img
    //                     src={drill.data().imgLink}
    //                     alt={drill.data().name}
    //                     className="card-img-top"
    //                   />
    //                   <h5 className="card-title">{drill.data().name}</h5>
    //                   <small className="text-muted">
    //                     {drill.data().difficulty} - {drill.data().type}
    //                   </small>
    //                 </p>
    //                 <button
    //                   className="btn"
    //                   value={drill}
    //                   onClick={(e) => {
    //                     if (selectedDrills.includes(drill.id)) {
    //                       setSelectedDrills(
    //                         selectedDrills.filter((d) => d !== drill.id)
    //                       );
    //                       e.target.innerText = "Välj";
    //                       e.target.className = "btn";
    //                     } else {
    //                       setSelectedDrills([...selectedDrills, drill.id]);
    //                       e.target.innerText = "Ta bort";
    //                       e.target.className = "btn btn-danger";
    //                     }
    //                   }}
    //                 >
    //                   Välj
    //                 </button>
    //               </div>
    //             </div>
    //           );
    //         })} */}
    //     </div>
    //   </div>
    //   <button className="btn btn-primary" onClick={createSession}>
    //     Spara
    //   </button>
    // </div>
  );
}
