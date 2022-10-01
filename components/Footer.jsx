import Link from "next/link";

export default function Footer() {
  return (
    <footer class="bg-dark py-4 mt-auto">
      <div class="container px-5">
        <div class="row align-items-center justify-content-between flex-column flex-sm-row">
          <div class="col-auto">
            <div class="small m-0 text-white">
              Copyright &copy; Fotbollsträning.se 2022
            </div>
          </div>
          <div class="col-auto">
            <Link href="/privacy">
              <a class="link-light small disabled">Privacy Policy</a>
            </Link>
            <span class="text-white mx-1">&middot;</span>
            <Link href="/terms">
              <a class="link-light small disabled">Terms &amp; Conditions</a>
            </Link>

            <span class="text-white mx-1">&middot;</span>
            <Link href="/contact">
              <a class="link-light small disabled">Contact</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
