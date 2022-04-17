import React from "react";
import { Link } from "react-router-dom";

export default function SessionDrillCard({ drill }) {
  return (
    <div className="card m-1">
      <div className="card-body">
        <Link to={`/drill/${drill.id}`}>
          <h5 className="card-title">{drill.data().name}</h5>
        </Link>
        <p className="card-text">{drill.data().description}</p>
        <p className="card-text">
          <small className="text-muted">
            {drill.data().difficulty} - {drill.data().type}
          </small>
        </p>
      </div>
    </div>
  );
}
