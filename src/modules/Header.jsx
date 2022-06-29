import {
  faHome,
  faInfo,
  faUser,
  faBars,
  faPersonRunning,
  faPhone,
  faAlignJustify,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Avatar,
  ButtonBase,
  Popper,
  Fade,
  Paper,
  ListItem,
  List,
  Drawer,
  Typography,
  Divider,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Header({ user, signOut }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const toggleDrawer = (open) => (event) => {
    setOpenDrawer(!openDrawer);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <Paper
      elevation={4}
      style={{
        borderRadius: "12px",
        margin: "auto",
        marginTop: "20px",
        marginBottom: "20px",
        width: "96vw",
        backgroundColor: "#5A4AE3",
      }}
    >
      {/* logo & toggler button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "auto",
        }}
        style={{ padding: "1rem 1rem" }}
      >
        <Box
          component={Link}
          to="/"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <img src="./logo-white.png" alt="logo" style={{ width: "60px" }} />
        </Box>
        <ButtonBase
          sx={{ borderRadius: "12px", overflow: "hidden" }}
          style={{ margin: "0 10px ", width: "60px" }}
          onClick={toggleDrawer(false)}
        >
          <FontAwesomeIcon icon={faBars} style={{ color: "white" }} />
        </ButtonBase>
        <ButtonBase
          sx={{ borderRadius: "12px", overflow: "hidden" }}
          onClick={handleClick}
          aria-describedby={id}
          type="button"
        >
          <Avatar
            variant="rounded"
            // onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            {user ? (
              (console.log(user),
              (
                <img
                  src={user.photo}
                  alt="avatar"
                  style={{ width: "100%", height: "100%" }}
                />
              ))
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )}
          </Avatar>
        </ButtonBase>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition
          placement="bottom-end"
          modifiers={{
            flip: {
              enabled: false,
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: "scrollParent",
            },
          }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={8} style={{ width: "200px" }}>
                <List>
                  {user && (
                    <>
                      <ListItem
                        button
                        component={Link}
                        to={`/user/${user.uid}`}
                        onClick={handleClick}
                      >
                        <Typography variant="body1">{user.name}</Typography>
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="#"
                        onClick={signOut}
                      >
                        <Typography variant="body1">Logga ut</Typography>
                      </ListItem>
                      {user.role === "admin" && (
                        <ListItem
                          button
                          component={Link}
                          to="/admin"
                          onClick={handleClick}
                        >
                          <Typography variant="body1">Admin</Typography>
                        </ListItem>
                      )}
                    </>
                  )}
                  {!user && (
                    <ListItem
                      button
                      component={Link}
                      to="/login"
                      onClick={handleClick}
                    >
                      <Typography variant="body1">Logga in</Typography>
                    </ListItem>
                  )}
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          <Paper elevation={8} style={{ height: "100%", padding: "0" }}>
            <List>
              <ButtonBase
                onClick={toggleDrawer(false)}
                component={Link}
                to="/"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "2rem",
                }}
              >
                <FontAwesomeIcon icon={faHome} />
              </ButtonBase>
              <Divider />
              <ButtonBase
                onClick={toggleDrawer(false)}
                component={Link}
                to="/drills"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "2rem",
                }}
              >
                <FontAwesomeIcon icon={faPersonRunning} />
              </ButtonBase>
              <Divider />
              <ButtonBase
                onClick={toggleDrawer(false)}
                component={Link}
                to="/sessions"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "2rem",
                }}
              >
                <FontAwesomeIcon icon={faAlignJustify} />
              </ButtonBase>
              <Divider />
              <ButtonBase
                onClick={toggleDrawer(false)}
                component={Link}
                to="/myteams"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "2rem",
                }}
              >
                <FontAwesomeIcon icon={faUsers} />
              </ButtonBase>
              <Divider />
              <ButtonBase
                onClick={toggleDrawer(false)}
                component={Link}
                to="/about"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "2rem",
                }}
              >
                <FontAwesomeIcon icon={faInfo} width={"100px"} />
              </ButtonBase>
              <Divider />
              <ButtonBase
                onClick={toggleDrawer(false)}
                component={Link}
                to="/contact"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "2rem",
                }}
              >
                <FontAwesomeIcon icon={faPhone} />
              </ButtonBase>
              <Divider />
            </List>
          </Paper>
        </Drawer>
      </Box>
    </Paper>
  );
}
