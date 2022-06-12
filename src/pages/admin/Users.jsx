import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
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
    <Container>
      <Box mb={3}></Box>
      <Typography variant="h4">Användare</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Namn</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Roll</TableCell>
            <TableCell>Gick med</TableCell>
            <TableCell>Senast inloggad</TableCell>
            <TableCell>Profilbild</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={"/user/" + user.id}>{user.data().name}</Link>
                  </TableCell>
                  <TableCell>{user.data().email}</TableCell>
                  <TableCell>{user.data().role}</TableCell>
                  <TableCell>{user.data().joined}</TableCell>
                  <TableCell>{user.data().lastSignInTime}</TableCell>
                  <TableCell>
                    <img
                      src={user.data().photo}
                      alt={user.data().name}
                      width="50"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Container>
  );
}
