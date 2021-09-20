<script>import { computed, ref } from "@vue/reactivity"

export default {
    props: ["item"],
    setup(props) {
        const item = props.item
        return { item }
    }
}
</script>

<template>
    <div class="taskItem">
        <input type="checkbox" />
        <div class="itemDetail">
            <p class="heading">{{ item.summary }}</p>
            <div class="dateContainer">
                <img src="@/assets/timer.svg" />
                <p class="desc">{{ item.date }}</p>
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
img {
    height: 0.9em;
    width: 0.9em;
}

input {
    width: 20px;
    height: 20px;
    margin: 5px 10px;
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
}

.dateContainer {
    display: flex;
    flex-direction: row;
}

.heading {
    font-size: 1em;
    color: black;
}
.desc {
    font-size: 1em;
    color: grey;
}
</style>