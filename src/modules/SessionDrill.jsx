import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";

export default function SessionDrill({ drill }) {
  // Return loading screen

  return (
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
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            {drill && (
              <div>
                <Typography variant="h4">{drill.data().name}</Typography>
                <Divider />
                <Typography variant="h4">Vad?</Typography>
                <Typography variant="body1">
                  {drill.data().type} - {drill.data().what}{" "}
                </Typography>
                <Typography variant="h4">Varför?</Typography>
                <Typography variant="body1">{drill.data().why}</Typography>
                <Typography variant="h4">Hur?</Typography>
                <Typography variant="body1">{drill.data().how}</Typography>
                <Typography variant="h4">Organisation</Typography>
                <Typography variant="body1">{drill.data().org}</Typography>
                <Typography variant="h4">Anvisningar</Typography>
                <Typography variant="body1">{drill.data().desc}</Typography>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {drill && (
              <img
                className="img img-thumbnail"
                src={drill.data().imgLink}
                alt={drill.id}
                width={"auto"}
                height={"auto"}
                loading="lazy"
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
