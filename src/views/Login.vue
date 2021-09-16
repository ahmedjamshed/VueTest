<template>
  <div>
    <form @submit.prevent="login">
      <h2>Log In</h2>
      <input type="email" placeholder="Email address..." v-model="email" />
      <input type="password" placeholder="password..." v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  props: {
    email: "",
    password: "",
  },
  methods: {
    login() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(() => {
          alert("Successfully logged in");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h2 {
  margin: 40px 0 0;
}

input {
  margin-right: 20px;
}
</style>