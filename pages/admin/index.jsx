import Link from "next/link";

export default function Admin() {
  return (
    <>
      <header class="bg-dark py-5">
        <div class="container px-5">
          <div class="row gx-5 align-items-center justify-content-center">
            <div class="col-lg-8 col-xl-7 col-xxl-6">
              <div class="my-5 text-center">
                <h1 class="display-5 fw-bolder text-white mb-2">Admin</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section class="py-5" id="features">
        <div class="container px-5 my-5">
          <div class="row gx-5">
            <div class="col-lg-4 mb-5 mb-lg-0">
              <h2 class="fw-bolder mb-0">Admin funktioner</h2>
            </div>
            <div class="col-lg-8">
              <div class="row gx-5 row-cols-1 row-cols-md-2">
                <div class="col mb-5 h-100">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-collection"></i>
                  </div>
                  <h2 class="h5">Övningar</h2>
                  <p class="mb-0">
                    <Link href="/admin/drills">
                      <a class="btn btn-primary btn-lg px-4 me-sm-3">
                        Visa övningar
                      </a>
                    </Link>
                  </p>
                </div>
                <div class="col mb-5 h-100">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-collection"></i>
                  </div>
                  <h2 class="h5">Träningspass</h2>
                  <p class="mb-0">
                    <Link href="/admin/sessions">
                      <a class="btn btn-primary btn-lg px-4 me-sm-3">
                        Visa träningspass
                      </a>
                    </Link>
                  </p>
                </div>
                <div class="col mb-5 h-100">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-collection"></i>
                  </div>
                  <h2 class="h5">Användare</h2>
                  <p class="mb-0">
                    <Link href="/admin/users">
                      <a class="btn btn-primary btn-lg px-4 me-sm-3">
                        Visa användare
                      </a>
                    </Link>
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
