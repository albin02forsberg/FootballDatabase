import { Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Container style={{ textAlign: "center" }}>
      <Box m={2}>
        <Paper style={{ padding: "2rem" }}>
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
      </Box>
    </Container>
  );
}
