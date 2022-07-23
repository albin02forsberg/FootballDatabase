import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  // Return 404 page

  return (
    <Container>
      <Paper
        style={{
          padding: "2rem",
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        <Typography variant="h4">404</Typography>
        <Typography variant="body2"> Sidan du söker finns inte. </Typography>
        <Typography variant="body2">
          {" "}
          <Link to="/">Gå tillbaka till startsidan</Link>{" "}
        </Typography>
      </Paper>
    </Container>
  );
}
