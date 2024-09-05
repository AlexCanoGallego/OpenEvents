<template>
  <section class="all-header">
    <img class="logo" src="/logo.png" alt="Error" />
    <ul id="nav" class="menu">
      <li><RouterLink to="/myschedule" >My Schedule</RouterLink></li>
      <li><RouterLink to="/events" >Events</RouterLink></li>
      <li><RouterLink to="/myfriends">My Friends</RouterLink></li>
      <li><RouterLink to="/users">Users</RouterLink></li>
      <li><RouterLink to="/notifications">Notifications</RouterLink></li>
    </ul>
    <RouterLink to="/my-profile">
      <img
        class="profile"
        :src="this.$root.$data.userImage"
        @error="onError"
        alt="Imagen"
      />
    </RouterLink>
  </section>
</template>

<script>
export default {
  name: "HeaderWeb",
  computed: {
    isActive(path) {
      return this.$route.path === path
    }
  },
  
  methods: {
    //Funtion to change the image when there is an error
    onError(event) {
      event.target.src = "/no-profile-pic.png";
    }
  },
  
};
</script>

<style scoped>
.all-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #15172b;
  column-gap: 20px;
  margin: 0;
  width: 100%;
  height: 150px;
}

.menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  column-gap: 50px;
  font-size: large;
}

a {
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
}

/*Change txt weight when you pass the mouse*/
a:hover {
  font-weight: bold;
}

.logo {
  height: 100px;
  padding: 20px;
  float: right;
  margin-left: 50px;
}

.profile {
  height: 100px;
  width: 100px;
  border-radius: 100px;
  border-color: #000;
  justify-content: flex-end;
  margin-right: 50px;
}

/*Change text color when age is changed*/
#nav a.router-link-exact-active {
  color: #8b06d3;
}

#nav li {
  list-style-type: none;
}



</style>
