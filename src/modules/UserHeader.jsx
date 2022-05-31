import { Avatar, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

export default function UserHeader({ drills, user, signOut }) {
  const [currentUser, setCurrentUser] = React.useState();
  let navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  return (
    <Paper justifyContent={"center"} alignItems={"center"} flex-justifyContent>
      <Avatar
        src={user.data().photo}
        alt={user.data().uname}
        sx={{ width: "100px", height: "100px", margin: "auto" }}
      />
      {/* <div className="user-image">
        <img src={user.data().photo} alt={user.data().uname} />
      </div> */}
      <div className="user-info">
        <h2>{user.data().name}</h2>
      </div>
      <Typography variant="h2" gutterBottom justifySelf={"center"}>
        {user.data().uname}
      </Typography>
      <Typography variant="p" gutterBottom justifyContent={"center"}>
        <p>Antal övningar: {drills}</p>
      </Typography>
      <div className="user-info">
        <p>Gick med {user.data().joined}</p>
      </div>
      <Box>
        {(currentUser && currentUser.uid === user.id && (
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            sx={{ margin: "auto", width: "100%" }}
          >
            <Button
              onClick={() => {
                navigate("/profile");
              }}
            >
              Redigera profil
            </Button>
            <Button onClick={signOut} color="error">
              Logga ut
            </Button>
          </ButtonGroup>
        )) || <></>}
      </Box>
    </Paper>
  );
}
