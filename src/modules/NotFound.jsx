import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  // Return 404 page

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Vi beklagar, men denna sida gick tyvärr inte att hitta...</h2>
      <h3>Vi skickar tillbaka dig till förstasidan.</h3>
      <p>
        <Link to="/">Gå tillbaka till startsidan</Link>
      </p>
      <style jsx>{`
        .not-found {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}
