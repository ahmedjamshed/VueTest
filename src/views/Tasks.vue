<template>
    <div class="tasks">
        <a @click="toggleVisibility" class="addLink">+ Add new task</a>
        <div class="container">
            <div class="halfContainer">
                <a class="heading">Incomplete</a>
                <div class="listHolder">
                    <span v-for="task in incompleteTasks">
                    <TaskItem :item="{ ...task }"></TaskItem>
                </span>
                </div>
                
            </div>
            <div class="halfContainer">
                <a class="heading">Completed</a>
                <div class="listHolder">
                    <span v-for="task in incompleteTasks">
                    <TaskItem :item="{ ...task }"></TaskItem>
                </span>
                </div>
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
        const { completedTasks, incompleteTasks } = getItems(getAuth().currentUser.uid)
        return { completedTasks, incompleteTasks, showModal, toggleVisibility }
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
    margin: 10px 0px;
    font-weight: 600;
    flex: 1;
    display: flex;
    align-self: flex-start;
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
    height: 45%;
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

.listHolder::-webkit-scrollbar-track{
  background:transparent;
}
.listHolder::-webkit-scrollbar {
  width: 0.3em;
  background: white;
}
.listHolder::-webkit-scrollbar-thumb {
  background: rgb(211, 211, 211);
}

.listHolder::-webkit-scrollbar-track-piece
{
   display:none;
}
</style>
