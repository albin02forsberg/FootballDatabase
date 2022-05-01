import React from "react";

export default function CreateTeam() {
  const [teamName, setTeamName] = React.useState("");
  const [players, setPlayers] = React.useState([]);

  return (
    <div className="container">
      <div className="row">
        <h1>Create Team</h1>
        <div className="form">
          <label htmlFor="name">Team Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Team Name"
            required
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
