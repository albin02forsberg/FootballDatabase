import React from "react";
import { Link } from "react-router-dom";

export default function Drills() {
  return (
    <div className="container">
      <h1>Övningar</h1>
      <Link to="/createDrill" className="pageLink">
        <button className="btn btn-primary">Skapa övning</button>
      </Link>
    </div>
  );
}
