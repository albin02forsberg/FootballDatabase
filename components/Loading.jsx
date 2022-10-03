import { CircularProgress, LinearProgress, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function Loading() {
  // Return loading screen
  return (
    <section class="py-5">
      <div class="container px-5 my-5">
        <div class="row gx-5 justify-content-center">
          <div class="col-lg-12">
            <LinearProgress />
          </div>
        </div>
      </div>
    </section>
  );
}
