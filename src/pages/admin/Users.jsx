import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import Loading from "../../modules/Loading";

export default function Users() {
  let navigate = useNavigate();
  const [user, setUser] = React.useState();
  const [users, setUsers] = React.useState();

  if (!user && !users) {
    <Loading />;
  }
  // Check if user is logged in and is owner
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userCollectionRef = collection(db, "users");
        const userRef = doc(userCollectionRef, user.uid);
        getDoc(userRef)
          .then((u) => {
            setUser(u);
            if (u.data().role !== "admin") {
              navigate("/");
            }
            document.title = u.data().name;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  useEffect(() => {
    // Get all users
    const userCollectionRef = collection(db, "users");
    getDocs(userCollectionRef).then((docs) => {
      setUsers(docs.docs);
    });
  }, []);

  return (
    <div className="container">
      <h1>Användare</h1>
      <div className="row">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Namn</th>
                <th>Email</th>
                <th>Roll</th>
                <th>Skapad</th>
                <th>Senast inloggad</th>
                <th>Bild</th>
                <th>Redigera</th>
              </tr>
            </thead>
            {users &&
              users.map((user) => {
                return (
                  <tbody>
                    <tr>
                      <td>
                        <Link to={"/user/" + user.id}>{user.data().name}</Link>
                      </td>
                      <td>{user.data().email}</td>
                      <td>{user.data().role}</td>
                      <td>{user.data().joined}</td>
                      <td>{user.data().lastSignInTime}</td>
                      <td>
                        <img
                          src={user.data().photo}
                          alt={user.data().name}
                          className="img-fluid"
                        />
                      </td>
                      <td>
                        <Link to={"/editUser/" + user.id}>
                          <button className="btn btn-primary">Redigera</button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
}
