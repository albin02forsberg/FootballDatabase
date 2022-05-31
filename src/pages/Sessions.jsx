import { Masonry } from "@mui/lab";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  ListItem,
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
      <Masonry columns={{ md: 4, sm: 1 }} spacing={3}>
        {sessions.map((session) => {
          return (
            <ListItem key={session.id}>
              <Link to={`/session/${session.id}`}>
                <Card variant="outlined">
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h5">
                        {session.data().name}
                      </Typography>
                      <Typography variant="body1">
                        {session.data().desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to={`/session/${session.id}`}>
                      <Typography variant="body1">Läs mer</Typography>
                    </Link>
                  </CardActions>
                </Card>
              </Link>
            </ListItem>
          );
        })}
      </Masonry>
    </Container>
  );
}
