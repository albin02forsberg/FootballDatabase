import React from "react";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import { Box, Container } from "@mui/system";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useQuery, prefetchQuery, QueryClient } from "react-query";
import { getDrill, getDrills } from "../../api/api";
import { async } from "@firebase/util";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import Head from "next/head";

function Drill(data) {
  // console.log(data);
  return (
    <Paper>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content={data.desc} />
      </Head>
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
            <img
              className="img img-thumbnail"
              src={data.imgLink}
              alt={data.id}
              width={"100%"}
              loading="lazy"
              style={{ borderRadius: "12px" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const docRef = doc(db, "drills", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  console.log(data);
  return {
    props: {
      name: data.name,
      type: data.type,
      what: data.what,
      why: data.why,
      how: data.how,
      org: data.org,
      desc: data.desc,
      imgLink: data.imgLink,
    },
  };
}


export default Drill;