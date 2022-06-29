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
    <Paper
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        justifyItems: "center",
        borderRadius: "12px",
        backgroundColor: "#4AE3A6",
      }}
      elevation={4}
    >
      <Avatar
        src={user.data().photo}
        alt={user.data().name}
        sx={{ width: "100px", height: "100px", margin: "20px auto" }}
      />
      {/* <div className="user-image">
        <img src={user.data().photo} alt={user.data().uname} />
      </div> */}
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        {user.data().name}
      </Typography>

      <Typography variant="p" gutterBottom align="center">
        Antal övningar: {drills}
      </Typography>
      <Typography variant="p" gutterBottom align="center">
        Gick med: {user.data().joined}
      </Typography>
      <Box>
        {(currentUser && currentUser.uid === user.id && (
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            align="center"
            fullWidth={true}
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
