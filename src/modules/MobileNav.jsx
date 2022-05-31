import React, { useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import user icon
import {
  faUser,
  faHome,
  faPersonRunning,
  faHammer,
  faUsers,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

export default function MobileNav({ user, isAuth }) {
  const [state, setState] = useState(1);

  return (
    <Paper sx={{ position: "fixed", bottom: 0, width: "100%" }}>
      <BottomNavigation
        value={state}
        onChange={(e, newValue) => setState(newValue)}
      >
        <BottomNavigationAction
          label="Hem"
          icon={<FontAwesomeIcon icon={faHome} />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Övningar"
          icon={<FontAwesomeIcon icon={faPersonRunning} />}
          component={Link}
          to="/drills"
        />
        <BottomNavigationAction
          label="Träningspass"
          icon={<FontAwesomeIcon icon={faAlignJustify} />}
          component={Link}
          to="/sessions"
        />
        {user && (
          <BottomNavigationAction
            label="Mina lag"
            icon={<FontAwesomeIcon icon={faUsers} />}
            component={Link}
            to="/myteams"
          />
        )}
        {user ? (
          <BottomNavigationAction
            label="Min profil"
            icon={<FontAwesomeIcon icon={faUser} />}
            component={Link}
            to={`/user/${user.uid}`}
          />
        ) : (
          <BottomNavigationAction
            label="Logga in"
            icon={<FontAwesomeIcon icon={faUser} />}
            component={Link}
            to="/login"
          />
        )}
        {user && user.role === "admin" && (
          <BottomNavigationAction
            label="Admin"
            icon={<FontAwesomeIcon icon={faHammer} />}
            component={Link}
            to="/admin"
          />
        )}
      </BottomNavigation>
    </Paper>
  );
}
