<template>
  <main>
    <section class="form">
      <!--Definition of the type of section in the page-->
      <h1 class="title">Hello again!</h1>
      <!--Title of the view-->
      <h2 class="subtitle">
        Please enter the password to log into your account:
      </h2>
      <div class="input-container">
        <!--Type of element that structures the input-->
        <input
          id="password"
          class="input"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button class="submit" v-on:click="getLoggedUser">Submit</button>
    </section>
  </main>
</template>

<script>
import Router from "../components/buttonRoute.vue";

export default {
  Name: "Login-existent",
  components: {
    Router,
  },
  data() {
    return {
      password: "",
    };
  },
  methods: {
    getLoggedUser() {
      fetch("http://puigmal.salle.url.edu/api/v2/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.$root.userEmail,
          password: this.password,
        }),
      })
        .then((response) => {
          // Manage response from the API
          if (response.ok) {
            return response.json();
          } else {
            return null;
          }
        })
        .then((data) => {      
          // Manage data from the API     
          let resp = data["accessToken"];
          // Save token in localStorage
          localStorage.setItem("token", resp);

          this.$root.$data.token = resp;
          this.$root.getUserData(this.$root.userEmail);

          // Redirect to the schedule view
          this.$router.push("/myschedule"); 
        });
    },
  },
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
  height: 400px;
  padding: 20px;
  width: 400px;
}

.title {
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
  margin-left: 70px;
}

.subtitle {
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
}

label {
  font-size: 14px;
}

.input-container {
  height: 50px;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
}

.input {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
  padding: 4px 20px;
  width: 100%;
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 10px;
}

.submit {
  box-sizing: border-box;
  cursor: pointer;
  height: 50px;
  margin-top: 20px;
  width: 100%;
}
</style>
