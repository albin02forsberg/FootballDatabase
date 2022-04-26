import React from "react";
import Loading from "./Loading";

export default function SessionDrill({ drill }) {
  // Return loading screen
  if (!drill) {
    <Loading />;
  }

  return (
    <div className="row">
      <div className="grid-2">
        <div>
          <h2 id={drill.id}>{drill.data().name}</h2>
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
          <div />
        </div>
        <div className="center">
          <img
            src={drill.data().imgLink}
            className="img img-thumbnail"
            alt={drill.data().name}
          />
        </div>
      </div>
      <hr />
    </div>
  );
}
