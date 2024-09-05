<template>
  <main>
    <section class="form">
      <!--Definition of the type of section in the page-->
      <h1 class="title">OpenEvents</h1>
      <!--Title of the view-->
      <img class="image" src="/logo.png" alt="logo" width="280" />
      <!--Insertion of an image-->
      <h2 class="subtitle">
        Chose an account or create a new one if you’re not registered
      </h2>
      <hr /> <!--Defines a break in the page-->

      <!--Loop to show all users logged -> Lists the users Logged in-->
      <li style="list-style: none;" v-for="user in userLogged" :key="user"> 
          <UserLogged 
            @go-to-login-existent="goToLoginExistent"
            :email="user">
          </UserLogged>
      </li>
      <hr />

      <Router Text="Create Account" Route="/create-account" class="create"></Router>
      <Router Text="Login" Route="/login" class="login_existing"></Router>
    </section>
  </main>
</template>

<script>

import Router from "../components/buttonRoute.vue";
import UserLogged from "../components/UserLogged.vue";

export default {
  Name: "Login",
  components: {
    Router,
    UserLogged
},
  data() {
    return {
      email: String,    //Component data used for the current user email
      userLogged: [],   //Component data used for the logins
    };
  },
  mounted() {  
    //If the user is logged, it will be stored in the local storage
    if (localStorage.getItem("logging") != null) {
      this.userLogged = JSON.parse(localStorage.getItem("logging"));
    }
  },
  methods: {
    goToLoginExistent(email) {
      //Get the email of the user logged
      this.$root.$data.userEmail = email;
      //Go to the login-existent view
      this.$router.push("/login-existent");
    },

  }
};
</script>

<style scoped>
main {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
}

.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 850px;
  padding: 20px;
  width: 400px;
}

.title {
  font-size: 36px;
  font-weight: 600;
  margin-top: 20px;
  margin-left: 70px;
}

.image {
  margin-left: 40px;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 12px;
  font-weight: 600;
}

.create {
  box-sizing: border-box;
  cursor: pointer;
  height: 50px;
  margin-top: 20px;
  width: 100%;
}

.login_existing {
  box-sizing: border-box;
  cursor: pointer;
  height: 50px;
  margin-top: 20px;
  width: 100%;
}

ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: yellow;
  height: 100px;
}

</style>
