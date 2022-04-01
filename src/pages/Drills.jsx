import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";

export default function Drills() {
  const [drills, setDrills] = React.useState();

  useEffect(() => {
    const drillQ = query(collection(db, "drills"), orderBy("created", "desc"));
    getDocs(drillQ).then((docs) => {
      setDrills(docs.docs);
    });
  }, []);

  return (
    <div className="container">
      <h1>Övningar</h1>
      <Link to="/createDrill" className="pageLink">
        <button className="btn btn-primary">Skapa övning</button>
      </Link>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Namn</th>
              <th scope="col">Typ</th>
              <th scope="col">Nivå</th>
              <th scope="col">Skapad av:</th>
            </tr>
          </thead>
          <tbody>
            {drills && // If drills is not null
              // Loop through drills and create a table row for each drill
              drills.map((drill) => (
                <tr key={drill.id}>
                  <td>
                    <Link to={"/drill/" + drill.id}>{drill.data().name}</Link>
                  </td>
                  <td>{drill.data().type}</td>
                  <td>{drill.data().difficulty}</td>
                  <td>
                    <Link to={"/user/" + drill.data().uid}>
                      {" "}
                      {drill.data().uname}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
