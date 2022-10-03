import React, { Suspense } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { db } from "../../firebase-config";
import Loading from "../../components/Loading";
import { useQuery } from "react-query";

import {
  query,
  collection,
  doc,
  where,
  getDocs,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { Masonry } from "@mui/lab";
import { getUserDrills } from "../../api/api";
import DrillCard from "../../components/DrillCard";
import UserHeader from "../../components/UserHeader";
import Head from "next/head";

export default function User(data) {
  // get another users data
  const router = useRouter();
  const { uid } = router.query;

  const { data: sessionsData } = useQuery(["user sessions", uid], async () => {
    const sessionQ = query(
      collection(db, "sessions"),
      where("uid", "==", uid),
      orderBy("created", "desc")
    );
    const sessions = await getDocs(sessionQ);
    return sessions.docs;
  });

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  console.log(data);

  return (
    <Suspense fallback={<Loading />}>
      <Head>
        <title>{data.user.name} | Fotbollsträning.se</title>
        <meta
          name="description"
          content={`Här kan du se ${data.user.name}s profil`}
        />
      </Head>

      <header class="bg-dark py-5">
        <div class="container px-5">
          <div class="row gx-5 align-items-center justify-content-center">
            <div class="col-lg-8 col-xl-7 col-xxl-6 justify-content-center">
              <div class="my-5 text-center justify-content-center">
                <div class="d-grid gap-3 d-sm-flex justify-content-center justify-content-xl-center mb-5">
                  <img src={data.user.photo} class="rounded-circle img-fluid" />
                </div>
                <h1 class="display-5 fw-bolder text-white mb-2 justify-content-center">
                  {data.user.name}
                </h1>
                <p class="lead fw-normal text-white-50 mb-2">
                  Medlem sedan {formatDate(data.user.joined)}
                </p>
                <p class="lead fw-normal text-white-50 ">
                  {data.drills.length} övningar
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section class="py-5">
        <div class="container px-5 my-5">
          <div class="row gx-5 justify-content-center">
            <div class="col-lg-6">
              <div class="text-center mb-5">
                <h1 class="fw-bolder">Övningar</h1>
                <p class="lead fw-normal text-muted mb-0"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="container px-5 my-5">
          <Masonry
            columns={{ xs: 1, sm: 2, md: 4 }}
            spacing={2}
            style={{ display: "flex", width: "100%", padding: 0, margin: 0 }}
          >
            {data.drills.map((drill) => (
              <DrillCard drill={drill} id={drill.id} />
            ))}
          </Masonry>
        </div>
      </section>
    </Suspense>
  );
}

export async function getServerSideProps(context) {
  const { uid } = context.query;
  console.log(uid);

  const userCollectionRef = collection(db, "users");
  const userRef = doc(userCollectionRef, uid);
  const u = await getDoc(userRef);

  const drills = await getUserDrills(uid);

  return {
    props: {
      user: u.data(),
      drills: drills.map((d) => {
        return {
          id: d.id,
          name: d.data().name,
          type: d.data().type,
          imgLink: d.data().imgLink,
          desc: d.data().desc,
          created: {
            seconds: d.data().created.seconds,
          },
          uid: d.data().uid,
        };
      }),
    },
  };
}
