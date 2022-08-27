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

export const getDrills = async(drill = null) => {
    if (!drill) {
        const drillQ = query(
            collection(db, "drills"),
            orderBy("created", "desc"),
            limit(8)
        );

        const drills = await getDocs(drillQ);
        return drills.docs;
    } else {
        const drillQ = query(
            collection(db, "drills"),
            orderBy("created", "desc"),
            limit(8),
            // start after the last drill in data
            startAfter(drill)
        );
        const dri = await getDocs(drillQ);
        return dri.docs;
    }
};