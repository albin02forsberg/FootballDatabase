import { LinearProgress, Paper } from "@mui/material";
import React from "react";

export default function Loading() {
  // Return loading screen
  return (
    <Paper>
      <LinearProgress />
    </Paper>
  );
}
