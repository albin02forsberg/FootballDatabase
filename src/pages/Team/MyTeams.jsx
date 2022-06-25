import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import Loading from "../../modules/Loading";

export default function MyTeams() {
  const [teams, setTeams] = React.useState([]);

  useEffect(() => {
    const teamsCollectionRef = collection(db, "UserTeam");
    const teamsQ = query(
      teamsCollectionRef,
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(teamsQ).then((docs) => {
      setTeams(docs.docs);
    });
  }, []);

  if (teams.length === 0) {
    <Loading />;
  }

  return (
    <Container>
      <Box mb={3}>
        <Typography variant="h4">Mina lag (Beta)</Typography>
      </Box>
      <Box mb={3}>
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
        {!teams && <Typography variant="h5">Inga lag</Typography>}
      </Box>
    </Container>
  );
}
