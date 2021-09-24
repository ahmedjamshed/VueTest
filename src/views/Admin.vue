<template>
    <div class="admins">
        <a @click="() => toggleVisibility(undefined)" class="addLink">+ Add new User</a>
        <div class="container">
            <div class="halfContainer">
                <a class="heading">Users</a>
                <ul class="listHolder">
                    <li v-for="user in users" :key="user.id">
                        <UserItem :item="{ ...user }"></UserItem>
                    </li>
                </ul>
            </div>
        </div>
        <transition name="modal">
            <AddUser v-if="showModal" @close="toggleVisibility" :item="editItem" @addUser="addUser">
                <template v-slot:header>
                    <h3>{{ modalHead }}</h3>
                </template>
            </AddUser>
        </transition>
    </div>
</template>

<script>

import AddUser from "./AddUser.vue"
import UserItem from "@/components/items/userItem.vue"
import { getAuth } from "firebase/auth";
import { getItems } from "../store";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

export default {
    name: "Task",
    components: { AddUser, UserItem },
    setup(props) {
        const showModal = ref(false)
        const users = ref([])
        const modalHead = ref('Add User')
        const editItem = ref()
        const toggleVisibility = (item) => {
            if (item) {
                editItem.value = item
                modalHead.value = 'Edit User'
            } else {
                editItem.value = {}
                modalHead.value = 'Add User'
            }
            showModal.value = !showModal.value
        }
        const getUsers = async () => {
            try {
                const idToken = await getAuth().currentUser.getIdToken();
                users.value = await fetch("http://localhost/api", { headers: { authorization: idToken } }).then(response => response.json())
            } catch (e) {
                console.log(e.message)
            }
        }
        onMounted(getUsers)
        const addUser = async (user) => {
            const idToken = await getAuth().currentUser.getIdToken();
            console.log(user)
            const userRes = await fetch("http://localhost/api", {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    authorization: idToken
                }, body: JSON.stringify(user)
            }).then(response => response.json())
            console.log(userRes)
        }
        return { modalHead, users, showModal, editItem, addUser, toggleVisibility }
    }
};
</script>

<style scoped>
.admins {
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
