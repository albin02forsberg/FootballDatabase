import React, { useEffect } from "react";
import { auth, db } from "../firebase-config";
import { getDocs, collection, where, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreateSession() {
  let navigate = useNavigate();
  const [name, setName] = React.useState("");

  const [difficulty, setDifficulty] = React.useState("");
  const [type, setType] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [drills, setDrills] = React.useState([]);
  const [selectedDrills, setSelectedDrills] = React.useState([]);

  useEffect(() => {
    getDocs(
      collection(db, "drills"),
      where("creator.uid", "==", auth.currentUser.uid)
    ).then((docs) => {
      setDrills(docs.docs);
    });
  }, []);

  const createSession = async () => {
    const sessionCollectionRef = collection(db, "sessions");
    const session = {
      name,
      difficulty,
      type,
      desc,
      drills: selectedDrills,
      name: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      created: new Date(),
    };
    addDoc(sessionCollectionRef, session).then((doc) => {
      navigate("/session/" + doc.id);
    });
  };

  return (
    <div className="container">
      <h1>Skapa träningspass</h1>
      <div className="row">
        <div className="mb-3">
          <label class="form-label">Passets namn</label>
          <input
            className="form-control"
            placeholder="Passets namn"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label class="form-label">
            <b>Vad</b> ska tränas?
          </label>
          <select
            className="form-control"
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <optgroup label="Anfallsspel">
              <option value="Speluppbyggnad">Speluppbyggnad</option>
              <option value="Kontring">Kontring</option>
              <option value="Komma till avslut och göra mål">
                Komma till avslut och göra mål
              </option>
            </optgroup>
            <optgroup label="Försvarsspel">
              <option value="Förhindra speluppbyggnad">
                Förhindra speluppbyggnad
              </option>
              <option value="Återerövring av bollen">
                Återerövring av bollen
              </option>
              <option value="Förhindra och rädda avslut">
                Förhindra och rädda avslut
              </option>
            </optgroup>
            <optgroup label="Fotbollsfys">
              <option value="Explosiv träning">Explosiv träning</option>
              <option value="Förbättra och behålla återhämtningsförmågan mellan fotbollsaktioner">
                Förbättra och behålla återhämtningsförmågan mellan
                fotbollsaktioner
              </option>
              <option value="Fotbollsstyrka">Fotbollsstyrka</option>
              <option value="Fotbollsrörlighet">Fotbollsrörlighet</option>
              <option value="Fotbollskoordination">Fotbollskoordination</option>
              <option value="Lek">Lek</option>
            </optgroup>
          </select>
        </div>
        <div className="mb-3">
          <label class="form-label">
            <b>Vilka</b> ska träna?
          </label>
          <select
            className="form-control"
            onChange={(e) => {
              setDifficulty(e.target.value);
            }}
          >
            <option value="3 mot 3">3 mot 3</option>
            <option value="5 mot 5">5 mot 5</option>
            <option value="7 mot 7">7 mot 7</option>
            <option value="9 mot 9">9 mot 9</option>
            <option value="11 mot 11">11 mot 11</option>
          </select>
        </div>
      </div>
      <div className="row">
        <h2>Välj övningar</h2>
        <hr></hr>
        <div className="col-md-6">
          <h3>Mina övningar</h3>
          {drills &&
            drills.map((drill) => {
              return (
                <div className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{drill.data().name}</h5>
                    <p className="card-text">{drill.data().description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        {drill.data().difficulty} - {drill.data().type}
                      </small>
                    </p>
                    <button
                      className="btn btn-success"
                      value={drill.data()}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(e.target.value);
                        if (!selectedDrills.includes(drill.data())) {
                          setSelectedDrills([...selectedDrills, drill.data()]);
                          e.target.innerText = "Ta bort";
                          e.target.className = "btn btn-danger";
                        } else {
                          // remove drill from selectedDrills
                          setSelectedDrills(
                            selectedDrills.filter((d) => d !== drill.data())
                          );
                          // change button text to add
                          e.target.innerText = "Välj";
                          e.target.className = "btn btn-success";
                        }
                      }}
                    >
                      Välj
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="col-md-6">
          <h3>Mina favoriter</h3>
        </div>
      </div>
      <button className="btn btn-primary" onClick={createSession}>
        Spara
      </button>
    </div>
  );
}
