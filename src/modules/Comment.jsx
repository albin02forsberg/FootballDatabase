import { CardContent } from "@mui/material";
import React from "react";
import calculateTime from "../scripts/calculateTime";

export default function Comment({ comment, key }) {
  return (
    <CardContent key={key}>
      <p>{comment.data().content}</p>
      <p>
        <small className="text-muted">
          {comment.data().uname} -{" "}
          {calculateTime(comment.data().created.seconds)}
        </small>
      </p>
    </CardContent>
  );
}
