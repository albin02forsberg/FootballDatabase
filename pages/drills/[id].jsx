import React from "react";
import { useRouter } from "next/router";
import Loading from "../../modules/Loading";
import { Box, Container } from "@mui/system";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getDrill } from "../../api/api";

export default function Drill() {
  const router = useRouter();
  const { id } = router.query;

  const { data, status } = useQuery(["Drill", id], () => {
    return getDrill(id);
  });

  if (status === "loading") {
    return <Loading />;
  }

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
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <div>
                <Typography variant="h3">{data.data().name}</Typography>
                <Divider />
                <Typography variant="h5">Vad?</Typography>
                <Typography variant="body1">
                  {data.data().type} - {data.data().what}{" "}
                </Typography>
                <Typography variant="h5">Varför?</Typography>
                <Typography variant="body1">{data.data().why}</Typography>
                <Typography variant="h5">Hur?</Typography>
                <Typography variant="body1">{data.data().how}</Typography>
                <Typography variant="h5">Organisation</Typography>
                <Typography variant="body1">{data.data().org}</Typography>
                <Typography variant="h5">Anvisningar</Typography>
                <Typography variant="body1">{data.data().desc}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              {data && (
                <img
                  className="img img-thumbnail"
                  src={data.data().imgLink}
                  alt={data.id}
                  width={"100%"}
                  loading="lazy"
                  style={{ borderRadius: "12px" }}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
