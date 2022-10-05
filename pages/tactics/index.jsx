import { useQuery } from "react-query";
import { getPosts } from "../../api/api";
import calculateTime from "../../api/calculateTime";
import Loading from "../../components/Loading";

export default function Tactics() {
  const { data, status } = useQuery("tactics", async () => {
    return await getPosts();
  });

  if (status === "loading") {
    <Loading />;
  }

  return (
    <>
      <section class="py-5">
        <div class="container px-5">
          <h1 class="fw-bolder fs-5 mb-4">Taktik</h1>
          <div class="card border-0 shadow rounded-3 overflow-hidden">
            <div class="card-body p-0">
              <div class="row gx-0">
                <div class="col-lg-6 col-xl-5 py-lg-5">
                  <div class="p-4 p-md-5">
                    <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                      Spelsystem
                    </div>
                    <div class="h2 fw-bolder">Spelsystemet 4-3-3</div>
                    <p className="text-truncate" style={{ maxWidth: "700px" }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Similique delectus ab doloremque, qui doloribus ea
                      officiis...
                    </p>
                    <a class="stretched-link text-decoration-none" href="#!">
                      Read more
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div class="col-lg-6 col-xl-7">
                  <div class="bg-featured-blog card-img-top ">
                    <img
                      src="https://themastermindsite.files.wordpress.com/2019/02/4-3-3.jpg?w=1040"
                      alt="..."
                      class="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-5 bg-light">
        <div class="container px-5">
          <div class="row gx-5">
            <div class="col-xl-8">
              <h2 class="fw-bolder fs-5 mb-4">Senaste inläggen</h2>
              <div class="mb-4">
                <div class="small text-muted">May 12, 2022</div>
                <a class="link-dark" href="#!">
                  <h3>
                    Start Bootstrap releases Bootstrap 5 updates for templates
                    and themes
                  </h3>
                </a>
              </div>
              <div class="mb-5">
                <div class="small text-muted">May 5, 2022</div>
                <a class="link-dark" href="#!">
                  <h3>Bootstrap 5 has officially landed</h3>
                </a>
              </div>
              <div class="mb-5">
                <div class="small text-muted">Apr 21, 2022</div>
                <a class="link-dark" href="#!">
                  <h3>
                    This is another news article headline, but this one is a
                    little bit longer
                  </h3>
                </a>
              </div>
            </div>
            <div class="text-end mb-5 mb-xl-0">
              <a class="text-decoration-none" href="#!">
                More news
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div class="col-xl-4">
            <div class="card border-0 h-100">
              <div class="card-body p-4">
                <div class="d-flex h-100 align-items-center justify-content-center">
                  <div class="text-center">
                    <div class="h6 fw-bolder">Contact</div>
                    <p class="text-muted mb-4">
                      For press inquiries, email us at
                      <br />
                      <a href="#!">press@domain.com</a>
                    </p>
                    <div class="h6 fw-bolder">Follow us</div>
                    <a class="fs-5 px-2 link-dark" href="#!">
                      <i class="bi-twitter"></i>
                    </a>
                    <a class="fs-5 px-2 link-dark" href="#!">
                      <i class="bi-facebook"></i>
                    </a>
                    <a class="fs-5 px-2 link-dark" href="#!">
                      <i class="bi-linkedin"></i>
                    </a>
                    <a class="fs-5 px-2 link-dark" href="#!">
                      <i class="bi-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
