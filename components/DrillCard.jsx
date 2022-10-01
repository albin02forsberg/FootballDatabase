import React from "react";
import Link from "next/link";
import calculateTime from "../api/calculateTime";

export default function DrillCard({ drill, id, showCreator }) {
  return (
    <div className="card rounded-3">
      <div className="card-img-top">
        <img
          src={drill.imgLink}
          alt={drill.name}
          className="img-fluid"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{drill.name}</h5>
        <p className="card-text">{drill.description}</p>
        {showCreator && (
          <Link href={`/user/${drill.uid}`} className="card-text">
            <small className="text-muted">{drill.uname}</small>
          </Link>
        )}
      </div>
      <div
        className="card-footer"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p className="card-text">
          <small className="text-muted">
            {calculateTime(drill.created.seconds)}
          </small>
        </p>
        <Link href={`/drills/${id}`}>
          <a className="btn btn-primary">Öppna</a>
        </Link>
      </div>
    </div>
  );
}
