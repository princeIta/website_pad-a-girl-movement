import firestoreRepository from "../../../api/firebase-firestore"
import FeedbackDrawer from "./feedback-drawer"

export default function init() {
    return new FeedbackDrawer.display(firestoreRepository)
}
