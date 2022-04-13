import React, { useEffect, lazy, Suspense } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const Canvas = lazy(() => import("../modules/Canvas"));

export default function CreateDrill() {
  let navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("Spelövning");
  const [what, setWhat] = React.useState("Aktivering");
  const [difficulty, setDifficulty] = React.useState("3 mot 3");
  const [why, setWhy] = React.useState("");
  const [how, setHow] = React.useState("");
  const [org, setOrg] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [img, setImg] = React.useState("");

  const drillCollectionRef = collection(db, "drills");

  useEffect(() => {
    document.title = "Skapa övning";
    if (!auth.currentUser) {
      navigate("/");
    }
  }, [navigate]);

  const createDrill = async () => {
    addDoc(drillCollectionRef, {
      name,
      type,
      difficulty,
      what,
      why,
      how,
      org,
      desc,
      imgLink: img,
      uname: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      created: new Date(),
    }).then((doc) => {
      navigate("/drill/" + doc.id);
    });
  };

  return (
    <div className="container">
      <h1>Skapa övning</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label class="form-label">Övningens namn</label>
            <input
              className="form-control"
              placeholder="Övningens namn"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label class="form-label">
              <b>Typ</b> av övning
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="Spelövning">Spelövning</option>
              <option value="Färdighetsövning">Färdighetsövning</option>
              <option value="Fysövning">Fysövning</option>
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
          <div className="mb-3">
            <label class="form-label">
              <b>Vad</b> ska tränas?
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                setWhat(e.target.value);
              }}
            >
              <optgroup label="Fotbollsuppvärmning - förberedelseträning">
                <option value="Aktivering">Aktivering</option>
                <option value="Fotbollsrörlighet">Fotbollsrörlighet</option>
                <option value="Löpteknik">Löpteknik</option>
                <option value="Fotarbete">Fotarbete</option>
                <option value="Hoppa-landa-löp">Hoppa-landa-löp</option>
              </optgroup>
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
                <option value="Fotbollskoordination">
                  Fotbollskoordination
                </option>
                <option value="Lek">Lek</option>
              </optgroup>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Varför</b> ska detta tränas?
            </label>
            <textarea
              className="form-control"
              rows="5"
              placeholder="Ange varför detta ska tränas kopplat till vad spelaren och laget ska förstärka eller förbättra. Exempelvis: spela sig ur press i speluppbyggnaden. Färdighetsövning: förbättra tillslagstekniken inför spelet"
              onChange={(e) => {
                setWhy(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Hur</b> ska det tränas?
            </label>
            <textarea
              className="form-control"
              rows="5"
              placeholder="Beteenden/aktioner som gör att övningens 'vad' uppfylls. För spelövning: Vad prioriteras i de aktuella skedena? När ska spelarna agera? Vilket arbetssätt ska spelarna tillämpa? För färdighetsövning: Ange när och hur spelaren ska agera. Driv bollen framåt för att erövra tom yta"
              onChange={(e) => {
                setHow(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <span class="form-label">Organisation</span>
            <textarea
              class="form-control"
              rows="5"
              aria-label="With textarea"
              placeholder="Antal spelare (inklusive målvakter och jokrar), yta, eller spelplan med mål, bollar, koner och västar. För spelövning: Lagets formation"
              onChange={(e) => {
                setOrg(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="mb-3">
            <span class="form-label">Anvisningar</span>
            <textarea
              class="form-control"
              rows="5"
              aria-label="With textarea"
              placeholder="Regler, förutsättningar och kort övningsbeskrivning. Var är uppgiften?"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></textarea>
          </div>
          {/* <div className="mb-3">
            <label for="formFile" class="form-label">
              Bild på övningen
            </label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
            ></input>
          </div> */}
          <div className="mb-3">
            <button className="btn btn-primary" onClick={createDrill}>
              Spara
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <Suspense fallback={<div>Loading...</div>}>
            <Canvas setImage={setImg} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
