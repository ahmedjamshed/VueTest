<template>
  <div class="tasks">
      <h1>TASKS</h1>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "Task",
   setup() {
     const router = useRouter()
     return {  }
   }
};
</script>

<style scoped>
 .tasks {
  display: flex;
  flex: 1;
  align-items: stretch;
 }
</style>
