import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { db } from "../../firebase-config";
import { Link } from "react-router-dom";
import Loading from "../../modules/Loading";

export default function Drills() {
  const [drills, setDrills] = React.useState([]);

  // Get drills from firebase
  useEffect(() => {
    const drillsCollectionRef = collection(db, "drills");
    getDocs(drillsCollectionRef).then((docs) => {
      setDrills(docs.docs);
    });
  }, []);

  if (!drills.length) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h1>Drills</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Namn</th>
              <th>Skapare</th>
              <th>Redigera</th>
            </tr>
          </thead>
          <tbody>
            {drills.map((drill) => (
              <tr key={drill.id}>
                <td>
                  <Link to={"/drill/" + drill.id}>{drill.data().name}</Link>
                </td>
                <td>
                  <Link to={"/user/" + drill.data().uid}>
                    {drill.data().uname}
                  </Link>
                </td>
                <td>
                  <Link to={"/editDrill/" + drill.id}>
                    <button className="btn btn-primary">Redigera</button>
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
