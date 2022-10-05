import React, { useEffect } from "react";
import Link from "next/link";
import calculateTime from "../api/calculateTime";
import { useQuery } from "react-query";
import { getUserImage } from "../api/api";
import Loading from "./Loading";
import { useRouter } from "next/router";

export default function DrillCard({ drill, id, showCreator }) {
  const { data, status } = useQuery(["userImage", drill.creator, id], () =>
    getUserImage(drill.uid)
  );

  const router = useRouter();

  const goToUser = () => {
    router.push(`/user/${drill.uid}`);
  };

  return (
    <div class="card shadow border-0">
      <img class="card-img-top" src={drill.imgLink} alt="..." />
      <Link href={`/drills/${id}`}>
        <div class="card-body p-4">
          <div class="badge bg-primary bg-gradient rounded-pill mb-2">
            {drill.type}
          </div>
          <a class="text-decoration-none link-dark stretched-link">
            <h5 class="card-title mb-3">{drill.name}</h5>
          </a>
          {/* <p class="card-text mb-0">{drill.desc}</p> */}
        </div>
      </Link>
      <div class="card-footer p-4 pt-0 bg-transparent border-top-0">
        {showCreator && (
          <div class="d-flex align-items-end justify-content-between">
            <div class="d-flex align-items-center">
              <img
                class="rounded-circle me-3"
                src={data}
                alt="..."
                width={50}
                height={50}
              />
              <Link href={`/user/${drill.uid}`}>
                <div class="small">
                  <div class="fw-bold">{drill.uname}</div>
                  <div class="text-muted">
                    {calculateTime(drill.created.seconds)}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
