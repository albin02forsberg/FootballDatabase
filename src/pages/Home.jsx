import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { Suspense } from "react";
import { db } from "../firebase-config";
import { Link } from "react-router-dom";
import calculateTime from "../scripts/calculateTime";
import Loading from "../modules/Loading";
import { Box, Container } from "@mui/system";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DrillCard from "../modules/DrillCard";
import { Masonry } from "@mui/lab";
import { useQuery } from "react-query";

export default function Home() {
  const { data: recDrills, status } = useQuery("recommendedDrills", () => {
    const q = query(collection(db, "drills"), limit(4));
    return getDocs(q);
  });

  const { data: newsData, status: newsStatus } = useQuery("news", () => {
    return getDocs(
      collection(db, "news"),
      limit(3),
      orderBy("createdAt", "asc")
    );
  });

  if (status === "loading" || newsStatus === "loading") {
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
        <Box>
          <Masonry columns={{ md: 2, sm: 1 }}>
            <Card variant="outlined" component={Link} to="/drills">
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Övningar
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Här kan du läsa om alla övningar som finns i vår databas.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card variant="outlined" component={Link} to="/sessions">
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Träningspass
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Här kan du läsa om alla träningspass som finns i vår
                    databas.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Masonry>
        </Box>
      </Paper>
      <Grid container spacing={3} columns={{ xs: 4, md: 12 }}>
        <Grid item xs>
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
              <Typography variant="h4">Rekommenderade övningar</Typography>
            </Box>
            <Masonry columns={{ md: 2, sm: 1 }}>
              {recDrills &&
                recDrills.docs.map((drill) => (
                  <Suspense fallback={<Loading />}>
                    <DrillCard drill={drill} />
                  </Suspense>
                ))}
            </Masonry>
          </Paper>
        </Grid>
        <Grid item xs={6}>
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
              <Typography variant="h4">Nyheter</Typography>
            </Box>
            <Stack spacing={2}>
              {newsData.docs.map((newsItem) => (
                <Paper key={newsItem.id} style={{ borderRadius: "12px" }}>
                  <Card
                    component={Link}
                    to={"/news/" + newsItem.id}
                    style={{ borderRadius: "12px", textDecoration: "none" }}
                  >
                    <Paper elevation={4} style={{ borderRadius: "12px" }}>
                      <CardActionArea>
                        <CardContent>
                          <Typography
                            variant="h5"
                            style={{ textDecoration: "none" }}
                          >
                            {newsItem.data().title}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ textDecoration: "none" }}
                          >
                            {newsItem.data().content}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Typography variant="caption">
                            {calculateTime(newsItem.data().created.seconds)} -{" "}
                            {newsItem.data().uname}
                          </Typography>
                        </CardActions>
                      </CardActionArea>
                    </Paper>
                  </Card>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
