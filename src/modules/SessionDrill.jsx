import React from "react";

export default function SessionDrill({ drill }) {
  // Return loading screen
  return (
    <div className="row">
      <div className="col-md-6">
        <h2>{drill.data().name}</h2>
        <hr></hr>
        <h3>Vad?</h3>
        <p>{drill.data().type}</p>
        <h3>Varför?</h3>
        <p>{drill.data().why}</p>
        <h3>Hur?</h3>
        <p>{drill.data().how}</p>
        <h3>Organisation</h3>
        <p>{drill.data().org}</p>
        <h3>Anvisningar</h3>
        <p>{drill.data().desc}</p>
      </div>
      <div className="col-md-6">
        <img
          src={drill.data().imgLink}
          className="img img-thumbnail"
          alt={drill.data().name}
        />
      </div>
      <hr />
    </div>
  );
}
