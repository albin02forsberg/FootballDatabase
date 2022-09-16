import { Avatar, Typography } from "@mui/material";
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

  // Format Tue, 05 Jul 2022 16:58:18 GMT to 05 Jul 2022
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

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
        Antal övningar: {drills.length}
      </Typography>
      <Typography variant="h6" gutterBottom align="center">
        Medlem sedan {formatDate(user.data().joined)}
      </Typography>
    </div>
  );
}
