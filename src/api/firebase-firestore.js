import { initializeApp } from "firebase/app"
import { getFirestore, query, orderBy, limit, addDoc, collection, startAfter, getDocs } from "firebase/firestore"
import { getAuth, signInAnonymously } from "firebase/auth";

import firebaseConfig from "../../firebase-config";

const firebaseApp = initializeApp(firebaseConfig);

console.log({firebaseConfig})

const auth = getAuth();
signInAnonymously(auth)
    .then(() => {
        console.log("signed in as anonymous")
    })
    .catch((error) => {
        console.log(error)
    });

const db = getFirestore(firebaseApp);

class CloudDB {
    async create(colName, data) {
        try {
            const docRef = await addDoc(collection(db, colName), data);
            return docRef
        } catch (e) {
            throw e;
        }
    }

    get(colName) {
        const pageLimit = 5
        let cursor

        return {
            first: async () => {
                const args = [
                    collection(db, colName),
                    orderBy("createdAt", "desc"),
                    limit(pageLimit)
                ]

                const q = query(...args)
                const documentSnapshots = await getDocs(q)

                const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
                cursor = lastVisible

                return documentSnapshots.docs
            },

            next: async () => {
                if (cursor) {
                    const args = [
                        collection(db, colName),
                        orderBy("createdAt", "desc"),
                        limit(pageLimit),
                        startAfter(cursor)
                    ]

                    const q = query(...args)
                    const documentSnapshots = await getDocs(q)

                    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
                    cursor = lastVisible

                    return documentSnapshots.docs
                }
            }
        }
    }
}

export default new CloudDB()