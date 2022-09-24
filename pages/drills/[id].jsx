import React from "react";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import { Box, Container } from "@mui/system";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useQuery, prefetchQuery, QueryClient } from "react-query";
import { getDrill } from "../../api/api";
import { async } from "@firebase/util";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

function Drill({ data }) {
  return (
    <Paper>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <div>
              <Typography variant="h3">{data.name}</Typography>
              <Divider />
              <Typography variant="h5">Vad?</Typography>
              <Typography variant="body1">
                {data.type} - {data.what}{" "}
              </Typography>
              <Typography variant="h5">Varför?</Typography>
              <Typography variant="body1">{data.why}</Typography>
              <Typography variant="h5">Hur?</Typography>
              <Typography variant="body1">{data.how}</Typography>
              <Typography variant="h5">Organisation</Typography>
              <Typography variant="body1">{data.org}</Typography>
              <Typography variant="h5">Anvisningar</Typography>
              <Typography variant="body1">{data.desc}</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {data && (
              <img
                className="img img-thumbnail"
                src={data.imgLink}
                alt={data.id}
                width={"100%"}
                loading="lazy"
                style={{ borderRadius: "12px" }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(id);

  const data = await await (
    await getDoc(doc(collection(db, "drills"), id))
  ).data();

  return {
    props: {
      data: {
        name: data.name,
        creator: data.uname,
        desc: data.desc,
        how: data.how,
        imgLink: data.imgLink,
        org: data.org,
        type: data.type,
        what: data.what,
        why: data.why,
      },
    },
  };
}

export default Drill;