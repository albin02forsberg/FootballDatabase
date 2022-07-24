import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";

export default function SessionDrill({ drill }) {
  // Return loading screen

  return (
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
              <Typography variant="h4">{drill.data().name}</Typography>
              <Divider />
              <Typography variant="h5">Vad?</Typography>
              <Typography variant="body1">
                {drill.data().type} - {drill.data().what}{" "}
              </Typography>
              <Typography variant="h5">Varför?</Typography>
              <Typography variant="body1">{drill.data().why}</Typography>
              <Typography variant="h5">Hur?</Typography>
              <Typography variant="body1">{drill.data().how}</Typography>
              <Typography variant="h5">Organisation</Typography>
              <Typography variant="body1">{drill.data().org}</Typography>
              <Typography variant="h5">Anvisningar</Typography>
              <Typography variant="body1">{drill.data().desc}</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {drill && (
              <img
                className="img img-thumbnail"
                src={drill.data().imgLink}
                alt={drill.id}
                width={"100%"}
                loading="lazy"
                style={{ borderRadius: "12px" }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
