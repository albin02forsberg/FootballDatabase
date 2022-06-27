import { collection, doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import { Link } from "react-router-dom";
import Loading from "../../modules/Loading";
import { Container } from "@mui/system";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

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
    <Container>
      <h1>Adminpanelen</h1>
      <Grid spacing={3}>
        {/* show cards to users and drills */}
        <Card variant="outlined" component={Link} to="/admin/users">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Användare
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Här kan du se alla användare och ändra deras roller.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card variant="elevation" component={Link} to="/admin/drills">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Övningar
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Här kan du se alla övningar och redigera dem.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card variant="outlined" component={Link} to="/admin/clubs">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Klubbar
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Här kan du se alla klubbar och redigera dem.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card variant="outlined" component={Link} to="/admin/teams">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lag
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Här kan du se alla lag och redigera dem.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card variant="outlined" component={Link} to="/admin/createClub">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Skapa klubb
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Här kan du skapa en ny klubb.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Container>
  );
}
