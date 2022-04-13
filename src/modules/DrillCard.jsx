import React from "react";
import { Link } from "react-router-dom";

export default function DrillCard({ drill }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{drill.data().name}</h5>
        <p className="card-text">
          {drill.data().type} - {drill.data().difficulty}
        </p>
        <Link to={`/drill/${drill.id}`} className="btn btn-primary">
          Läs mer
        </Link>
      </div>
    </div>
  );
}
