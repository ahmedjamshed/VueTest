<script>
import { computed } from "@vue/reactivity";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../store";

export default {
    props: ["item"],
    setup(props) {
        const item = computed(() => {
            const date = new Date(props.item.date)
            const currMon = date.toLocaleString('default', { month: 'short' });
            const formattedDate = `${date.getDate()} ${currMon}, ${date.getHours()}:${date.getMinutes()}`
            return {
                ...props.item,
                formattedDate
            }
        })


        const toggleItem = async (item) => {
            await updateDoc(doc(firestore, "todos", item.id), {
                completed: !item.completed
            });
        }


        return { item, toggleItem }
    }
}
</script>

<template>
    <div class="taskItem">
        <div @click="toggleItem(item)">
            <img class="checkImg" v-if="item.completed" src="@/assets/checked.svg" />
            <img class="checkImg" v-else src="@/assets/unchecked.svg" />
        </div>
        <div class="itemDetail">
            <p :class="item.completed ? 'headingDisabled' : 'heading'">{{ item.summary }}</p>
            <div v-if="!item.completed" class="dateContainer">
                <span class="timerImg">⏰</span>
                <p class="desc">{{item.formattedDate }}</p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.taskItem {
    display: flex;
    flex: 1;
    color: white;
    flex-direction: row;
    align-items: flex-start;
}
.checkImg {
    height: 1em;
    width: 1em;
    padding: 8px 10px 0px 0px;
}

.timerImg {
    font-size: 0.6em;
    padding: 0px 5px 0px 0px;
}

input {
    width: 18px;
    height: 18px;
    margin: 8px 12px;
    display: none;
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

.dateContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 0px;
}

.heading {
    font-size: 1em;
    color: black;
}
.headingDisabled {
    font-size: 1em;
    color: grey;
    text-decoration: line-through;
}
.desc {
    font-size: 0.8em;
    color: grey;
}
</style>