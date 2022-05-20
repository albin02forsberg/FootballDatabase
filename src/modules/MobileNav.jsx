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

export default function MobileNav({ user, isAuth }) {
  const [state, setState] = useState(1);

  return (
    <nav className="bottom-nav">
      <AnimateSharedLayout>
        <ul className="nav-list">
          <motion.li animate className="nav-item" onClick={() => setState(1)}>
            <motion.div animate className="nav-content">
              <Link to="/">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </motion.div>
            {state === 1 && (
              <motion.div className="highlight" layoutId="highlight" />
            )}
          </motion.li>
          <motion.li className="nav-item" onClick={() => setState(2)}>
            <motion.div animate className="nav-content">
              <Link to="/drills">
                <FontAwesomeIcon icon={faPersonRunning} />
              </Link>
            </motion.div>
            {state === 2 && (
              <motion.div className="highlight" layoutId="highlight" />
            )}
          </motion.li>
          <motion.li className="nav-item" onClick={() => setState(3)}>
            <motion.div animate className="nav-content">
              <Link to="/sessions">
                <FontAwesomeIcon icon={faAlignJustify} />
              </Link>
            </motion.div>
            {state === 3 && (
              <motion.div className="highlight" layoutId="highlight" />
            )}
          </motion.li>
          {isAuth ? (
            <motion.li className="nav-item" onClick={() => setState(4)}>
              <motion.div animate className="nav-content">
                <Link to="/myteams">
                  <FontAwesomeIcon icon={faUsers} />
                </Link>
              </motion.div>
              {state === 4 && (
                <motion.div className="highlight" layoutId="highlight" />
              )}
            </motion.li>
          ) : null}
          {isAuth ? (
            <motion.li className="nav-item" onClick={() => setState(6)}>
              <motion.div animate className="nav-content">
                <Link to={"/user/" + auth.currentUser.uid}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </motion.div>
              {state === 6 && (
                <motion.div className="highlight" layoutId="highlight" />
              )}
            </motion.li>
          ) : (
            <motion.li className="nav-item" onClick={() => setState(7)}>
              <motion.div animate className="nav-content">
                <Link to={"/login"}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </motion.div>
              {state === 7 && (
                <motion.div className="highlight" layoutId="highlight" />
              )}
            </motion.li>
          )}
          {isAuth && user && user.role === "admin" && (
            <motion.li className="nav-item" onClick={() => setState(5)}>
              <motion.div animate className="nav-content">
                <Link to="/admin">
                  <FontAwesomeIcon icon={faHammer} />
                </Link>
              </motion.div>
              {state === 5 && (
                <motion.div className="highlight" layoutId="highlight" />
              )}
            </motion.li>
          )}
        </ul>
      </AnimateSharedLayout>
    </nav>
  );
}
