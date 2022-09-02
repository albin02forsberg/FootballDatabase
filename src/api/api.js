import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where,
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

export const getRecommendedDrills = async() => {
    // Get 3 random drills
    const q = query(
        collection(db, "drills"),
        orderBy("created", "desc"),
        limit(4)
    );
    return await getDocs(q);
};

export const getNews = async(count = 3) => {
    const q = query(
        collection(db, "news"),
        limit(count),
        orderBy("created", "desc")
    );
    return await getDocs(q);
};


export const getUserDrills = async(uid) => {
    const drillQ = query(
        collection(db, "drills"),
        where("uid", "==", uid),
        orderBy("created", "desc")
    );
    return await getDocs(drillQ);
};