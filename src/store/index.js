import { createStore } from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

export default createStore({
  state: {
    todos: [],
    checkIns: [],
  },
  mutations: vuexfireMutations,
  actions: {
    bindTodosRef: firestoreAction((context) => {
      // context contains all original properties like commit, state, etc
      // and adds `bindFirestoreRef` and `unbindFirestoreRef`
      // we return the promise returned by `bindFirestoreRef` that will
      // resolve once data is ready
      return context.bindFirestoreRef("todos", db.collection("todos"));
    }),
    bindCheckinsRef: firestoreAction((context) => {
      return context.bindFirestoreRef("checkIns", db.collection("checkIns"));
    }),
    unbindTodos: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef("todos");
    }),
    unbindCheckIns: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef("checkIns");
    }),
  },
  modules: {},
});
