<template>
  <header>
    <!--Header of the page-->
    <MainHeader></MainHeader>
  </header>
  <main>
    <form onsubmit="return false">
      <h1>MODIFY EVENT</h1>
      <div>
        <label><b>Change photo: </b></label>
        <input type="text" v-model="image" />
        <img :src="image" alt="Penjar una foto" width="200" />
      </div>
      <!--Modify the event's info-->
      <div class="inputs">
        <input id="name" name="from_input_name" type="text" v-model="name" />

        <input
          id="location"
          name="from_input_location"
          type="text"
          v-model="location"
        />
        <input
          id="description"
          name="from_input_description"
          type="text"
          v-model="description"
        />
        <div class="date">
          <label for="start">Start: </label>
          <input
            id="start"
            name="from_input_start"
            type="datetime-local"
            v-model="start"
          />
          <label for="end">End: </label>
          <input
            id="end"
            name="from_input_end"
            type="datetime-local"
            v-model="end"
          />
        </div>
        <div class="extra">
          <input id="type" name="from_input_type" type="text" v-model="type" />
          <input id="num" name="from_input_num" type="number" v-model="num" />
        </div>
        <div class="buttons">
          <button class="submit" v-on:click="modifyEvent">MODIFY</button>
          <button v-on:click="deleteEvent">DELETE</button>
          <button v-on:click="cancel">CANCEL</button>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";

export default {
  name: "modify-event",
  components: {
    MainHeader,
  },
  data() {
    return {
      image: "",
      name: "",
      location: "",
      description: "",
      start: "",
      end: "",
      type: "",
      num: "",
      prevstart: "",
      prevend: "",
    };
  },
  mounted() {
    //Get the event's information
    fetch(`http://puigmal.salle.url.edu/api/v2/events/${this.$root.$data.eventID}`, {
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
          return Promise.reject(response);
        }
      })
      .then((data) => {
        console.log(data);
        this.image = data[0].image;
        this.name = data[0].name;
        this.location = data[0].location;
        this.description = data[0].description;
        this.prevstart = data[0].eventStart_date;
        this.prevend = data[0].eventEnd_date;
        this.type = data[0].type;
        this.num = data[0].n_participators;
      });
  },
  methods: {
    //Update the event's information
    modifyEvent() {
      if (this.start == "") {
        this.start = this.prevstart;
      }
      if (this.end == "") {
        this.end = this.prevend;
      }

      let id = this.$root.$data.eventID;
      fetch(`http://puigmal.salle.url.edu/api/v2/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$root.$data.token,
        },
        body: JSON.stringify({
          name: this.name,
          location: this.location,
          image: this.image,
          description: this.description,
          eventStart_date: this.start,
          eventEnd_date: this.end,
          n_participators: this.num,
          type: this.type,
          latitude: "8",
          longitude: "8",
        }),
      }).then((response) => {
        if (response.ok) {
          console.log("ok");
        } else {
          console.log("error");
        }
      });
    },
    //Delete the event
    deleteEvent() {
      let id = this.$root.$data.eventID;
      fetch(`http://puigmal.salle.url.edu/api/v2/events/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("ok");
            this.$router.push("/my-profile");
          } else {
            alert.error("Error");
          }
        });
    },
    cancel() {
      this.$router.push("/my-profile");
    },
  },
};
</script>

<style scoped>
/* --- CS ---*/

main {
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: #15172b;
  justify-content: center;
  margin-top: 30px;
  border-radius: 20px;
  height: fit-content;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  width: 90%;
  margin: 10%;
}

input {
  font-size: 20px;
  font-size: 80%;
  margin-bottom: 10px;
}

.inputs {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  width: 100%;
  padding: 10px;
  padding-top: 20px;
  margin-top: 10px;
  background-color: #8b06d3;
  border-radius: 20px;
}

.extra {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}

img {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 180px;
  width: 250px;
}

h1 {
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 36px;
  margin: 20px 0px;
}

label {
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}

button {
  background-color: #ffffff;
  color: black;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  font-size: 15px;
  margin: 20px 10px;
}

@media only screen and (min-width: 410px) {
  form {
    width: 700px;
    margin: 5%;
  }
  .date {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
  }

  .extra {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    width: 100%;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  img{
    height: 266px;
    width: 400px;
  }
}
</style>
