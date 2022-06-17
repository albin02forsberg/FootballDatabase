import { Masonry } from "@mui/lab";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import Loading from "../modules/Loading";
// import calculateTime from "../scripts/calculateTime";

export default function Sessions() {
  const [sessions, setSessions] = React.useState(null);

  useEffect(() => {
    document.title = "Träningspass";
    const sessionQ = query(
      collection(db, "sessions"),
      orderBy("created", "desc")
    );
    getDocs(sessionQ).then((docs) => {
      setSessions(docs.docs);
    });
  }, []);

  if (!sessions) {
    return <Loading />;
  }

  return (
    <Container>
      <Box mb={3}></Box>
      <Box mb={3}>
        <Typography variant="h4">Träningspass</Typography>
      </Box>
      <Box mb={3}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/createsession"
        >
          Skapa träningspass
        </Button>
      </Box>
      <Masonry columns={{ md: 4, sm: 1 }} spacing={3}>
        {sessions.map((session) => {
          return (
            <Card>
              <Link to={`/session/${session.id}`}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h5">{session.data().name}</Typography>
                    <Typography variant="body1">
                      {session.data().desc}
                    </Typography>
                    <Typography variant="body1">
                      Antal övningar {session.data().drills.length}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          );
        })}
      </Masonry>
    </Container>
  );
}
