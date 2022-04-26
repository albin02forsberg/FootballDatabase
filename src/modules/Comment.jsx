import React from "react";
import { Link } from "react-router-dom";
import calculateTime from "../scripts/calculateTime";

export default function Comment({ comment, key }) {
  return (
    <div className="comment-card mb" key={key}>
      <p className="comment-text">{comment.data().content}</p>
      <div className="comment-footer">
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
