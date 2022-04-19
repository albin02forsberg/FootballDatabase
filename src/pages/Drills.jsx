import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { Suspense, useEffect, lazy } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import Loading from "../modules/Loading";

const DrillCard = lazy(() => {
  return Promise.all([
    import("../modules/DrillCard"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

export default function Drills() {
  const [drills, setDrills] = React.useState();

  useEffect(() => {
    document.title = "Övningar";
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
      <hr />
      <div className="row row-cols-1 row-cols-md-4 mx-auto">
        {drills &&
          drills.map((drill) => {
            return (
              <Suspense fallback={<Loading />}>
                <DrillCard drill={drill} showCreator={true} />
              </Suspense>
            );
          })}
      </div>
    </div>
  );
}
