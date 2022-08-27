import { Avatar, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function UserHeader({ drills, user, signOut }) {
  // const [currentUser, setCurrentUser] = React.useState();
  // let navigate = useNavigate();

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //     }
  //   });
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        justifyItems: "center",
        borderRadius: "12px",
        backgroundImage: "linear-gradient(to right, #5A4AE3, #4AE3A6, #5A4AE3)",
        padding: 0,
      }}
    >
      <Avatar
        src={user.data().photo}
        alt={user.data().name}
        sx={{ width: "100px", height: "100px", margin: "20px auto" }}
      />
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: "rgb(10, 10, 10)" }}
      >
        {user.data().name}
      </Typography>

      <Typography variant="h6" gutterBottom align="center">
        Antal övningar: {drills}
      </Typography>
      <Typography variant="h6" gutterBottom align="center">
        Gick med: {user.data().joined}
      </Typography>
    </div>
  );
}
