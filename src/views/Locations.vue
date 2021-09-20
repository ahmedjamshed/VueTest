<!-- <template>
  <div class="locations">
    <h1>{{address.city}}</h1>
    Latitude: {{ currPos.lat }}, Longitude:
    {{ currPos.lng }}

  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import useLocation from "../components/location/useLocation";
import TaskItem from "@/components/items/taskItem.vue"
import { getAuth } from "firebase/auth";
import getItems from "../store";
import { ref } from "@vue/reactivity";

export default {
  name: "Location",
  setup() {
    const { coords, city } = useLocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))
    const address = computed(() => ({
      city: city.value,
    }))
    return { currPos, address }
  }
};
</script>

<style scoped>
.locations {
  display: flex;
  flex: 1;
  align-items: stretch;
}
</style> -->

<script>

import LocationItem from "@/components/items/locationItem.vue"
import { getAuth } from "firebase/auth";
import { collection, addDoc, GeoPoint } from "firebase/firestore";
import { firestore } from "../store";
import getItems from "../store";
import useLocation from "../components/location/useLocation";
import { computed } from "@vue/reactivity";

export default {
  name: "Location",
  components: { LocationItem },
  setup(props) {
    const { coords, displayName } = useLocation()
    console.log(coords.value, displayName.value)
    const address = computed(() => ({
      displayName: displayName.value,
      pinPoint: coords.value
    }))
    const { checkIns } = getItems(getAuth().currentUser.uid)
    const addCheckin = async () => {
      if (address && address.displayName !== "Unknown"  && getAuth().currentUser) {
        await addDoc(collection(firestore, "checkins"), {
          displayName: displayName.value,
          pinPoint: new GeoPoint(coords.value.latitude, coords.value.longitude),
          timestamp: new Date().toISOString(),
          user: getAuth().currentUser.uid
        });
      } else {
        alert("Incomplete Data");
      }

    }
    return { address, checkIns, addCheckin }
  }
};
</script>

<template>
  <div class="locations">
    <a @click="addCheckin" class="addLink">+ Check In</a>
    <div class="container">
      <div class="halfContainer">
        <a class="heading">Current Location</a>
        <LocationItem :item="address"></LocationItem>
      </div>
      <div class="halfContainer">
        <a class="heading">Previous Locations</a>
        <div class="listHolder">
          <span v-for="checkIn in checkIns">
            <LocationItem :item="checkIn"></LocationItem>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.locations {
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

.listHolder::-webkit-scrollbar-track {
  background: transparent;
}
.listHolder::-webkit-scrollbar {
  width: 0.3em;
  background: white;
}
.listHolder::-webkit-scrollbar-thumb {
  background: rgb(211, 211, 211);
}

.listHolder::-webkit-scrollbar-track-piece {
  display: none;
}
</style>
