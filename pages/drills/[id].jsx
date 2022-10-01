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
  // const { data, status } = useQuery(["drill", id], async () => {
  //   return await (await getDrill(id)).data();
  // });

  // if (status === "loading") {
  //   return <Loading />;
  // }

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

export async function getStaticProps(context) {
  const id = context.params.id;
  const drillRef = doc(db, "drills", id);
  const drillSnap = await getDoc(drillRef);
  const drill = drillSnap.data();

  return {
    props: {
      name: drill.name,
      type: drill.type,
      what: drill.what,
      why: drill.why,
      how: drill.how,
      org: drill.org,
      desc: drill.desc,
      imgLink: drill.imgLink,
    },
  };
}

export async function getStaticPaths() {
  const querySnapshot = await getDrills();
  const paths = querySnapshot.docs.map((doc) => ({
    params: { id: doc.id },
  }));

  return { paths, fallback: true };
}

export default Drill;