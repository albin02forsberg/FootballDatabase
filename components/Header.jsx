import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Header({ user, signOut }) {
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
              <Link href="/drills">
                <a class="nav-link">Drills</a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href="/about">
                <a class="nav-link disabled">About</a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href="/contact">
                <a class="nav-link disabled">Contact</a>
              </Link>
            </li>
            {user ? (
              <li class="nav-item">
                <Link href={`/user/${user.uid}`}>
                  <a class="nav-link">{user.name}</a>
                </Link>
              </li>
            ) : (
              <li class="nav-item">
                <Link href="/login">
                  <a class="nav-link">Login</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
