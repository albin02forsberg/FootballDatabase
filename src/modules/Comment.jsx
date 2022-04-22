import React from "react";
import calculateTime from "../scripts/calculateTime";

export default function Comment({ comment }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text">{comment.data().content}</p>
      </div>
      <div className="card-footer">
        <small className="text-muted">{comment.data().uname}</small>
        {" - "}
        <small className="text-muted">
          {calculateTime(comment.data().created.seconds)}
        </small>
      </div>
    </div>
  );
}
