import Head from "next/head";

export default function DrillPage(data) {
  return (
    <>
      <Head>
        <title>{data.data.name} | Fotbollsträning.se</title>
      </Head>
      <section class="py-5">
        <div class="container px-5 my-5">
          <div class="row gx-5 justify-content-center">
            <div class="col-lg-6">
              <div class="text-center mb-5">
                <h1 class="fw-bolder">{data.data.name}</h1>
                <p class="lead fw-normal text-muted mb-0">{data.data.type}</p>
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
                src={data.data.imgLink}
                alt="..."
              />
            </div>
            <div className="col-lg-6">
              <h2 class="">Vad?</h2>
              <p class="lead fw-normal text-muted mb-4">
                {data.data.type} - {data.data.what}
              </p>
              <h2>Varför?</h2>
              <p class="lead fw-normal text-muted mb-4">{data.data.why}</p>
              <h2 className="">Hur?</h2>
              <p class="lead fw-normal text-muted mb-4">{data.data.how}</p>
              <h2>Organisation</h2>
              <p class="lead fw-normal text-muted mb-4">{data.data.org}</p>
              <h2 className="">Instruktioner</h2>
              <p class="lead fw-normal text-muted mb-4">{data.data.desc}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
