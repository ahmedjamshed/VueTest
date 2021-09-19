<template>
  <div class="locations">
    <h1>{{address.city}}</h1>
    Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
    {{ currPos.lng.toFixed(2) }}

  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import useLocation from "../components/location/useLocation";


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
</style>