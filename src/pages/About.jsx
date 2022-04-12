import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "Om";
  }, []);
  return (
    <div className="container">
      <h1>Om</h1>
    </div>
  );
}

export default About;
