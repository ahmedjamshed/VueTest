<template>
    <div class="tasks">
        <a @click="() => toggleVisibility(undefined)" class="addLink">+ Add new task</a>
        <div class="container">
            <div class="halfContainer">
                <a class="heading">Incomplete</a>
                <ul class="listHolder">
                    <li v-for="task in incompleteTasks" :key="task.id">
                        <TaskItem :item="{ ...task }" @edit="toggleVisibility"></TaskItem>
                    </li>
                </ul>
            </div>
            <div class="halfContainer">
                <a class="heading">Completed</a>
                <ul class="listHolder">
                    <li v-for="task in completedTasks" :key="task.id">
                        <TaskItem :item="{ ...task }"></TaskItem>
                    </li>
                </ul>
            </div>
        </div>
        <transition name="modal">
            <AddTask v-if="showModal" @close="toggleVisibility" :item="editItem">
                <template v-slot:header>
                    <h3>{{ modalHead }}</h3>
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
        const modalHead = ref('New Task')
        const editItem = ref()
        const toggleVisibility = (item) => {
            if (item) {
                editItem.value = item
                modalHead.value = 'Edit Task'
            } else {
                editItem.value = {}
                modalHead.value = 'Add Task'
            }
            showModal.value = !showModal.value
        }
        const { completedTasks, incompleteTasks } = getItems(getAuth().currentUser.uid)
        return { modalHead, completedTasks, incompleteTasks, showModal, editItem, toggleVisibility }
    }
};
</script>

<style scoped>
.tasks {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 30px 5px 5px 5%;
    align-items: stretch;
}
.addLink {
    font-weight: 600;
    cursor: pointer;
    user-select: none;
}
.heading {
    margin: 10px 0px;
    font-weight: 600;
    flex: 1;
    display: flex;
    align-self: flex-start;
    user-select: none;
}
.container {
    height: 84vh;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
}
.halfContainer {
    height: 47%;
    flex-direction: column;
    align-items: stretch;
    padding: 15px 0px;
}
.listHolder {
    height: 90%;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: stretch;
    overflow-y: scroll;
    overflow-x: hidden;
    /* -ms-overflow-style: none; 
    scrollbar-width: none;  */
}

.listHolder::-webkit-scrollbar-track {
    background: transparent;
}
.listHolder::-webkit-scrollbar {
    width: 0.5em;
    background: white;
}
.listHolder::-webkit-scrollbar-thumb {
    background: rgb(211, 211, 211);
}

.listHolder::-webkit-scrollbar-track-piece {
    display: none;
}
</style>
