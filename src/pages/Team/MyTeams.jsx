import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import Loading from "../../modules/Loading";

export default function MyTeams() {
  const [teams, setTeams] = React.useState([]);

  useEffect(() => {
    const teamsCollectionRef = collection(db, "UserTeam");
    const teamsQ = query(
      teamsCollectionRef,
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(teamsQ).then((docs) => {
      setTeams(docs.docs);
    });
  }, []);

  if (teams.length === 0) {
    <Loading />;
  }

  return (
    <div className="container">
      <div className="row">
        <h1>Mina lag (Beta)</h1>
        <div className="grid">
          {(teams &&
            teams.map((team) => {
              return (
                <div className="card">
                  <Link to={`/team/${team.data().teamId}`}>
                    <h2>
                      {team.data().club} - {team.data().name}
                    </h2>
                  </Link>
                </div>
              );
            })) || <p>Du är inte kopplad till något lag...</p>}
        </div>
        {/* <div>{teams2.length === 0 && <h2>Du har inga lag</h2>}</div> */}
      </div>
    </div>
  );
}
