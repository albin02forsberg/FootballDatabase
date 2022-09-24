import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import calculateTime from "../api/calculateTime";

export default function DrillCard({ drill, id, showCreator }) {
  return (
    // Create mui card
    <Card style={{ borderRadius: "12px", padding: "0" }}>
      <CardActionArea>
        <Link href={"/drills/" + id}>
          <CardMedia
            image={drill.imgLink}
            height="auto"
            component="img"
            style={{ borderRadius: "12px" }}
          />
        </Link>
      </CardActionArea>
      {showCreator && (
        <CardActions
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption">
            {calculateTime(drill.created.seconds)}
          </Typography>
          <Typography
            variant="caption"
            component={Link}
            href={"/user/" + drill.uid}
          >
            {drill.uname}
          </Typography>
        </CardActions>
      )}
    </Card>
  );
}
