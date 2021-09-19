<template>
  <div class="home">
    <Sidebar></Sidebar>
    <div class="rest">
      <router-view />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/sidebar/Sidebar.vue";

export default {
  name: "Home",
  components: { Sidebar },
   setup() {
    
   }
};
</script>

<style scoped>
 .home {
  display: flex;
  flex: 1;
  align-items: stretch;
  padding: 30px 0px;
 }
 .rest {
   display: flex;
   flex: 6;
   align-items: stretch;
 }
</style>
