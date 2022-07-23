import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function Contact() {
  return (
    <Container>
      <Paper
        style={{
          padding: "1rem",
          margin: "1rem",
          borderRadius: "1rem",
          backgroundColor: "#fafafa",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="row">
          <h1>Kontakta oss</h1>

          <p>
            Om du har någon form av fråga, förebättring eller klogomål. Kontakta
            sidans huvudansvarig och utvecklare Albin Forsberg{" "}
          </p>

          <div className="contact-info">
            <div className="contact-info-item">
              <h3>Albin Forsberg</h3>
              <p>
                <a href="mailto:albin02forsberg@gmail.com">
                  albin02forsberg@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </Paper>
    </Container>
  );
}
