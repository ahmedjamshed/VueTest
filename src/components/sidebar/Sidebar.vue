<script>
import SidebarLink from './SidebarLink'
import { getAuth } from "firebase/auth";
import { computed } from '@vue/reactivity';

export default {
  props: {},
  components: { SidebarLink },
  setup(props) {
    const user = getAuth().currentUser
    const isAdmin = computed(() => user.uid === process.env.VUE_APP_ADMIN_UID)
    return { isAdmin }
  }
}
</script>

<template>
  <div class="sidebar">
    <span>
      <SidebarLink v-if="isAdmin" to="/admin" icon="fas fa-user-shield">Admin</SidebarLink>
    </span>
    <span>
      <SidebarLink v-if="!isAdmin" to="/tasks" icon="fas fa-tasks">Task</SidebarLink>
    </span>
    <span>
      <SidebarLink v-if="!isAdmin" to="/locations" icon="fas fa-map-marker-alt">Location</SidebarLink>
    </span>
    <span>
      <SidebarLink to="/login" icon="fas fa-sign-out-alt">Logout</SidebarLink>
    </span>
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