<script>import { computed, ref } from "@vue/reactivity"
import { watch } from "@vue/runtime-core"

export default {
    props: ["item"],
    setup(props) {
        const item = computed(() => ({
            name: props.item.displayName,
            point: `${props.item.pinPoint.latitude} °N , ${props.item.pinPoint.longitude} °E`
        }))
        const openMap = () => {
            const link = `http://maps.google.com/maps?q=loc:${props.item.pinPoint.latitude},${props.item.pinPoint.longitude}`
            window.open(link)
        }
        return { item, openMap }
    }
}
</script>

<template>
    <div class="locationItem" @click="openMap">
        <span>📍</span>
        <div class="itemDetail">
            <p class="heading">{{ item.name }}</p>
            <div class="dateContainer">
                <p class="desc">{{ item.point }}</p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.locationItem {
    display: flex;
    flex: 1;
    color: white;
    flex-direction: row;
    align-items: flex-start;
    user-select: none;
}
span {
    height: 1.1em;
    width: 1.1em;
    margin: 7px 8px 0px 0px;
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
.desc {
    font-size: 0.8em;
    color: grey;
}
</style>