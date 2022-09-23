import { LinearProgress, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function Loading() {
  // Return loading screen
  return (
    <Container>
      <Paper>
        <LinearProgress />
      </Paper>
    </Container>
  );
}
