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
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";
import AddTask from "./AddTask.vue"

export default {
    name: "Task",
    components: { AddTask },
    setup() {

        const showModal = ref(false)
        const toggleVisibility = () => {
            showModal.value = !showModal.value
        }
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
