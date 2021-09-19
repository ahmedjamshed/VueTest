<script>
import SidebarLink from './SidebarLink'

export default {
  props: {},
  components: { SidebarLink },
}
</script>

<template>
  <div class="sidebar">
    <span><SidebarLink to="/tasks" icon="fas fa-tasks">Task</SidebarLink></span>
    <span><SidebarLink to="/locations" icon="fas fa-map-marker-alt">Location</SidebarLink></span>
    <span><SidebarLink to="/login" icon="fas fa-sign-out-alt">Logout</SidebarLink></span>
  </div>
</template>


<style scoped>
.sidebar {
  display: flex;
  flex: 1;
  color: white;
  z-index: 1;
  flex-direction: column;
}

span:last-of-type {
  margin-top: auto;
}
</style>