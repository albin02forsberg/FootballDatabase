import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useQuery } from "react-query";
import { db } from "../firebase-config";
import Loading from "./Loading";

export default function GetUser({ uid }) {
  const { data, status } = useQuery(
    ["User", uid || null],
    () => {
      return getDoc(doc(db, "users/" + (uid || null)));
    },
    {
      refetchInterval: 10000,
    }
  );

  const { data: drillsData } = useQuery(
    ["user drills", uid || null],
    async () => {
      const drillQ = query(
        collection(db, "drills"),
        where("uid", "==", uid || null),
        orderBy("created", "desc")
      );
      const drills = await getDocs(drillQ);
      return drills.docs;
    },
    {
      enabled: data !== null,
    }
  );

  const { data: sessionsData } = useQuery(
    ["user sessions", uid || null],
    async () => {
      const sessionQ = query(
        collection(db, "sessions"),
        where("uid", "==", uid || null),
        orderBy("created", "desc")
      );
      const sessions = await getDocs(sessionQ);
      return sessions.docs;
    },
    {
      enabled: data !== null,
    }
  );

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div style={{ display: "none" }}>
      {JSON.stringify(data)}
      {JSON.stringify(drillsData)}
      {JSON.stringify(sessionsData)}
    </div>
  );
}
