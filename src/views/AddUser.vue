<template>
    <div class="modal-mask">
        <div class="modal-container">
            <div class="modal-header">
                <slot name="header">Add User</slot>
            </div>
            <form class="modal-body" @submit.prevent="$emit('close'); addUser()">
                <div class="inputContainer">
                    <input placeholder="Email" v-model="email" />
                </div>
                <div class="inputContainer">
                    <input placeholder="Password" v-model="password" />
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

export default {
    name: "AddTask",
    components: { DatePicker },
    props: ['item'],
    emits: ['addUser', 'close'],
    setup(props, { emit }) {
        const item = props.item
        const email = ref(item.email || '')
        const password = ref(item.password || '')


        const addUser = async () => {
            if (email.value && password.value && getAuth().currentUser) {
                emit('addUser', { email: email.value, password: password.value })
            } else {
                alert("Forbidden");
            }

        }
        return { email, password, addUser }
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
    width: 350px;
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
    border: none;
    margin: 0px;
    padding: 0px;
    font-size: 0.9em;
    background-color: #f0f0f0;
    min-width: 0;
}

::placeholder {
    color: #969696;
    font-size: 0.8em;
}

.inputContainer {
    display: flex;
    flex: 1;
    margin: 5px;
    padding: 10px;
    border: 1px solid #dedede;
    border-radius: 5px;
    background-color: #f0f0f0;
    justify-content: space-between;
    align-items: center;
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
