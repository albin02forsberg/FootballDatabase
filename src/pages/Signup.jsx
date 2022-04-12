import React, { useEffect } from "react";

export default function Signup() {
  useEffect(() => {
    document.title = "Registrera";
  }, []);
  return (
    <div className="container">
      <h1>Signup</h1>
    </div>
  );
}
