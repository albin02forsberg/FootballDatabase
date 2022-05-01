import React from "react";

export default function Loading() {
  // Return loading screen
  return (
    <div className="load">
      <div className="spinner-border mx-auto" role="status">
        {/* <span className="visually-hidden mx-auto">Loading...</span> */}
      </div>

      <style jsx>{`
        .load {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}
