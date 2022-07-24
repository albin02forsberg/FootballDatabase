import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Container style={{ textAlign: "center" }}>
      <Paper
        style={{
          padding: "1rem",
          margin: "0.5rem",
          backgroundColor: "#fafafa",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="body2">
          {/* Copyright information  */}© Fotbollsträning.se {currentYear} All
          rights reserved.
        </Typography>
        <Typography variant="body2">
          {/* Privacy policy */}
          <Link to="/privacy">Privacy policy</Link>
        </Typography>
        <Typography variant="body2">
          {/* Terms of use */}
          <Link to="/terms-of-use">Terms of use</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
