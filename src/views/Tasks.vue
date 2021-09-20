<template>
    <div class="tasks">
        <a @click="toggleVisibility" class="addLink">+ Add new task</a>
        <div class="container">
            <div class="halfContainer">
                <a class="heading">Incomplete</a>
                <span v-for="task in incompleteTasks">
                    <TaskItem :item="{ ...task }"></TaskItem>
                </span>
            </div>
            <div class="halfContainer">
                <a class="heading">Completed</a>
            </div>
        </div>
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

import AddTask from "./AddTask.vue"
import TaskItem from "@/components/items/taskItem.vue"
import { getAuth } from "firebase/auth";
import getItems from "../store";
import { ref } from "@vue/reactivity";

export default {
    name: "Task",
    components: { AddTask, TaskItem },
    setup(props) {
        const showModal = ref(false)
        const toggleVisibility = () => {
            showModal.value = !showModal.value
        }
        const { completedTasks, incompleteTasks, checkIns } = getItems(getAuth().currentUser.uid)
        return { completedTasks, incompleteTasks, checkIns, showModal, toggleVisibility }
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
.container {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: stretch;
}
.halfContainer {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: stretch;
}
</style>
