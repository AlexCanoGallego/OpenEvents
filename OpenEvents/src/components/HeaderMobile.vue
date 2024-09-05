<template>
  <div>
    <section id="sidemenu">
      <img @click="closeNav()" class="closeMenu" src="/close.png" alt="Error" />
      <ul id="nav" class="menu">
        <li>
          <RouterLink to="/myschedule" class="link">My Schedule</RouterLink>
        </li>
        <li><RouterLink to="/events" class="link">Events</RouterLink></li>
        <li>
          <RouterLink to="/myfriends" class="link">My Friends</RouterLink>
        </li>
        <li><RouterLink to="/users" class="link">Users</RouterLink></li>
        <li>
          <RouterLink to="/notifications" class="link"
            >Notifications</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/my-profile" class="link">My Profile</RouterLink>
        </li>
      </ul>
    </section>
    <div class="headerPart">
      <img @click="openNav()" class="openMenu" src="/lista.png" alt="Error" />
      <img class="logo" src="/logo.png" alt="Error" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderMobile",
  methods: {
    openNav() {
      document.getElementById("sidemenu").style.width = "300px";
    },
    closeNav() {
      document.getElementById("sidemenu").style.width = "0px";
    },
  },
};
</script>

<style scoped>
#sidemenu {
  height: 100%;
  width: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #15172b;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;

}


.link {
  margin: 50px;
  font-size: large;
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
  display: block;
  transition: 0.3s;
}

.closeMenu {
  width: 50px;
  height: 50px;
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 70%;
}

.openMenu {
  width: 50px;
  height: 50px;
  margin-top: 20px;
  margin-left: 20px;
}
#nav a.router-link-exact-active {
  color: #8b06d3;
}

.logo {
  width: 180px;
  height: 100px;
}

.headerPart {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  justify-content: space-around;
  
}

#nav li {
  list-style-type: none;
}


</style>
