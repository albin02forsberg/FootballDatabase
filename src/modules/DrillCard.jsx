import React from "react";
import { Link } from "react-router-dom";

export default function DrillCard({ drill, showCreator }) {
  return (
    <div className="col mx-auto">
      <div className="card mb-3">
        <Link to={`/drill/${drill.id}`}>
          <img
            src={drill.data().imgLink}
            alt={drill.data().name}
            className="card-img-top mx-auto"
          />
        </Link>
        <div className="card-body">
          <Link to={`/drill/${drill.id}`}>
            <h5 className="card-title">{drill.data().name}</h5>
          </Link>
          <p className="card-text cut-text" id="drillDescription">
            {drill.data().description}
          </p>
          <p className="card-text">
            <small className="text-muted">
              {drill.data().difficulty} - {drill.data().type}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">{drill.data().why}</small>
          </p>
        </div>

        {showCreator && (
          <div className="card-footer">
            <p className="card-text">
              Skapad av:{" "}
              <Link to={"/user/" + drill.data().uid}>{drill.data().uname}</Link>{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
