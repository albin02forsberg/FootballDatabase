import React, { Suspense } from "react";
import calculateTime from "../api/calculateTime";
import Loading from "../components/Loading";
import DrillCard from "../components/DrillCard";
import { useQuery } from "react-query";
import { getNews, getRandomDrill, getRecommendedDrills } from "../api/api";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const { data: newsData, status: newsStatus } = useQuery("news", () => {
    return getNews();
  });

  return (
    <>
      <Head>
        <title>Hem | Fotbollsträning</title>
      </Head>
      <header class="bg-dark py-5">
        <div class="container px-5">
          <div class="row gx-5 align-items-center justify-content-center">
            <div class="col-lg-8 col-xl-7 col-xxl-6">
              <div class="my-5 text-center text-xl-start">
                <h1 class="display-5 fw-bolder text-white mb-2">
                  Välkommen till Fotbollsträning.se
                </h1>
                <p class="lead fw-normal text-white-50 mb-4">
                  {/* {randomDrill.data().desc} */}
                </p>
                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                  {/* <Link href={"/drills/" + randomDrill.id}>
                  <a class="btn btn-primary btn-lg px-4 me-sm-3">Visa övning</a>
                </Link> */}
                  <Link href="/drills">
                    <a class="btn btn-outline-light btn-lg px-4">
                      Visa alla övningar
                    </a>
                  </Link>
                  <Link href="/sessions">
                    <a class="btn btn-outline-light btn-lg px-4 disabled">
                      Visa alla träningspass
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section class="py-5" id="features">
        <div class="container px-5 my-5">
          <div class="row gx-5">
            <div class="col-lg-4 mb-5 mb-lg-0">
              <h2 class="fw-bolder mb-0">Våra funktioner</h2>
            </div>
            <div class="col-lg-8">
              <div class="row gx-5 row-cols-1 row-cols-md-2">
                <div class="col mb-5 h-100">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-collection"></i>
                  </div>
                  <h2 class="h5">Övningar</h2>
                  <p class="mb-0">
                    Vi har ett stort utbud av övningar som du kan använda i
                    träningen. Du kan även skapa egna övningar och dela dem med
                    andra.
                  </p>
                </div>
                <div class="col mb-5 h-100">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-building"></i>
                  </div>
                  <h2 class="h5">Träningspass</h2>
                  <p class="mb-0">
                    Du kan skapa träningspass med övningar som du har skapat,
                    eller som andra har skapat. Du kan även dela dina
                    träningspass med andra, eller ta del av andras pass.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
