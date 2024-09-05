<template>
  <header>
    <!--Header of the page-->
    <MainHeader></MainHeader>
  </header>
  <main>
    <main class="m2">
      <h1>CREATE EVENTS</h1>
      <article>
        <p><b> ADD A PHOTO</b></p>
        <input id="image" type="text" v-model="image" placeholder="https://"/>
        <img src="/party-51.jpg" alt="Penjar una foto" width="200" />
      </article>
      <!--Put the event's info-->
      <div>
        <form>
          <input
            id="name"
            name="from_input_name"
            type="text"
            placeholder="NAME: "
          />
          <input
            id="location"
            name="from_input_location"
            type="text"
            placeholder="LOCATION: "
          />
          <input
            id="description"
            name="from_input_description"
            type="text"
            placeholder="DESCRIPTION: "
          />
          <section>
            <input
              id="start"
              name="from_input_start"
              type="datetime-local"
              placeholder="START: DD-MM-YYYY"
            />
            <input
              id="end"
              name="from_input_end"
              type="datetime-local"
              placeholder="END: DD-MM-YYYY"
            />
          </section> 
            <input
              id="type"
              name="from_input_type"
              type="text"
              placeholder="TYPE"
            />
            <input
              id="num"
              name="from_input_num"
              type="number"
              placeholder="num_ Xº"
            />
          <section>
            <Router
              class="submit"
              Text="PUSH"
              Route="/myschedule"
              v-on:click="createEvent"
            ></Router>
            <Router class="submit" Text="CANCEL" Route="/myschedule"></Router>
          </section>
        </form>
      </div>
    </main>
  </main>
</template>

<script>
import Router from "../components/buttonRoute.vue";
import MainHeader from "../components/MainHeader.vue";

export default {
  name: "createEvent",
  components: {
    MainHeader,
    Router,
  },
  methods: {
    //Post the events information
    createEvent() {
      fetch("http://puigmal.salle.url.edu/api/v2/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: document.getElementById("name").value,
          location: document.getElementById("location").value,
          image: document.getElementById("image").value,
          description: document.getElementById("description").value,
          eventStart_date: document.getElementById("start").value,
          eventEnd_date: document.getElementById("end").value,
          n_participators: document.getElementById("num").value,
          type: document.getElementById("type").value,
          latitude: "8",
          longitude: "8",
        }),
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
        }
      });
    },
  },
};
</script>

<style scoped>
/* --- CS ---*/

.m2 {
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: #15172b;
  justify-content: center;
  margin-top: 30px;
  border-radius: 20px;
  height: fit-content;
}

article {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

form {
  background-color: #8b06d3;
  border-radius: 20px;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  height: 250px;
  padding: 20px;
  width: 400px;
  margin-top: 50px;
}

section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

input {
  font-size: 20px;
}

img {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 133px;
  width: 200px;
  margin-top: 10px;
}

h1 {
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
  margin-left: 1px;
}

p {
  font-size: 16px;
  font-weight: 600;
  margin-right: 600px;
}

.submit {
  background-color: #ffffff;
  color: black;
  width: 100px;
  height: 40px;
  font-size: 15px;
  margin-top: 15px;
}

@media only screen and (min-width: 410px){
    form{
        width: 700px;
    }
    img{
        height: 266px;
        width: 400px;
    }
}

</style>
