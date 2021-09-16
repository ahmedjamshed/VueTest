<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    logout() {
      signOut(getAuth())
        .then(() => {
          alert("Successfully logged out");
          this.$router.push("/Login");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/");
        });
    },
  },
};
</script>
