<template>
  <header>
    <MainHeader></MainHeader>
  </header>
  <main>
    <section class="info">
      <img
        class="image"
        :src="image"
        alt="User profile image"
        @error="onError"
      />
      <div class="lateral">
        <!--Name of the user-->
        <h3 class="name">{{ userName }}</h3>
        <!--Email of the user-->
        <h3 class="email">{{ email }}</h3>
        <div class="buttons">
          <button v-on:click="changeProfile" class="button">
            Change profile
          </button>
          <button v-on:click="deleteAccount" class="button">
            Delete Account
          </button>
          <button v-on:click="logout" class="button">Logout</button>
        </div>
      </div>
    </section>
    <h2 class="title-statics">Statistics</h2>
    <!--Statistics table-->
    <table class="table">
      <thead>
        <th class="text">Puntuation</th>
        <th class="text">Number of comments</th>
        <th class="text">Percentage of comments</th>
      </thead>
      <tbody>
        <tr>
          <td class="text">{{ avg_score }}</td>
          <td class="text">{{ num_comments }}</td>
          <td class="text">{{ percentage_comments_below }}</td>
        </tr>
      </tbody>
    </table>
    <h2 class="title-events">Modify my events</h2>
    <ul class="list">
      <li v-for="event in events" v-bind:key="event.id">
        <Event
          @go-to-event="goToModify"
          :ID="event.id"
          :Name="event.name"
          :Image="event.image"
          :Hour="event.eventStart_date"
        ></Event>
      </li>
    </ul>
  </main>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import Event from "../components/EventList.vue";

export default {
  name: "UserProfile",
  components: {
    MainHeader,
    Event,
  },
  data() {
    //Variable declaration
    return {
      avg_score: 0,
      num_comments: 0,
      percentage_comments_below: 0,
      userName: this.$root.$data.userName + " " + this.$root.$data.userLastName,
      email: this.$root.$data.userEmail,
      image: this.$root.$data.userImage,
      events: [],
    };
  },
  mounted() {
    fetch(
      "http://puigmal.salle.url.edu/api/v2/users/" +
        this.$root.$data.userID +
        "/statistics",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$root.$data.token,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        if(data.length == 0) return; //To control the error of the API
        //Conversion the response of the API into text format
        this.avg_score = data[0].avg_score;
        if (this.avg_score == null) {
          this.avg_score = "-";
        }
        this.num_comments = data[0].num_comments;
        if (this.num_comments == null) {
          this.num_comments = "-";
        }
        this.percentage_comments_below = data[0].percentage_comments_below;
        if (this.percentage_comments_below == null) {
          this.percentage_comments_below = "-";
        }
      });

    const url = "http://puigmal.salle.url.edu/api/v2/users/" + this.$root.$data.userID + "/events";
    //Get the events created by the user
    fetch(url, {
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
        this.events = data;
      });
  },

  methods: {
    //Function to handle the error of the image
    onError(event) {
      event.target.src = "/no-profile-pic.png";
    },
    //Function to logout page
    logout() {
      //Delete the token from the local storage and logs out off the system
      localStorage.removeItem("token");
      this.$root.logout();
      this.$router.push("/");
    },
    //Function to delete user profile
    deleteAccount() {
      fetch("http://puigmal.salle.url.edu/api/v2/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      //Delete the user from the local storage
      var userInSystem = [];
      userInSystem = JSON.parse(localStorage.getItem("logging"));
      for (var i = 0; i < userInSystem.length; i++) {
        if (userInSystem[i] == this.$root.$data.userEmail) {
          //Delete the user from the system
          userInSystem.splice(i, 1);
          break;
        }
      }
      localStorage.removeItem("logging");
      localStorage.setItem("logging", JSON.stringify(userInSystem));
      this.logout();
    },
    //Function to go to the modify profile page
    changeProfile() {
      this.$router.push("/modify-profile");
    },
    //Function to go to the modify event page
    goToModify(eventID) {
      this.$root.$data.eventID = eventID;
      this.$router.push("/modify-event");
    },
  },
};
</script>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px;
  align-items: center;
}

.image {
  width: 250px;
  height: 250px;
  object-fit: cover;
  padding: 10px;
  margin-top: auto;
  border-radius: 50%;
}
.lateral {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: nowrap;
}
.email {
  font-size: large;
}

.name {
  font-size: xx-large;
}

.buttons {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  color: #eee;
  align-self: center;
}

.button {
  padding: 15px 32px;
  font-style: italic;
  cursor: pointer;
}

.title-statics {
  font-size: 30px;
  margin-left: 50px;
}

.title-events {
  font-size: 30px;
  margin-left: 50px;
}
.events {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: baseline;
  flex-wrap: wrap;
  column-gap: 50px;
  row-gap: 20px;
  margin: auto;
}

.text {
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: 200;
  margin-top: 10px;
  height: 40px;
}

table,
tr,
th,
td {
  border-style: solid;
  border-color: #8b06d3;
  border-collapse: collapse;
  border-width: 3px;
  text-align: center;
  padding: 3px;
  /*width: 800px;*/
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  align-content: center;
  width: fit-content;
}

td:hover {
  background-color: #5c0c51;
}

.list {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  column-gap: 50px;
  row-gap: 20px;
  margin: auto;
  padding: 0%;
  margin-bottom: 5%;
}

table {
 margin: 10px;
}

li {
  list-style-type: none;
}


@media only screen and (min-width: 410px) {
  .table {
    width: 90%;
    margin: 10px auto;
  }

  .info {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
  }
}
</style>
