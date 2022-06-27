import {
  Autocomplete,
  Button,
  FormControl,
  Switch,
  Table,
  TableBody,
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
  deleteDoc,
  query,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import Loading from "../../modules/Loading";

export default function Game() {
  const [game, setGame] = React.useState(null);
  const [players, setPlayers] = React.useState([]);
  const [checkedPlayers, setCheckedPlayers] = React.useState([]);
  const [playerStats, setPlayerStats] = React.useState([]);
  const [homeScore, setHomeScore] = React.useState();
  const [awayScore, setAwayScore] = React.useState();
  const [location, setLocation] = React.useState();
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState();

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
      setLocation(game.data().location);
      setDate(game.data().date);
      setTime(game.data().time);

      console.log(game.data());

      // For every player in gp, get the player name and id  add it to the checkedPlayers array
      // for (let i = 0; i < game.data().players.length; i++) {
      //   const playerRef = doc(playerCollectionRef, game.data().players[i]);
      //   getDoc(playerRef).then((player) => {
      //     checkedPlayers.push({
      //       id: player.id,
      //       name: player.data().name,
      //     });
      //   });
      // }
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
        where("gameId", "==", gameId),
        orderBy("goals", "desc"),
        orderBy("assists", "desc"),
        orderBy("yellowCards", "desc"),
        orderBy("redCards", "desc")
      );

      getDocs(playerGameQ).then((playerGameDocs) => {
        setPlayerStats(playerGameDocs.docs);
      });
    });
  }, [gameId, id, checkedPlayers]);

  if (!game || !players) {
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
          <Box mb={3}>
            <TextField
              type="date"
              defaultValue={game.data().date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </Box>
          <Box mb={3}>
            <TextField
              type="time"
              defaultValue={game.data().time}
              onChange={(event) => {
                setTime(event.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              type="text"
              defaultValue={game.data().location}
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </Box>
          <Box>
            <Typography variant="h6">Resultat</Typography>
            <FormControl variant="filled">
              <Box mb={3}>
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
              </Box>
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
                  scoreHome: homeScore,
                  scoreAway: awayScore,
                  location: location,
                  date: date,
                  time: time,
                  played: played,
                })
                  .then(() => {
                    console.log("updated");
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                // Add all entries in checkedPlayers to the PlayerGame collection if they are not already in there
                for (let i = 0; i < checkedPlayers.length; i++) {
                  const playerGameCollectionRef = collection(db, "PlayerGame");

                  addDoc(playerGameCollectionRef, {
                    playerId: checkedPlayers[i].id,
                    gameId: gameId,
                    name: checkedPlayers[i].name,
                    teamId: id,
                    goals: 0,
                    assists: 0,
                    yellowCards: 0,
                    redCards: 0,
                    games: 1,
                  });
                  // wait for the doc to be added
                }
                setTimeout(() => {
                  console.log("added");
                  window.location.reload();
                }, 2500);
              }}
            >
              Spara
            </Button>
          </Box>
        </>
      )}
      {/* <Box style={{ width: "100%", height: "600px" }}>
        <DataGrid
          columns={[
            {
              name: "name",
              field: "name",
              headerName: "Namn",
              width: 200,
            },
            {
              name: "goals",
              field: "goals",
              label: "Mål",
              headerName: "GM",
              flex: 1,
              editable: true,
            },
            {
              name: "assists",
              field: "assists",
              label: "Assister",
              headerName: "A",
              flex: 1,
              editable: true,
            },
            {
              name: "yellowCards",
              field: "yellowCards",
              label: "Gula kort",
              headerName: "GK",
              flex: 1,
              editable: true,
            },
            {
              name: "redCards",
              field: "redCards",
              label: "Röda kort",
              headerName: "RK",
              flex: 1,
              editable: true,
            },
          ]}
          rows={
            playerStats &&
            playerStats.map((player) => ({
              id: player.id,
              name: player.data().name,
              goals: player.data().goals,
              assists: player.data().assists,
              yellowCards: player.data().yellowCards,
              redCards: player.data().redCards,
            }))
          }
          // When done editing, update the database
          editMode={"cell"}
          onCellValueChanged={(e) => {
            const playerGameCollectionRef = collection(db, "PlayerGame");
            const playerGameRef = doc(playerGameCollectionRef, e.data.id);
            updateDoc(playerGameRef, {
              [e.column.field]: e.newValue,
            });
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box> */}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Spelare</TableCell>
              <TableCell>Mål</TableCell>
              <TableCell>Assister</TableCell>
              <TableCell>Gula kort</TableCell>
              <TableCell>Röda kort</TableCell>
              <TableCell>Ta bort</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerStats.map((playerStat) => (
              <TableRow key={playerStat.id}>
                <TableCell>{playerStat.data().name}</TableCell>
                <TableCell>
                  <TextField
                    id="outlined-basic"
                    label="Mål"
                    type="number"
                    variant="outlined"
                    defaultValue={playerStat.data().goals}
                    onChange={(e) => {
                      const playerGameCollectionRef = collection(
                        db,
                        "PlayerGame"
                      );
                      const playerGameRef = doc(
                        playerGameCollectionRef,
                        playerStat.id
                      );
                      updateDoc(playerGameRef, {
                        goals: parseInt(e.target.value),
                      });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="outlined-basic"
                    label="Assister"
                    type="number"
                    variant="outlined"
                    defaultValue={playerStat.data().assists}
                    onChange={(e) => {
                      const playerGameCollectionRef = collection(
                        db,
                        "PlayerGame"
                      );
                      const playerGameRef = doc(
                        playerGameCollectionRef,
                        playerStat.id
                      );
                      updateDoc(playerGameRef, {
                        assists: parseInt(e.target.value),
                      });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="outlined-basic"
                    label="Gula kort"
                    type="number"
                    variant="outlined"
                    defaultValue={playerStat.data().yellowCards}
                    onChange={(e) => {
                      console.log(e.target.value);
                      const playerGameCollectionRef = collection(
                        db,
                        "PlayerGame"
                      );
                      const playerGameRef = doc(
                        playerGameCollectionRef,
                        playerStat.id
                      );
                      updateDoc(playerGameRef, {
                        yellowCards: parseInt(e.target.value),
                      })
                        .then(() => {
                          console.log("updated " + playerStat.id);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="outlined-basic"
                    label="Röda kort"
                    type="number"
                    variant="outlined"
                    defaultValue={playerStat.data().redCards}
                    onChange={(e) => {
                      const playerGameCollectionRef = collection(
                        db,
                        "PlayerGame"
                      );
                      const playerGameRef = doc(
                        playerGameCollectionRef,
                        playerStat.id
                      );
                      updateDoc(playerGameRef, {
                        redCards: parseInt(e.target.value),
                      });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      const playerGameCollectionRef = collection(
                        db,
                        "PlayerGame"
                      );
                      const playerGameRef = doc(
                        playerGameCollectionRef,
                        playerStat.id
                      );
                      deleteDoc(playerGameRef)
                        .then(() => {
                          console.log("deleted");
                          setPlayerStats(
                            playerStats.filter((p) => {
                              return p.id !== playerStat.id;
                            })
                          );
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    Radera
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!game && <Loading />}
    </Container>
  );
}
