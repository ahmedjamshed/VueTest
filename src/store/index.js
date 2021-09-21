import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  onSnapshot,
  collection,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { onUnmounted, onMounted, ref, watch } from "vue";

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

const completedTasks = ref([]);
const incompleteTasks = ref([]);
const checkIns = ref([]);

const allTasks = ref({});
const allCheckIns = ref({});

const resetState = () => {
  completedTasks.value = [];
  incompleteTasks.value = [];
  checkIns.value = [];

  allTasks.value = {};
  allCheckIns.value = {};
};

export const getItems = (userID) => {
  // temporary store to get the things done.
  // I know there is so much to change here but leaving as it is because things are working atleast.
  watch(allTasks, () => {
    const completed = [];
    const incompleted = [];
    for (const prop in allTasks.value) {
      if (allTasks.value[prop].completed) {
        completed.push(allTasks.value[prop]);
      } else {
        incompleted.push(allTasks.value[prop]);
      }
    }
    completedTasks.value = completed.sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    incompleteTasks.value = incompleted.sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  });

  watch(allCheckIns, () => {
    const checks = [];
    for (const prop in allCheckIns.value) {
      checks.push(allCheckIns.value[prop]);
    }
    checkIns.value = checks.sort(
      (a, b) => -a.timestamp.localeCompare(b.timestamp)
    );
  });

  let unsubTodos;
  let unsubCheckins;

  onMounted(() => {
    const todosRef = query(
      collection(firestore, "todos"),
      where("user", "==", userID)
    );

    const checkInsRef = query(
      collection(firestore, "checkins"),
      where("user", "==", userID)
    );

    unsubTodos = onSnapshot(todosRef, (querySnapshot) => {
      const docs = {};
      querySnapshot.forEach((doc) => {
        docs[doc.id] = { id: doc.id, ...doc.data() };
      });
      allTasks.value = docs;
    });

    unsubCheckins = onSnapshot(checkInsRef, (querySnapshot) => {
      const docs = {};
      querySnapshot.forEach((doc) => {
        docs[doc.id] = { id: doc.id, ...doc.data() };
      });
      allCheckIns.value = docs;
    });
  });

  onUnmounted(() => {
    if (!getAuth().currentUser) {
      resetState();
    }
    unsubTodos();
    unsubCheckins();
  });
  return { completedTasks, incompleteTasks, checkIns };
};
