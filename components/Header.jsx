import Link from "next/link";
import Image from "next/image";

export default function Header({ user, signOut }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const toggleDrawer = (open) => (event) => {
    setOpenDrawer(!openDrawer);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container px-5">
        <Link href="/">
          <a class="navbar-brand" href="#">
            <Image
              src="/logo-white.png"
              alt="logo"
              width={50}
              height={50}
              layout="fixed"
            />
          </a>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link href="/">
                <a class="nav-link active" aria-current="page">
                  Home
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href="/about">
                <a class="nav-link">About</a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href="/contact">
                <a class="nav-link disabled">Contact</a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href="/drills">
                <a class="nav-link">Drills</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
