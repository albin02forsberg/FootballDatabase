import { AppBar, ImageListItemBar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static">
      <Link to="/" style={{ display: "flex", justifyContent: "center" }}>
        <h1>
          <img src="/logo-trans.png" alt="logo" style={{ height: "100px" }} />
        </h1>
      </Link>
    </AppBar>
  );
}
