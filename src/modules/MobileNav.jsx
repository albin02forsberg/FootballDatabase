import React, { useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";

export default function MobileNav({ user, isAuth }) {
  const [state, setState] = useState();

  return (
    <nav className="bottom-nav">
      <AnimateSharedLayout>
        <ul className="nav-list">
          <motion.li animate className="nav-item" onClick={() => setState(1)}>
            <motion.div animate className="nav-content">
              <Link to="/">
                <span className="nav-text">Hem</span>
              </Link>
            </motion.div>
            {state === 1 && (
              <motion.div className="highlight" layoutId="highlight" />
            )}
          </motion.li>
          <motion.li className="nav-item" onClick={() => setState(2)}>
            <motion.div animate className="nav-content">
              <Link to="/drills">
                <span className="nav-text">Övningar</span>
              </Link>
            </motion.div>
            {state === 2 && (
              <motion.div className="highlight" layoutId="highlight" />
            )}
          </motion.li>
          <motion.li className="nav-item" onClick={() => setState(3)}>
            <motion.div animate className="nav-content">
              <Link to="/sessions">
                <span className="nav-text">Träningspass</span>
              </Link>
            </motion.div>
            {state === 3 && (
              <motion.div className="highlight" layoutId="highlight" />
            )}
          </motion.li>
          <motion.li className="nav-item" onClick={() => setState(4)}>
            <motion.div animate className="nav-content">
              <Link to="/createNews">
                <span className="nav-text">Skriv inlägg</span>
              </Link>
            </motion.div>
            {state === 4 && (
              <motion.div className="highlight" layoutId="highlight" />
            )}
          </motion.li>
          <motion.li className="nav-item" onClick={() => setState(5)}>
            <motion.div animate className="nav-content">
              <Link to="/about">
                <span className="nav-text">Om</span>
              </Link>
            </motion.div>
            {state === 5 && (
              <motion.div className="highlight" layoutId="highlight" />
            )}
          </motion.li>
          {isAuth && (
            <motion.li className="nav-item" onClick={() => setState(6)}>
              <motion.div animate className="nav-content">
                <Link to={"/user/" + auth.currentUser.uid}>
                  <span className="nav-text">
                    {auth.currentUser.displayName}
                  </span>
                </Link>
              </motion.div>
              {state === 6 && (
                <motion.div className="highlight" layoutId="highlight" />
              )}
            </motion.li>
          )}
        </ul>
      </AnimateSharedLayout>
    </nav>
  );
}
