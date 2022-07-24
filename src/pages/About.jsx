import { Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "Om";
  }, []);
  return (
    <Container>
      <Paper
        style={{
          padding: "1rem",
          margin: "0.5rem",
          borderRadius: "1rem",
          backgroundColor: "#fafafa",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Varför?</h5>
                  <p className="card-text">
                    fotbollsträning.se skapades för att göra det lättare för
                    tränare och spelare att hitta och dela fotbollsträning med
                    varandra.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Öppen källkod</h5>
                  <p className="card-text">
                    fotbollsträning.se är öppen källkod. Du kan se koden, och
                    tillföra till projektet på github.{" "}
                  </p>
                  <a
                    className="btn btn-primary"
                    href="https://github.com/albinforsbergju/FootballDatabase"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">
                    Teknologier som håller sidan igång
                  </h5>
                  <p className="card-text">
                    fotbollsträning.se använder sig först och främst av open
                    source teknologier. Bland annat:
                  </p>
                  <ul className="list-group list-group-flush ">
                    <li>
                      <a
                        className="list-group-item list-group-item-action"
                        href="https://reactjs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        React
                      </a>
                    </li>
                    <li>
                      <a
                        className="list-group-item list-group-item-action"
                        href="https://firebase.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Firebase
                      </a>
                    </li>
                  </ul>
                  <p className="card-text">
                    Boostrap används för att göra sidan snyggare och responsiv.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Paper>
    </Container>
  );
}

export default About;
