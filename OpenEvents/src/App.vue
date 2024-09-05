<!--Link a la we: http://127.0.0.1:5173/ -->

<script>
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    RouterView,
  },
  data() {
    return {
      usrProfile: 0,
      eventID: 0,
      userName: "",
      userLastName: "",
      userID: 0,
      userEmail: "",
      userImage: "",
      token: "",
      isLoaded: false,
    };
  },
  methods: {
    logout() {
      this.$data.userEmail = "";
      this.$data.userName = "";
      this.$data.userLastName = "";
      this.$data.userID = 0;
      this.$data.userImage = "";
    },

    getUserData(email) {
      this.$data.userEmail = email;
      const path =
        "http://puigmal.salle.url.edu/api/v2/users/search?s=" + email;
      fetch(path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("User found");
            return response.json();
          } else {
            return null;
          }
        })
        .then((data) => {
          //Saving parameters while the page is working
          this.$data.userName = data[0].name;
          this.$data.userLastName = data[0].last_name;
          this.$data.userImage = data[0].image;
          this.$data.userID = data[0].id;
        });
    },
    addNewUserStorage(element) {
      var logging = [];
      if (localStorage.getItem("logging") != null) {
        logging = JSON.parse(localStorage.getItem("logging"));
        if (!logging.includes(element)) {
          logging.push(element);
        }
      } else {
        logging.push(element);
      }
      localStorage.setItem("logging", JSON.stringify(logging));
    },
  },
};
</script>

<template>
  <body>
    <RouterView />
  </body>
</template>

<style scoped></style>

<!--alpinia -->
