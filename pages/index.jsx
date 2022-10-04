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
                  Fotbollsträning.se
                </h1>
                <p class="lead fw-normal text-white-50 mb-4">
                  Här hittar du allt du behöver för att utveckla framtidens
                  fotbollsspelare.
                </p>
                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                  <a
                    class="btn btn-primary btn-lg px-4 me-sm-3"
                    href="#features"
                  >
                    Läs mer
                  </a>
                  <Link
                    href="/drills"
                    className="btn btn-outline-light btn-lg px-4"
                  >
                    <a class="btn btn-outline-light btn-lg px-4" href="#!">
                      Våra övningar
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <img
                class="img-fluid rounded-3 my-5"
                src="https://cdn.britannica.com/51/190751-050-147B93F7/soccer-ball-goal.jpg?q=60"
                alt="..."
              />
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
                <Link href="/drills">
                  <div class="col mb-5 h-100">
                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                      <i class="bi bi-collection"></i>
                    </div>
                    <h2 class="h5">Övningar</h2>
                    <p class="mb-0">
                      Här kan du hitta massor av fotbollsträningar för alla
                      åldrar och nivåer.
                    </p>
                  </div>
                </Link>
                <div class="col mb-5 h-100">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-bookshelf"></i>
                  </div>
                  <h2 class="h5">Träningspass (kommer snart)</h2>
                  <p class="mb-0">
                    Du kan även ta del av redan färdiga träningspass, eller
                    skapa egna.
                  </p>
                </div>
                <div class="col mb-5 mb-md-0 h-100">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-people-fill"></i>
                  </div>
                  <h2 class="h5">Mina lag (kommer snart)</h2>
                  <p class="mb-0">
                    Ett sätt att hantera och hålla statistik på ditt lag.
                  </p>
                </div>
                <div class="col h-100">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-book"></i>
                  </div>
                  <h2 class="h5">Taktik (kommer snart)</h2>
                  <p class="mb-0">
                    Ta del av diskussioner och utveckla din fotbollstaktik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="py-5 bg-light">
        <div class="container px-5 my-5">
          <div class="row gx-5 justify-content-center">
            <div class="col-lg-10 col-xl-7">
              <div class="text-center">
                <div class="fs-4 mb-4 fst-italic">
                  “Playing football with your feet is one thing, but playing
                  football with your heart is another.”
                </div>
                <div class="d-flex align-items-center justify-content-center">
                  <img
                    class="rounded-circle me-3"
                    src="https://img.a.transfermarkt.technology/portrait/big/5958-1448466835.jpg?lm=1"
                    alt="..."
                    width="40"
                    height="40"
                  />
                  <div class="fw-bold">Francesco Totti</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="py-5">
        <div class="container px-5 my-5">
          <div class="row gx-5 justify-content-center">
            <div class="col-lg-8 col-xl-6">
              <div class="text-center">
                <h2 class="fw-bolder">Taktik</h2>
                <p class="lead fw-normal text-muted mb-5">
                  Ta del av diskussioner och utveckla din fotbollstaktik.
                </p>
              </div>
            </div>
          </div>
          <div class="row gx-5">
            <div class="col-lg-4 mb-5">
              <div class="card h-100 shadow border-0">
                <img
                  class="card-img-top"
                  src="http://newsimg.bbc.co.uk/media/images/41705000/gif/_41705404_4_4_2_416.gif"
                  alt="..."
                />
                <div class="card-body p-4">
                  <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                    News
                  </div>
                  <a
                    class="text-decoration-none link-dark stretched-link"
                    href="#!"
                  >
                    <h5 class="card-title mb-3">Spelsystemet 4-4-2</h5>
                  </a>
                  <p class="card-text mb-0">
                    Spelsystemet 4-4-2 är ett av de mest använda spelsystemen i
                    fotboll. Det är ett spelsystem som används av många lag i
                    fotboll, både i Europa och i världen.
                  </p>
                </div>
                <div class="card-footer p-4 pt-0 bg-transparent border-top-0">
                  <div class="d-flex align-items-end justify-content-between">
                    <div class="d-flex align-items-center">
                      <img
                        class="rounded-circle me-3"
                        src="https://dummyimage.com/40x40/ced4da/6c757d"
                        alt="..."
                      />
                      <div class="small">
                        <div class="fw-bold">Albin Forsberg</div>
                        <div class="text-muted">
                          March 12, 2022 &middot; 6 min read
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 mb-5">
              <div class="card h-100 shadow border-0">
                <img
                  class="card-img-top"
                  src="https://themastermindsite.files.wordpress.com/2019/10/flat-3-5-2-1.png"
                  alt="..."
                />
                <div class="card-body p-4">
                  <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                    Media
                  </div>
                  <a
                    class="text-decoration-none link-dark stretched-link"
                    href="#!"
                  >
                    <h5 class="card-title mb-3">Spelsystemet 3-5-2</h5>
                  </a>
                  <p class="card-text mb-0">
                    Spelsystemet 3-5-2 är ett av de mest använda spelsystemen i
                    fotboll. Det är ett spelsystem som används av många lag i
                    fotboll, både i Europa och i världen.
                  </p>
                </div>
                <div class="card-footer p-4 pt-0 bg-transparent border-top-0">
                  <div class="d-flex align-items-end justify-content-between">
                    <div class="d-flex align-items-center">
                      <img
                        class="rounded-circle me-3"
                        src="https://dummyimage.com/40x40/ced4da/6c757d"
                        alt="..."
                      />
                      <div class="small">
                        <div class="fw-bold">Albin Forsberg</div>
                        <div class="text-muted">
                          March 23, 2022 &middot; 4 min read
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 mb-5">
              <div class="card h-100 shadow border-0">
                <img
                  class="card-img-top"
                  src="https://themastermindsite.files.wordpress.com/2019/02/4-3-3.jpg?w=1040"
                  alt="..."
                />
                <div class="card-body p-4">
                  <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                    News
                  </div>
                  <a
                    class="text-decoration-none link-dark stretched-link"
                    href="#!"
                  >
                    <h5 class="card-title mb-3">Spelsystemet 4-3-3</h5>
                  </a>
                  <p class="card-text mb-0">
                    Spelsystemet 4-3-3 är ett av de mest använda spelsystemen i
                    fotboll. Det är ett spelsystem som används av många lag i
                    fotboll, både i Europa och i världen.
                  </p>
                </div>
                <div class="card-footer p-4 pt-0 bg-transparent border-top-0">
                  <div class="d-flex align-items-end justify-content-between">
                    <div class="d-flex align-items-center">
                      <img
                        class="rounded-circle me-3"
                        src="https://dummyimage.com/40x40/ced4da/6c757d"
                        alt="..."
                      />
                      <div class="small">
                        <div class="fw-bold">Albin Forsberg</div>
                        <div class="text-muted">
                          April 2, 2022 &middot; 10 min read
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12 mb-5 justify-content-center">
              <Link href="/blog">
                <a class="btn btn-primary btn-lg px-4 disabled center">
                  Gå till taktik (kommer snart)
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
