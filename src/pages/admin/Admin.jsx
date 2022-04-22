import { collection, doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import { Link } from "react-router-dom";
import Loading from "../../modules/Loading";

export default function Admin() {
  let navigate = useNavigate();
  const [user, setUser] = React.useState();

  if (!user) {
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

  return (
    <div className="container">
      <h1>Adminpanelen</h1>
      <div className="row">
        {/* show cards to users and drills */}
        <Link to="/admin/users">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Användare</h5>
              <p className="card-text">
                Här kan du se alla användare och redigera dem.
              </p>
            </div>
          </div>
        </Link>
        <Link to="/admin/drills">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Övningar</h5>
              <p className="card-text">
                Här kan du se alla övningar och redigera dem.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
