import { Box, Button, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import Loading from "../../modules/Loading";

export default function Team() {
  const [team, setTeam] = React.useState();
  const [games, setGames] = React.useState([]);
  const [players, setPlayers] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  let navigate = useNavigate();
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

    const playerCollectionRef = collection(db, "PlayerGame");
    const playerQ = query(playerCollectionRef, where("teamId", "==", id));

    // if two or more playerId are the same, add the players values together
    getDocs(playerQ).then(
      (docs) => {
        const players = docs.docs.reduce((acc, doc) => {
          const player = doc.data();
          const playerId = player.playerId;
          if (acc[playerId]) {
            acc[playerId].goals += player.goals;
            acc[playerId].assists += player.assists;
            acc[playerId].points += player.points;
            acc[playerId].games += player.games;
          } else {
            acc[playerId] = player;
          }
          return acc;
        }, {});
        setPlayers(players);
      },
      (error) => {
        console.error(error);
      }
    );

    setColumns([
      {
        name: "name",
        label: "Namn",
        headerName: "Namn",
      },
      {
        name: "goals",
        label: "Mål",
        headerName: "Mål",
      },
      {
        name: "assists",
        label: "Assister",
        headerName: "Assister",
      },
      {
        name: "yellowCards",
        label: "Gula kort",
        headerName: "Gula kort",
      },
      {
        name: "redCards",
        label: "Röda kort",
        headerName: "Röda kort",
      },
    ]);
  }, [id]);

  if (!team) {
    return <Loading />;
  }

  return (
    <Container>
      <Box mb={3}>
        {team && (
          <Typography variant="h4">
            {team.data().club} {team.data().name}
          </Typography>
        )}
      </Box>
      <Box mb={6} style={{ height: "600px", width: "auto", display: "flex" }}>
        <Box style={{ flexGrow: 1 }}>
          <Typography variant="h6">Spelschema</Typography>
          <DataGrid
            columns={[
              {
                name: "date",
                headerName: "Datum",
                field: "date",
                label: "Datum",
                width: 100,
              },
              {
                name: "homeTeam",
                headerName: "Hemmalag",
                field: "homeTeam",
                label: "Hemma",
                width: 100,
              },
              {
                name: "awayTeam",
                headerName: "Bortalag",
                field: "awayTeam",
                label: "Borta",
                width: 100,
              },
              {
                name: "result",
                headerName: "Resultat",
                field: "result",
                label: "Resultat",
                width: 100,
              },
              {
                name: "location",
                headerName: "Plats",
                field: "location",
                label: "Plats",
                width: 100,
              },
              {
                name: "Spelad",
                headerName: "Spelad",
                field: "Spelad",
                label: "Spelad",
                flex: 1,
              },
            ]}
            rows={
              games &&
              games.map((game) => {
                return {
                  id: game.id,
                  date: game.data().date,
                  homeTeam: game.data().homeTeam,
                  awayTeam: game.data().awayTeam,
                  result: game.data().scoreHome + " - " + game.data().scoreAway,
                  location: game.data().location,
                  Spelad: game.data().played,
                };
              })
            }
            onRowDoubleClick={(row) => {
              navigate(`/team/${id}/game/${row.id}`);
            }}
          />
        </Box>
        {/* <TableContainer>
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
                    <TableCell>
                      {game.data().played && (
                        <>
                          {game.data().scoreHome} - {game.data().scoreAway}
                        </>
                      )}
                    </TableCell>
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
        </TableContainer> */}
      </Box>
      <Box mb={3}>
        <Typography variant="h4">Spelare</Typography>
      </Box>
      <Box mb={3} height="auto">
        {/* <TableContainer>
          <Table>
            <TableHead>
              <TableCell>Namn</TableCell>
              <TableCell>Matcher</TableCell>
              <TableCell>Mål</TableCell>
              <TableCell>Assister</TableCell>
              <TableCell>Gula kort</TableCell>
              <TableCell>Röda kort</TableCell>
              <TableCell>Info</TableCell>
            </TableHead>
            <TableBody>
              {Object.keys(players).map((playerId) => {
                const player = players[playerId];
                return (
                  <TableRow key={playerId}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.games}</TableCell>
                    <TableCell>{player.goals}</TableCell>
                    <TableCell>{player.assists}</TableCell>
                    <TableCell>{player.yellowCards}</TableCell>
                    <TableCell>{player.redCards}</TableCell>
                    <TableCell>
                      <Link to={`/player/${playerId}`}>Info</Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  <Link to={`/addplayer/${id}`}>Lägg till</Link>
                </TableCell>
                <TableCell colSpan={2}>
                  Antal spelare: {Object.keys(players).length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer> */}
        <Box style={{ height: "600px", width: "auto", flexGrow: 1 }}>
          {players && (
            <DataGrid
              columns={[
                {
                  name: "name",
                  field: "name",
                  headerName: "Namn",
                  width: 200,
                },
                {
                  name: "games",
                  field: "games",
                  label: "Matcher",
                  headerName: "G",
                  flex: 1,
                },
                {
                  name: "goals",
                  field: "goals",
                  label: "Mål",
                  headerName: "GM",
                  flex: 1,
                },
                {
                  name: "assists",
                  field: "assists",
                  label: "Assister",
                  headerName: "A",
                  flex: 1,
                },
                {
                  name: "yellowCards",
                  field: "yellowCards",
                  label: "Gula kort",
                  headerName: "GK",
                  flex: 1,
                },
                {
                  name: "redCards",
                  field: "redCards",
                  label: "Röda kort",
                  headerName: "RK",
                  flex: 1,
                },
              ]}
              rows={Object.values(players)}
              colunmDefs={columns}
              getRowId={(row) => row.playerId}
              pageSize={10}
              rowHeight={50}
              onRowDoubleClick={(event, rowData) => {
                navigate(`/player/${event.id}`);
              }}
              experimentalFeatures={{ newEditingApi: true }}
            />
          )}
        </Box>
        <Button onClick={() => navigate(`/addplayer/${id}`)}>
          Lägg till spelare
        </Button>
      </Box>
    </Container>
  );
}
