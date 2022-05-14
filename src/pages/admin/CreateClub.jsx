import { addDoc, collection } from "firebase/firestore";
import { auth } from "../../firebase-config";
import React from "react";
import { db } from "../../firebase-config";

export default function CreateClub() {
  const [clubName, setClubName] = React.useState("");
  const [abbr, setAbbr] = React.useState("");
  const [clubNr, setClubNr] = React.useState("");
  // const [image, setImage] = React.useState("");

  const handleSubmit = (e) => {
    const ClubRef = collection(db, "clubs");
    const club = {
      name: clubName,
      abbr: abbr,
      clubNr: clubNr,
      teams: [],
      admins: [auth.currentUser.uid],
    };
    addDoc(ClubRef, club).then((doc) => {
      console.log(doc);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Skapa klubb</h1>

        <div className="form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            required
            onChange={(e) => setClubName(e.target.value)}
          />
        </div>
        <div className="form">
          <label htmlFor="description">Förkortning</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Förkortning"
            required
            onChange={(e) => setAbbr(e.target.value)}
          />
        </div>
        <div className="form">
          <label htmlFor="description">Föreningsnummer</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Föreningsnummer"
            required
            onChange={(e) => setClubNr(e.target.value)}
          />
        </div>
        {/* <div className="form">
          <label htmlFor="image" />
          <input
            type="file"
            className="form-control"
            id="image"
            placeholder="Förkortning"
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div> */}
      </div>
      <div className="form">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Skapa
        </button>
      </div>
    </div>
  );
}
