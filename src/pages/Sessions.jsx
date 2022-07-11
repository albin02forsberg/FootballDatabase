import { Masonry } from "@mui/lab";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { collection, getDocs, orderBy } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import Loading from "../modules/Loading";
import { useQuery } from "react-query";
// import calculateTime from "../scripts/calculateTime";

export default function Sessions() {
  const { data: sessionsData, status } = useQuery("sessions", () => {
    return getDocs(collection(db, "sessions"), orderBy("createdAt", "desc"));
  });

  if (status === "loading") {
    return <Loading />;
  }

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
          {sessionsData.docs.map((session) => {
            return (
              <Card component={Link} to={"/session/" + session.id}>
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
              </Card>
            );
          })}
        </Masonry>
      </Paper>
    </Container>
  );
}
