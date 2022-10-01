import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>Om | Fotbollsträning.se</title>
        <meta name="description" content="Om Fotbollsträning.se" />
      </Head>
      <section class="py-5">
        <div class="container px-5 my-5">
          <div class="row gx-5 justify-content-center">
            <div class="col-lg-6">
              <div class="text-center mb-5">
                <h1 class="fw-bolder">Om Fotbollsträning.se</h1>
              </div>
            </div>
          </div>
          <div class="row gx-5">
            <div className="col-lg-6">
              <h2>Varför finns fotbollsträning.se?</h2>
              <p>
                Fotbollsträning är en sida som är till för att lätt hitta och
                dela med sig av fotbollsövningar.
              </p>
            </div>
            <div className="col-lg-6">
              <h2>Vem är jag?</h2>
              <p>
                Jag heter Albin och är fotbollstränare. Jag ville hitta ett sätt
                där man lätt och smidigt kunde ta del av övningar och
                träningspass. Jag hittade många sidor på nätet där detta var
                möjligt. Men det fanns ett problem.
              </p>
              <p>
                På dessa sidor fanns det inte något sätt att skapa sina egna
                övningar, utan du behövde vänta på att admin på sidan lade upp
                nya övningar. Detta var den största anledningen till att jag
                ville skapa denna sidan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
