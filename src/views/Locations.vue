<template>
  <div class="locations">
      <h1>Locations</h1>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "Location",
   setup() {
     const router = useRouter()
     return {  }
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