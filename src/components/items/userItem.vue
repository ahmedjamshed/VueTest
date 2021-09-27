<script>import { computed, ref } from "@vue/reactivity"
import { watch } from "@vue/runtime-core"

export default {
    props: ["item"],
    setup(props, { emit }) {
        const item = computed(() => ({
            name: props.item.email.split('@')[0],
            email: props.item.email
        }))
        const deleteItem = () => {
            emit('onDelete', props.item.uid)
        }
        return { item, deleteItem }
    }
}
</script>

<template>
    <div class="userItem" @click="goToUser">
        <span>📧</span>
        <div class="itemDetail">
            <p class="heading">{{ item.name }}</p>
            <div class="emailContainer">
                <p class="desc">{{ item.email }}</p>
            </div>
        </div>
        <img class="checkImg" src="@/assets/delete.svg" @click="deleteItem(item)" />
    </div>
</template>


<style scoped>
.userItem {
    display: flex;
    flex: 1;
    color: white;
    flex-direction: row;
    align-items: flex-start;
    user-select: none;
}
.checkImg {
    height: 0.8em;
    width: 0.8em;
    padding: 7px 10px 0px 0px;
}

span {
    width: 1em;
    margin: 0px 15px 15px 0px;
}

input {
    width: 18px;
    height: 18px;
    margin: 8px 12px;
}

/* Checkbox element, when checked */
input[type="checkbox"]:checked {
    background-color: #fff;
}

.itemDetail {
    display: flex;
    flex: 1;
    color: white;
    flex-direction: column;
    padding: 7px 0px;
}

.emailContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 0px;
}

.heading {
    font-size: 1em;
    color: black;
}
.desc {
    font-size: 0.8em;
    color: grey;
}
</style>