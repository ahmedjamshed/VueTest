<template>
    <div class="modal-mask">
        <div class="modal-container">
            <div class="modal-header">
                <slot name="header">default header</slot>
            </div>
            <form class="modal-body" @submit.prevent="$emit('close'); addTask()">
                <div class="inputContainer">
                    <img src="@/assets/comment.svg" />
                    <input placeholder="Summary" v-model="summary" />
                </div>
                <div class="inputContainer">
                    <img src="@/assets/desc.svg" />
                    <textarea placeholder="Description" v-model="description" rows="3"></textarea>
                </div>
                <div class="inputContainer">
                    <img src="@/assets/timer.svg" />
                    <DatePicker v-model="date" mode="dateTime" is24hr>
                        <template v-slot="{ inputValue, inputEvents }">
                            <input placeholder="Due Date" :value="inputValue" v-on="inputEvents" />
                        </template>
                    </DatePicker>
                </div>
                <div class="modal-footer">
                    <button type="submit">Save</button>
                    <a @click="$emit('close')">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

import { computed, ref } from "@vue/reactivity";
import { DatePicker } from 'v-calendar';
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../store";
import { onMounted, watch, watchEffect } from "@vue/runtime-core";

export default {
    name: "AddTask",
    components: { DatePicker },
    setup(props) {
        const summary = ref()
        const description = ref()
        const date = ref()
        watchEffect(() => {
            console.log('modal', props)
        })
        const addTask = async () => {
            if (summary.value && date.value && getAuth().currentUser) {
                await addDoc(collection(firestore, "todos"), {
                    summary: summary.value,
                    description: description.value ?? "",
                    date: date.value.toISOString(),
                    completed: false,
                    timestamp: new Date().toISOString(),
                    user: getAuth().currentUser.uid
                });
            } else {
                alert("Incomplete Data");
            }

        }
        return { summary, description, date, addTask }
    }
};
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
}

.modal-container {
    width: 550px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

@media only screen and (max-width: 768px) {
    .modal-container {
        width: 250px;
    }
}

.modal-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 20px 0;
}
.modal-footer {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 10%;
}

img {
    height: 1em;
    width: 1em;
}

button {
    background-color: var(--primaryColor);
    border: none;
    border-radius: 25px;
    color: white;
    padding: 10px 32px;
    margin-top: 20px;
    display: inline-block;
    cursor: pointer;
    font-size: 1em;
    align-self: stretch;
}

a {
    font-size: 0.8em;
    z-index: 2;
    padding-top: 15px;
    cursor: pointer;
    padding-left: 5px;
    font-weight: 600;
}

button:hover {
    background-color: #2e2b2b;
}

input {
    display: flex;
    flex: 1;
    outline: none;
    margin: 0px;
    padding: 0px 10px;
    font-size: 0.9em;
    min-width: 0;
    border: none;
}
input::placeholder {
    color: #969696;
    font-size: 1em;
}
textarea {
    display: flex;
    flex: 1;
    outline: none;
    margin: 0px;
    padding: 0px 10px;
    font-size: 0.9em;
    min-width: 0;
    font-family: Arial, sans-serif;
    border: none;
    resize: none;
}
textarea::placeholder {
    color: #969696;
    font-size: 1em;
}

.inputContainer {
    display: flex;
    flex: 1;
    margin: 5px;
    padding: 20px;
    border-bottom: 1px solid #bdbdbdaa;
    height: 15px;
}
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>
