import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";
import { db } from "../firebase-config";

export const getDrill = async(id) => {
    return await getDoc(doc(collection(db, "drills"), id));
};

export const getDrills = async(pageParam = null) => {
    if (pageParam) {
        const q = query(
            collection(db, "drills"),
            orderBy("created", "desc"),
            startAfter(pageParam),
            limit(10)
        );
        return await getDocs(q);
    } else {
        const q = query(
            collection(db, "drills"),
            orderBy("created", "desc"),
            limit(10)
        );
        return await getDocs(q);
    }
};