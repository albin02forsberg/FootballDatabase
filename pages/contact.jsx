import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Kontakt | Fotbollsträning.se</title>
      </Head>
      <section class="py-5">
        <div class="container px-5">
          <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
            <div class="text-center mb-5">
              <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i class="bi bi-envelope"></i>
              </div>
              <h1 class="fw-bolder">Kontakta oss</h1>
              <p class="lead fw-normal text-muted mb-0">
                Om du har några frågor eller funderingar så är du välkommen att
                höra av dig oss.
              </p>
            </div>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-8 col-xl-6">
                <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      id="name"
                      type="text"
                      placeholder="Skriv in ditt namn..."
                      data-sb-validations="required"
                    />
                    <label for="name">Namn</label>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="name:required"
                    >
                      Namn är obligatoriskt.
                    </div>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      data-sb-validations="required,email"
                    />
                    <label for="email">E-post</label>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="email:required"
                    >
                      E-post är obligatoriskt.
                    </div>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="email:email"
                    >
                      E-post är inte giltig.
                    </div>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      id="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      data-sb-validations="required"
                    />
                    <label for="phone">Telefon</label>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="phone:required"
                    >
                      Telefon är obligatoriskt.
                    </div>
                  </div>
                  <div class="form-floating mb-3">
                    <textarea
                      class="form-control"
                      id="message"
                      type="text"
                      placeholder="Skriv in ditt meddelande här..."
                      data-sb-validations="required"
                    ></textarea>
                    <label for="message">Meddelande</label>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="message:required"
                    >
                      Meddelande är obligatoriskt.
                    </div>
                  </div>
                  <div class="d-none" id="submitSuccessMessage">
                    <div class="text-center mb-3">
                      <div class="fw-bolder">Form submission successful!</div>
                      To activate this form, sign up at
                      <br />
                      <a href="https://startbootstrap.com/solution/contact-forms">
                        https://startbootstrap.com/solution/contact-forms
                      </a>
                    </div>
                  </div>
                  <div class="d-none" id="submitErrorMessage">
                    <div class="text-center text-danger mb-3">
                      Error sending message!
                    </div>
                  </div>
                  <div class="d-grid">
                    <button
                      class="btn btn-primary btn-lg disabled"
                      id="submitButton"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
