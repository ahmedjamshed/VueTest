import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  onSnapshot,
  collection,
  where,
} from "firebase/firestore";
import { onUnmounted, onMounted, ref } from "vue";

const firebaseConfig = {
  apiKey: "AIzaSyAndetDZmIkxsmIFacnm5cK_vHFU9UUfws",
  authDomain: "vuetest-5d44c.firebaseapp.com",
  projectId: "vuetest-5d44c",
  storageBucket: "vuetest-5d44c.appspot.com",
  messagingSenderId: "499958297661",
  appId: "1:499958297661:web:07598b517b7f85c8baa654",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

export default function getItems(userID) {
  const completedTasks = ref([]);
  const incompleteTasks = ref([]);
  const checkIns = ref([]);

  let unsubTodos;
  let unsubCheckins;
  onMounted(() => {
    const todosRef = query(
      collection(firestore, "todos"),
      where("user", "==", userID)
    );
    const checkIns = query(
      collection(firestore, "checkins"),
      where("user", "==", userID)
    );
    unsubTodos = onSnapshot(todosRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().completed) {
          completedTasks.value = [...completedTasks.value, doc.data()];
        } else {
          incompleteTasks.value = [...incompleteTasks.value, doc.data()];
        }
      });
    });
    unsubCheckins = onSnapshot(checkIns, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        checkIns.value = [...checkIns.value, doc.data()];
      });
    });
  });
  onUnmounted(() => {
    unsubTodos();
    unsubCheckins();
  });
  return { completedTasks, incompleteTasks, checkIns };
}
