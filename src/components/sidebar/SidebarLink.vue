<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getAuth, signOut } from "firebase/auth";
export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true }
  },
  setup(props) {
    const route = useRoute()
    const isActive = computed(() => route.path === props.to)
    const isLogout = computed(() => props.to === "/login")
    const logout = async () => {
       try {
         await signOut(getAuth())
         // router.push("/login");
       } catch(e){
           alert('Logout Failed')
       }
     }
    return { isActive, isLogout, logout }
  }
}
</script>

<template>
  <router-link :to="to" class="link" @click="isLogout ? logout() :undefined" :class="{ active: isActive }">
    <i class="icon" :class="icon"></i>
     <span class="menuTextStyle">
        <slot></slot>
      </span>
  </router-link>
</template>

<style scoped>

.link {
  display: flex;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;
  margin: 1em 0em;
  padding: 0.8em 2em;
  border-top-right-radius: 2em;
  border-bottom-right-radius: 2em;
  color: black;
  text-decoration: none;
}
.link:hover {
  background-color: black;
  color: white;
}
.link.active {
  background-color: black;
  color: white;
}
.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
.menuTextStyle {
    display: inline;
}

@media only screen and (max-width: 768px) {
  .menuTextStyle {
      display: none;
  }
  .link {
  padding: 0.8em 1em;
}
}

</style>