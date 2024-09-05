<template>
  <main>
    <section class="form">
      <!--Definition of the type of section in the page-->
      <h1 class="title">Welcome</h1>
      <h2 class="subtitle">Let's create your own account!</h2>
      <form onsubmit="return false">
        <!--Executes the code when the form is submitted-->
        <div class="input-container">
          <!--Type of element that structures the input-->
          <!--Inputs of the view-->
          <input id="firstname" class="input" type="text" placeholder="Name" />
          <input
            id="surename"
            class="input"
            type="text"
            placeholder="Surename"
          />
          <input id="email" class="input" type="text" placeholder="Email" />
          <input
            id="password"
            class="input"
            type="password"
            placeholder="Password"
          />
          <input
            id="confirm_password"
            class="input"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
      </form>
      <!--Definition of the button for the view and its function-->
      <button Route="/myschedule" class="create" v-on:click="createUser">Create</button>
    </section>
  </main>
</template>

<script>
export default {
  Name: "Login-existent",
  methods: {
    createUser() {
      console.log("passa por aqui");
      fetch("http://puigmal.salle.url.edu/api/v2/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Save all the data in the body of the request
          name: document.getElementById("firstname").value,
          last_name: document.getElementById("surename").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          image: "/cat.jpg",
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
          if(data == null) return;

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
  align-items: center; /*Aligns all the items vertically*/
  display: flex; /*Type of display used*/
  justify-content: center; /*Justifies all the items horizontally*/
  height: 100vh;
}

.form {
  background-color: #15172b; /*Definition of the background color*/
  border-radius: 20px; /*Ratius of the form*/
  box-sizing: border-box; /*Type of border*/
  height: 650px;
  padding: 20px; /*Defines the space around any element's content inside the margins*/
  width: 400px;
}

/*padding: Stablishes the space needed by all the sides of an element. It specifies the space between
the content of the element and its own border.*/
.title {
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
  margin-left: 100px;
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
  margin-top: 2px; /*Defines the top's margin*/
  margin-bottom: 25px; /*Defines the bottom's margin*/
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

.create {
  box-sizing: border-box;
  cursor: pointer; /*The cursor changes its form when passing over the button*/
  height: 50px;
  margin-top: 340px;
  width: 100%;
}
</style>
