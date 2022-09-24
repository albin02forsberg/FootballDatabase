import { faHome, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  return (
    <BottomNavigation
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        router.push(newValue);
      }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<FontAwesomeIcon icon={faHome} />}
      />
      <BottomNavigationAction
        label="Övningar"
        icon={<FontAwesomeIcon icon={faPersonRunning} />}
      />
    </BottomNavigation>
  );
}
