import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      const u = docs.docs.map((doc) => doc.data());
      setUsers(u);
    });
  }, []);

  return (
    <Container>
      <Box mb={3} style={{ width: "auto", height: "500px" }}>
        <Typography variant="h4">Användare</Typography>
        {users && (
          <DataGrid
            columns={[
              {
                name: "name",
                field: "name",
                label: "Namn",
                flex: 1,
              },
              {
                name: "email",
                field: "email",
                label: "E-post",
                flex: 1,
              },
              {
                name: "Roll",
                field: "role",
                label: "Roll",
                flex: 1,
              },
              {
                name: "Gick med",
                field: "joined",
                label: "Gick med",
                flex: 1,
              },
            ]}
            rows={
              users &&
              users.map((user) => {
                return {
                  id: user.uid,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  joined: user.joined,
                };
              })
            }
          />
        )}
      </Box>
      {/* <Table>
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
      </Table> */}
    </Container>
  );
}
