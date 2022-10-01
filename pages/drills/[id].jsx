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
import Image from "next/image";

function Drill(data) {
  // console.log(data);
  return (
    <>
      <Head>
        <title>{data.name} | Fotbollsträning.se</title>
      </Head>
      <section class="py-5">
        <div class="container px-5 my-5">
          <div class="row gx-5 justify-content-center">
            <div class="col-lg-6">
              <div class="text-center mb-5">
                <h1 class="fw-bolder">{data.name}</h1>
                <p class="lead fw-normal text-muted mb-0">{data.type}</p>
              </div>
            </div>
          </div>
          <div class="row gx-5">
            <div
              class="col-lg-6 order-lg-last"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                class="img-fluid rounded-3 mb-5"
                src={data.imgLink}
                alt="..."
              />
            </div>
            <div className="col-lg-6">
              <h2 class="">Vad?</h2>
              <p class="lead fw-normal text-muted mb-4">
                {data.type} - {data.what}
              </p>
              <h2>Varför?</h2>
              <p class="lead fw-normal text-muted mb-4">{data.why}</p>
              <h2 className="">Hur?</h2>
              <p class="lead fw-normal text-muted mb-4">{data.how}</p>
              <h2>Organisation</h2>
              <p class="lead fw-normal text-muted mb-4">{data.org}</p>
              <h2 className="">Instruktioner</h2>
              <p class="lead fw-normal text-muted mb-4">{data.desc}</p>
            </div>
          </div>
        </div>
      </section>
    </>
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