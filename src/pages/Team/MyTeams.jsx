import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";

export default function MyTeams() {
  const [teams, setTeams] = React.useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const teamsCollectionRef = collection(db, "UserTeam");
    if (auth.currentUser) {
      const teamsQ = query(
        teamsCollectionRef,
        where("uid", "==", "" || auth.currentUser.uid)
      );
      getDocs(teamsQ).then((docs) => {
        setTeams(docs.docs);
      });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Container>
      <Paper
        style={{
          padding: "1rem",
          margin: "1rem",
          backgroundColor: "#fafafa",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box mb={3}>
          <Typography variant="h4">Mina lag (Beta)</Typography>
        </Box>
        <Box mb={3}>
          {teams.length > 0 ? (
            <List>
              {teams.map((team) => (
                <>
                  <ListItem>
                    <ListItemButton
                      component={Link}
                      to={`/team/${team.data().teamId}`}
                    >
                      <Typography variant="h6">
                        {team.data().club} - {team.data().name}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          ) : (
            <Typography variant="h6">Du är inte med i något lag</Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
