import React from "react";

export default function Contact() {
  return (
    <div className="container">
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
    </div>
  );
}
