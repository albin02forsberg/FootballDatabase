import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
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
  const [drills, setDrills] = React.useState([]);

  useEffect(() => {
    document.title = "Övningar";
    const drillQ = query(
      collection(db, "drills"),
      orderBy("created", "desc"),
      limit(8)
    );
    getDocs(drillQ).then((docs) => {
      setDrills(docs.docs);
    });
  }, []);

  const fetchMore = () => {
    const drillQ = query(
      collection(db, "drills"),
      orderBy("created", "desc"),
      limit(8),
      startAfter(drills[drills.length - 1])
    );
    getDocs(drillQ).then((docs) => {
      setDrills([...drills, ...docs.docs]);
      console.log(drills);
    });
  };

  if (drills.length === 0) {
    return <Loading />;
  }
  return (
    <div className="container">
      <h1>Övningar</h1>
      <Link to="/createDrill" className="pageLink">
        <button className="btn btn-primary">Skapa övning</button>
      </Link>
      <div className="row">
        <div className="grid">
          {drills &&
            drills.map((drill, index) => {
              return (
                <Suspense fallback={<Loading />}>
                  <DrillCard drill={drill} index={index} showCreator={true} />
                </Suspense>
              );
            })}
        </div>
      </div>
      <button className="btn btn-primary" onClick={fetchMore}>
        Visa fler
      </button>
    </div>
  );
}
