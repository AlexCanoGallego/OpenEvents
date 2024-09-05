<template>
    <div class="user" v-on:click="goToLoginExistent">
      <h3>{{ email }}</h3>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserLogged",
    props: {
      email: String,
    },
    methods: {
      goToLoginExistent() {
        this.$emit("goToLoginExistent", this.$props.email);
      },
    },  
  };
  </script>
  
  <style scoped>
  .user {
  background-color: #15172b;
  border-style: solid;
  border-color: #eee;
  border-radius: 12px;
  box-sizing: border-box;
  cursor: pointer;
  height: 50px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #eee;
  text-align: center;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  list-style-type: none;
}
  </style>
  