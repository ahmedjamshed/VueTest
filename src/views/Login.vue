<template>
  <div class="center">
    <form @submit.prevent="getIn">
      <h2>{{ modeText }}</h2>
      <input class="inputContainer" type="email" placeholder="Email" v-model="email" />
      <div class="inputContainer">
        <input class="password" :type="fieldType" placeholder="Password" v-model="password" />
        <a @click="switchVisibility">{{ visibilityText }}</a>
      </div>
      <button type="submit">{{ isLoading ? "Getting In..." : modeText }}</button>
      <a class="modeSwitchText" @click="switchMode">{{ modeSwitchText }}</a>
    </form>
  </div>
</template>



<script>
import { computed, ref } from "@vue/reactivity";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    // variable
    const router = useRouter()
    const email = ref()
    const password = ref()
    const fieldType = ref('password')
    const mode = ref('login')
    const isLoading = ref(false)
    const visibilityText = computed(() => {
      return fieldType.value === "password" ? "Show" : "Hide"
    })
    const modeText = computed(() => {
      return mode.value === "login" ? "Log In" : "Register"
    })
    const modeSwitchText = computed(() => {
      return mode.value === "login" ? "Don't have an account?" : "Aleady have an account?"
    })
    // functions
    const getIn = async () => {
      try {
        isLoading.value = true
        if (mode.value === "login")
          await signInWithEmailAndPassword(getAuth(), email.value, password.value);
        else
          await createUserWithEmailAndPassword(getAuth(), email.value, password.value);
        router.push("/");
      } catch (error) {
        alert(error.message);
      } finally {
        isLoading.value = false
      }
    }
    const switchVisibility = () => {
      fieldType.value = fieldType.value === "password" ? "text" : "password"
    }
    const switchMode = () => {
      mode.value = mode.value === "login" ? "register" : "login"
    }
    return {
      email, password, fieldType, visibilityText,
      mode, modeText, modeSwitchText, isLoading,
      getIn, switchVisibility, switchMode
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 30px 0;
}
.password {
  flex: 1;
  border: none;
  background-color: #f0f0f0;
  box-sizing: border-box;
}
.modeSwitchText {
  padding: 15px;
  text-decoration: underline;
}
input {
  outline: none;
  margin: 0px;
  padding: 0px;
  font-size: 0.9em;
  min-width: 0;
}
.center {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  width: 350px;
}

@media only screen and (max-width: 768px) {
  form {
    width: 250px;
  }
}

button {
  background-color: var(--primaryColor);
  border: none;
  border-radius: 25px;
  color: white;
  padding: 10px 32px;
  margin-top: 20px;
  display: inline-block;
  cursor: pointer;
  font-size: 1em;
}

button:hover {
   background-color: #2e2b2b;
}

a {
  font-size: 0.8em;
  z-index: 2;
  cursor: pointer;
  padding-left: 5px;
  font-weight: 500;
}

::placeholder {
  color: #969696;
  font-size: 0.8em;
}

.inputContainer {
  display: flex;
  flex: 1;
  margin: 5px;
  padding: 10px;
  border: 1px solid #dedede;
  border-radius: 5px;
  background-color: #f0f0f0;
  justify-content: space-between;
  align-items: center;
  height: 15px;
}
</style>