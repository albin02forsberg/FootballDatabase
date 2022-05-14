import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config";

export default function AdminClubs() {
  const [clubs, setClubs] = React.useState([]);

  useEffect(() => {
    // Get all clubs
    const clubCollectionRef = collection(db, "clubs");
    getDocs(clubCollectionRef).then((clubs) => {
      setClubs(clubs.docs);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1>Klubber</h1>
        {clubs && (
          <div className="table-responsive">
            <table className="table">
              <tr>
                <th>Namn</th>
                <th>Förkortning</th>
                <th>Lag</th>
              </tr>
              {clubs.map((club) => (
                <tr key={club.id}>
                  <td>
                    <Link to={"/club/" + club.id}>{club.data().name}</Link>
                  </td>
                  <td>{club.data().abbr}</td>
                  <td>{club.data().teams.length}</td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
