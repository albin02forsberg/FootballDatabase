import Head from "next/head";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Fotbollsträning.se</title>
      </Head>
      <section class="py-5">
        <div class="container px-5 my-5">
          <div class="row gx-5 justify-content-center">
            <div class="col-lg-6">
              <div class="text-center mb-5">
                <h1 class="fw-bolder">Privacy Policy</h1>
                <p class="lead fw-normal text-muted mb-0">
                  Last updated: 2021-08-01
                </p>
              </div>
            </div>
          </div>
          <div class="row gx-5">
            <div className="col-lg-6">
              <h2 class="">What data do we collect?</h2>
              <p class="lead fw-normal text-muted mb-4">
                We collect the following data:
              </p>
              <ul>
                <li>Name</li>
                <li>Email</li>
                <li>Phone number</li>
                <li>Address</li>
                <li>IP address</li>
                <li>Browser information</li>
                <li>Device information</li>
                <li>Other information such as interests and preferences</li>
              </ul>
              <h2>Why do we collect this data?</h2>
              <p class="lead fw-normal text-muted mb-4">
                We collect this data to improve our website and to provide you
                with the best experience possible.
              </p>
              <h2 className="">How do we collect this data?</h2>
              <p class="lead fw-normal text-muted mb-4">
                We collect this data by using Google Analytics, Google Ads,
                Google Search Console, Google Tag Manager, Google Optimize,
                Google Firebase, Google Cloud, Google Maps, Google Fonts, Google
                Domains, Google Drive, Google Sheets, Google Docs, Google
                Slides, Google Forms, Google Calendar, Google Meet, Google
                Classroom and Google Translate.
              </p>
              <h2>How do we store your data?</h2>
              <p class="lead fw-normal text-muted mb-4">
                We store your data on Google Cloud.
              </p>
              <h2 className="">What are your data protection rights?</h2>
              <p class="lead fw-normal text-muted mb-4">
                Our aim is to take reasonable steps to allow you to correct,
                amend, delete or limit the use of your Personal Data.
              </p>
              <p class="lead fw-normal text-muted mb-4">
                If you wish to be informed what Personal Data we hold about you
                and if you want it to be removed from our systems, please
                contact us.
              </p>
              <p class="lead fw-normal text-muted mb-4">
                In certain circumstances, you have the following data protection
                rights:
              </p>
              <ul>
                <li>
                  The right to access, update or to delete the information we
                  have on you.
                </li>
                <li>The right of rectification.</li>
                <li>The right to object.</li>
                <li>The right of restriction.</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <h2 className="">What are cookies?</h2>
              <p class="lead fw-normal text-muted mb-4">
                Cookies are text files placed on your computer to collect
                standard Internet log information and visitor behavior
                information. When you visit our websites, we may collect
                information from you automatically through cookies or similar
                technology
              </p>
              <p class="lead fw-normal text-muted mb-4">
                For further information, visit allaboutcookies.org.
              </p>
              <h2 className="">How do we use cookies?</h2>
              <p class="lead fw-normal text-muted mb-4">
                We use cookies in a range of ways to improve your experience on
                our website, including:
              </p>
              <ul>
                <li>Keeping you signed in</li>
                <li>Understanding how you use our website</li>
              </ul>
              <h2 className="">What types of cookies do we use?</h2>
              <p class="lead fw-normal text-muted mb-4">
                There are a number of different types of cookies, however, our
                website uses:
              </p>
              <ul>
                <li>
                  Functionality - Fotbollsträning.se uses these cookies so that
                  we recognize you on our website and remember your previously
                  selected preferences. These could include what language you
                  prefer and location you are in. A mix of first-party and
                  third-party cookies are used.
                </li>
              </ul>
              <h2 className="">How to manage cookies</h2>
              <p class="lead fw-normal text-muted mb-4">
                You can set your browser not to accept cookies, and the above
                website tells you how to remove cookies from your browser.
                However, in a few cases, some of our website features may not
                function as a result.
              </p>
              <h2 className="">Privacy policies of other websites</h2>
              <p class="lead fw-normal text-muted mb-4">
                The Fotbollsträning.se website contains links to other websites.
                Our privacy policy applies only to our website, so if you click
                on a link to another website, you should read their privacy
                policy.
              </p>
              <h2 className="">Changes to our privacy policy</h2>
              <p class="lead fw-normal text-muted mb-4">
                Fotbollsträning.se keeps its privacy policy under regular review
                and places any updates on this web page. This privacy policy was
                last updated on 2021-08-01.
              </p>
              <h2 className="">How to contact us</h2>
              <p class="lead fw-normal text-muted mb-4">
                If you have any questions about Fotbollsträning.se's privacy
                policy, the data we hold on you, or you would like to exercise
                one of your data protection rights, please do not hesitate to
                contact us.
              </p>
              <p class="lead fw-normal text-muted mb-4">Email us at:</p>
              <p class="lead fw-normal text-muted mb-4">
                <a href="mailto:albin02forsberg@gmail.com">
                  {" "}
                  albin02forsberg@gmail
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
