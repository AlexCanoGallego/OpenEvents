<template>
  <header>
    <MainHeader></MainHeader>
  </header>
  <main class="info">
    <UserInfo
      v-on:submitUsr="friendRequest"
      :Photo="user.image"
      :Name="user.name"
      :Surname="user.last_name"
      :TextButton="msg"
    >
    </UserInfo>
    <h2 class="title-events">Events I created...</h2>
    <ul class="events">
      <li v-for="event in events" v-bind:key="event.id">
        <Event
          @go-to-event="goToEvent"
          :ID="event.id"
          :Name="event.name"
          :Description="event.description"
          :Image="event.image"
        ></Event>
      </li>
    </ul>
  </main>
</template>

<script>
import Event from "../components/EventList.vue";
import MainHeader from "../components/MainHeader.vue";
import UserInfo from "../components/InfoUser.vue";

export default {
  name: "UserProfile",
  components: {
    UserInfo,
    Event,
    MainHeader,
  },
  data() {
    return {
      user: {},
      events: [],
      msg: "Friendship?",
    };
  },
  mounted() {
    console.log("estic dins del mounted profile");
    var id = this.$root.$data.usrProfile;
    var path = "http://puigmal.salle.url.edu/api/v2/users/" + id;
    console.log(path);
    fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("error");
        }
      })
      .then((data) => {
        console.log(data);
        this.user = data[0];
      });

    path = "http://puigmal.salle.url.edu/api/v2/users/" + id + "/events";
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
          console.log("error");
        }
      })
      .then((data) => {
        console.log(data);
        this.events = data;
      });

    fetch("http://puigmal.salle.url.edu/api/v2/friends", {
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
          console.log("error");
        }
      })
      .then((data) => {
        this.msg = "Friendship?";
        data.forEach((friend) => {
          if (friend.id == id) {
            this.$refs.UsrInfo.hide();
          }
        });
      });
  },
  methods: {
    goToEvent(id) {
      this.$root.$data.eventID = id;
      this.$router.push("/joinEvent");
    },
    methods: {
      friendRequest() {
        fetch(
          `http://puigmal.salle.url.edu/api/v2/friends/${this.$root.$data.usrProfile}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$root.$data.token,
            },
          }
        )
          .then((response) => {
            console.log("hola");
            if (response.ok) {
              console.log("friend request sent");
              return response.json();
            } else {
              console.log("error");
            }
          })
          .then((data) => {
            console.log(data);
          });
      },
      goToEvent(id) {
        this.$root.$data.eventID = id;
        this.$router.push("/joinEvent");
      },
    },
  },
};
</script>

<style scoped>
.title-events {
  padding-left: 20px;
  margin-left: 20px;
}
.events {
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
}

li {
  list-style: none;
}

</style>
