<template>
  <!-- <div id="nav">
    <router-link to="/">Login</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/dashboard">Dashboard</router-link>
    <button @click="logout">Logout</button>
  </div>-->

  <router-view />
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: stretch;
  font-family: Arial, sans-serif;
  align-items: stretch;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
