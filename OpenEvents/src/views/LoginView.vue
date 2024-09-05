<template>
  <main>
    <section class="form">
      <h1 class="title">Hello!</h1>
      <h2 class="subtitle">
        Enter your email addres and password to log into the system
      </h2>
      <form onsubmit="return false">
        <div class="input-container">
          <!--Type of element that structures the input-->
          <input
            id="email"
            class="input"
            type="text"
            placeholder="Email"
            v-model="email"
          />
          <input
            id="password"
            class="input"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <!--Definition of the button that logs into the system-->
        <button class="submit" v-on:click="login">Submit</button>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: "Login-existent",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      fetch("http://puigmal.salle.url.edu/api/v2/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return null;
          }
        })
        .then((data) => {
          if (data == null) return;
          let resp = data["accessToken"];
          // Save token in localStorage
          localStorage.setItem("token", resp);
          this.$root.$data.token = resp;
          // Get the user data to log in
          this.$root.getUserData(this.email);
          // Addition of the user to the array of user's emails
          this.$root.addNewUserStorage(this.email);
          // Redirect to the main page
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
  height: 450px;
  padding: 20px;
  width: 400px;
}

.title {
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
  margin-left: 120px;
}

.subtitle {
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
  margin-top: 2px;
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
  outline: 0;
  padding: 4px 20px;
  margin-top: 25px;
  width: 100%;
}

.submit {
  box-sizing: border-box;
  cursor: pointer;
  height: 50px;
  margin-top: 100px;
  width: 100%;
}
</style>
