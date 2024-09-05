<template>
  <header>
    <!--Header of the page-->
    <MainHeader></MainHeader>
  </header>
  <main>
    <section>
      <!--Seaction to include the search bar-->
      <SearchBar @search="searchWord" id="search" class="search"></SearchBar>
    </section>
    <!--List of users (not ordered) -->
    <ul class="users-list">
      <!--Loop of User component elements-->
      <li v-for="user in users" v-bind:key="user.id">
        <User
          @go-to-profile="goToProfile"
          :ID="user.id"
          :Name="user.name"
          :Surname="user.last_name"
          :Image="user.image"
        ></User>
      </li>
    </ul>
  </main>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import User from "../components/UserList.vue";
import SearchBar from "../components/searchBar.vue";

export default {
  name: "UsersList",
  components: {
    User,
    MainHeader,
    SearchBar,
  },
  data() {
    return {
      users: [], //Array of users
    };
  },
  mounted() {
    //Fetch to get all the users in API
    fetch("http://puigmal.salle.url.edu/api/v2/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$root.$data.token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        this.users = data;
      });
  },

  methods: {
    //Function to search users, it is called when the search bar emits the event
    searchWord(search) {
      const path =
        "http://puigmal.salle.url.edu/api/v2/users/search?s=" + search;
      fetch(path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$root.$data.token,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return [];
          }
        })
        .then((data) => {
          this.users = data;
        });
    },
    //Function to go to the user profile, it is called when the user component emits the event
    goToProfile(id) {
      this.$root.$data.usrProfile = id;
      this.$router.push("/usr-profile");
    },
  },
};
</script>

<style scoped>
.users-list {
  display: flex;
  padding: 0;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
  margin-top: 20px;
}

li {
  list-style-type: none;
}
section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}

</style>
