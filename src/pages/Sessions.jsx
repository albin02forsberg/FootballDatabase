import React from "react";
import { Link } from "react-router-dom";

export default function Sessions() {
  return (
    <div className="container">
      <h1>Träningspass</h1>
      <Link to="/createSession" className="pageLink">
        <button className="btn btn-primary">Skapa träningspass</button>
      </Link>
    </div>
  );
}
