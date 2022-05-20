import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import Loading from "../../modules/Loading";

export default function MyTeams() {
  const [teams, setTeams] = React.useState();
  const [teams2, setTeams2] = React.useState();

  useEffect(() => {
    const teamsCollectionRef = collection(db, "UserTeam");
    const teamsQ = query(
      teamsCollectionRef,
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(teamsQ)
      .then((docs) => {
        setTeams(docs.docs);
      })
      .then(() => {
        teams.map((team) => {
          const teamRef = collection(db, "teams");
          const teamQ = query(
            teamRef,
            where("__name__", "==", team.data().teamId)
          );
          getDocs(teamQ).then((docs) => {
            setTeams2(docs.docs);
          });
        });
      });
  }, [teams]);

  if (!teams2) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="row">
        <h1>Mina lag</h1>
        <div className="grid">
          {teams2 &&
            teams2.map((team) => {
              return (
                <div className="card">
                  <Link to={`/team/${team.id}`}>
                    <h2>
                      {team.data().club} - {team.data().name}
                    </h2>
                  </Link>
                </div>
              );
            })}
        </div>
        {/* <div>{teams2.length === 0 && <h2>Du har inga lag</h2>}</div> */}
      </div>
    </div>
  );
}
