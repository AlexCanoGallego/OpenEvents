<template>
  <header>
    <MainHeader></MainHeader>
  </header>
  <body>
    <ul class="notif-list">
      <li v-for="request in requests" v-bind:key="request.id">
        <Notification
          v-on:accept="acceptRequest"
          v-on:decline="declineRequest"
          :Origin="request.name + ' ' + request.last_name"
          Message="has sent a friend request"
          :Picture="request.image"
          :Id="request.id"
        ></Notification>
      </li>
    </ul>
  </body>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import Notification from "../components/Notification.vue";

export default {
  name: "MyFriends",
  components: {
    Notification,
    MainHeader,
  },
  data() {
    return {
      requests: [],
    };
  },
  mounted() {
    console.log("estic dins del mounted");
    this.updateRequests();
  },
  methods: {
    acceptRequest(id) {
      console.log("accept");
      console.log("http://puigmal.salle.url.edu/api/v2/friends/" + id);
      console.log(`http://puigmal.salle.url.edu/api/v2/friends/${id}`);
      fetch(`http://puigmal.salle.url.edu/api/v2/friends/${id}`, {
        method: "PUT",
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
            return null;
          }
        })
        .then((data) => {
          if (data != null) {
            this.updateRequests();
          }
        });
    },
    declineRequest(id) {
      console.log("accept");
      console.log("http://puigmal.salle.url.edu/api/v2/friends/" + id);
      console.log(`http://puigmal.salle.url.edu/api/v2/friends/${id}`);
      fetch(`http://puigmal.salle.url.edu/api/v2/friends/${id}`, {
        method: "DELETE",
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
            return null;
          }
        })
        .then((data) => {
          if (data != null)
          {
            this.updateRequests();
          }
        });
    },
    updateRequests() {
      console.log("updating friend requests");
      fetch("http://puigmal.salle.url.edu/api/v2/friends/requests", {
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
          this.$data.requests = data;
        });
    },
  },
};
</script>

<style scoped>
.notif-list {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 50px;
  margin-top: 30px;
}
</style>
