import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export default function Loading() {
  // Return loading screen
  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  );
}
