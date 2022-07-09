import { Card, CardContent, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import calculateTime from "../scripts/calculateTime";

export default function Comment({ comment, key }) {
  return (
    <Box mt={2} style={{ borderRadius: "12px" }}>
      <Card>
        <CardContent key={key}>
          <Typography variant="body1">{comment.content}</Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="caption">
            <Typography variant="caption">{comment.uname}</Typography>{" "}
            {calculateTime(comment.created.seconds)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
