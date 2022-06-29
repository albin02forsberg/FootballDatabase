import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import Loading from "../modules/Loading";
import { Box, Container } from "@mui/system";
import { Divider, Grid, Typography } from "@mui/material";

export default function Drill() {
  const { id } = useParams();
  const [drill, setDrill] = React.useState(null);

  const canvasRef = React.useRef(null);
  const ctxRef = React.useRef(null);

  // Get drill from firestore and set state to drill

  // Get drill from firestore and set state to drill
  useEffect(() => {
    const drillCollectionRef = collection(db, "drills");
    const drillRef = doc(drillCollectionRef, id);
    getDoc(drillRef)
      .then((drill) => {
        document.title = drill.data().name;
        setDrill(drill);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let imageForeground = new Image();
        imageForeground.src = drill.data().imgLink;
        ctx.drawImage(imageForeground, 0, 0, canvas.width, canvas.height);
        ctxRef.current = ctx;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!drill) {
    return <Loading />;
  }

  return (
    <Container>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            {drill && (
              <div>
                <Typography variant="h3">{drill.data().name}</Typography>
                <Divider />
                <Typography variant="h5">Vad?</Typography>
                <Typography variant="body1">
                  {drill.data().type} - {drill.data().what}{" "}
                </Typography>
                <Typography variant="h5">Varför?</Typography>
                <Typography variant="body1">{drill.data().why}</Typography>
                <Typography variant="h5">Hur?</Typography>
                <Typography variant="body1">{drill.data().how}</Typography>
                <Typography variant="h5">Organisation</Typography>
                <Typography variant="body1">{drill.data().org}</Typography>
                <Typography variant="h5">Anvisningar</Typography>
                <Typography variant="body1">{drill.data().desc}</Typography>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {drill && (
              <img
                className="img img-thumbnail"
                src={drill.data().imgLink}
                alt={drill.id}
                width={"100%"}
                loading="lazy"
                style={{ borderRadius: "12px" }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
