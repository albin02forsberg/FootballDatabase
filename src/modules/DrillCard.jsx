import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Paper,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import calculateTime from "../scripts/calculateTime";

export default function DrillCard({ drill, showCreator }) {
  return (
    // Create mui card
    <Paper elevation={2} style={{ borderRadius: "12px" }}>
      <Card style={{ borderRadius: "12px" }}>
        <CardActionArea component={Link} to={"/drill/" + drill.id}>
          <CardHeader
            title={
              <Link
                to={`/drill/${drill.id}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                {drill.data().name}
              </Link>
            }
            subheader={calculateTime(drill.data().created.seconds)}
          />
          <CardMedia
            image={drill.data().imgLink}
            title={drill.data().title}
            height="auto"
            component="img"
            style={{ borderRadius: "12px" }}
          />
        </CardActionArea>
      </Card>
    </Paper>

    // <div className="col mx-auto">
    //   <div className="card mb">
    //     <Link to={`/drill/${drill.id}`}>
    //       <img
    //         src={drill.data().imgLink}
    //         alt={drill.data().name}
    //         className="card-img-top mx-auto"
    //       />
    //     </Link>
    //     <div className="card-body">
    //       <Link to={`/drill/${drill.id}`}>
    //         <h5 className="card-title">{drill.data().name}</h5>
    //       </Link>
    //       <p className="card-text cut-text" id="drillDescription">
    //         {drill.data().description}
    //       </p>
    //       <p className="card-text">
    //         <small className="text-muted">
    //           {drill.data().difficulty} - {drill.data().type}
    //         </small>
    //       </p>
    //       <p className="card-text">
    //         <small className="text-muted">{drill.data().why}</small>
    //       </p>
    //     </div>
    //     <hr />
    //     {(showCreator && (
    //       <div className="card-footer">
    //         <p className="card-text">
    //           <Link to={"/user/" + drill.data().uid}>{drill.data().uname}</Link>{" "}
    //           {calculateTime(drill.data().created.seconds)}
    //         </p>
    //       </div>
    //     )) || (
    //       <div className="card-footer">
    //         <p className="card-text">
    //           <small className="text-muted">
    //             {calculateTime(drill.data().created.seconds)}
    //           </small>
    //         </p>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}
