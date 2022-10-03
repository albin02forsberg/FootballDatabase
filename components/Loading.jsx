import { CircularProgress, LinearProgress, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function Loading() {
  // Return loading screen
  return (
    <header class="bg-dark py-5">
      <div class="container px-5">
        <div class="row gx-5 align-items-center justify-content-center">
          <div class="col-lg-8 col-xl-7 col-xxl-6">
            <div class="my-5 text-center ">
              <h1 class="display-5 fw-bolder text-white mb-2">
                Laddar innehåll...
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
