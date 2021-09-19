<template>
    <div class="tasks">
        <a @click="toggleVisibility" class="addLink">+ Add new task</a>
        <a class="heading">Incomplete</a>
        <a class="heading">Completed</a>
        <transition name="modal">
            <AddTask v-if="showModal" @close="toggleVisibility">
                <template v-slot:header>
                    <h3>New Task</h3>
                </template>
            </AddTask>
        </transition>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { getAuth } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../store";
import AddTask from "./AddTask.vue"

export default {
    name: "Task",
    components: { AddTask },
    setup() {
        const showModal = ref(false)
        const toggleVisibility = () => {
            showModal.value = !showModal.value
        }
        let unsubscribe;
        onMounted(() => {
            const q = query(collection(firestore, "todos"), where("user", "==", getAuth().currentUser.uid));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const todos = [];
                querySnapshot.forEach((doc) => {
                    todos.push(doc.data().summary);
                });
                console.log("Current TOdods ", todos.join(", "));
            });
        })
        onUnmounted(() => {
            unsubscribe()
        })
        return { showModal, toggleVisibility }
    }
};
</script>

<style scoped>
.tasks {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 30px 60px;
    align-items: stretch;
}
.addLink {
    font-weight: 600;
    cursor: pointer;
}
.heading {
    margin: 20px 0px;
    font-weight: 600;
}
</style>
