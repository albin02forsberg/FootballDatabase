import React, { Suspense } from "react";
import Loading from "../../components/Loading";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import dynamic from "next/dynamic";
const DrillPage = dynamic(() => import("../../components/DrillPage"), {
  suspense: true,
});

function Drill(data) {
  // console.log(data);
  return (
    <Suspense fallback={<Loading />}>
      <DrillPage data={data} />
    </Suspense>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const docRef = doc(db, "drills", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  console.log(data);
  return {
    props: {
      name: data.name,
      type: data.type,
      what: data.what,
      why: data.why,
      how: data.how,
      org: data.org,
      desc: data.desc,
      imgLink: data.imgLink,
    },
  };
}

export default Drill;
