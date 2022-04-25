import React from "react";
import { Link } from "react-router-dom";
import calculateTime from "../scripts/calculateTime";

export default function Comment({ comment }) {
  return (
    <div className="card mb">
      <div className="card-body">
        <p className="card-text">{comment.data().content}</p>
      </div>
      <div className="card-footer">
        <small className="text-muted">
          <Link to={"/user/" + comment.data().uid}>{comment.data().uname}</Link>
        </small>

        {" - "}
        <small className="text-muted">
          {calculateTime(comment.data().created.seconds)}
        </small>
      </div>
    </div>
  );
}
