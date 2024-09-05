<template>
  <header>
    <!--Header of the page-->
    <MainHeader></MainHeader>
  </header>
  <body>
    <main>
      <article>
        <h2>EVENT</h2>
        <img
          class="image"
          :src="Image"
          alt="No event foto"
          @error="onError"
          width="200"
        />
      </article>
      <!--Show event's info-->
      <div>
        <p>{{ Name }}</p>
        <p>{{ Location }}</p>
        <p>{{ Description }}</p>
        <section>
          <p>{{ Start }}</p>
          <p>{{ End }}</p>
        </section>
        <section>
          <p>{{ Type }}</p>
          <p>{{ Num }}</p>
        </section>
        <section>
          <button
            class="submit"
            v-on:click="pushJoin"
            v-bind:style="{ backgroundColor: buttonBackground }"
          >
            {{ joinText }}
          </button>
        </section>
        <section class="comment">
          <!--LOOP to show all comments-->
          <li v-for="comment in comments" v-bind:key="comment.id">
            <Comments
              class="Comments"
              :lastName="comment.last_name"
              :Comment="comment.comentary"
              :Puntuation="comment.puntuation"
              :nom="comment.name"
            >
            </Comments>
          </li>
        </section>
      </div>
    </main>
  </body>
</template>

<script>
import Comments from "../components/Comments.vue";
import Router from "../components/buttonRoute.vue";
import MainHeader from "../components/MainHeader.vue";

export default {
  name: "join",
  components: {
    Comments,
    MainHeader,
    Router,
  },
  data() {
    return {
      ID: 0,
      Name: String,
      Location: String,
      Type: String,
      Description: String,
      Num: Number,
      Start: String,
      End: String,
      Image: String,
      joinText: "JOIN",
      comments: [],
      buttonBackground: "green",
    };
  },
  methods: {
    //Get the information of the event
    createJoin() {
      let id = this.$root.$data.eventID;
      fetch(`http://puigmal.salle.url.edu/api/v2/events/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.Name = data[0].name;
          this.Description = data[0].description;
          this.Location = data[0].location;
          this.Num = data[0].n_participators;
          this.Image = data[0].image;
          this.Start = data[0].eventStart_date;
          this.End = data[0].eventEnd_date;
          this.Type = data[0].type;
          this.ID = data[0].id;
        });
      //Get the comments that users have put of in the event
      fetch(`http://puigmal.salle.url.edu/api/v2/events/${id}/assistances`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.comments = data;
        });

      const path =
        "http://puigmal.salle.url.edu/api/v2/events/" +
        id +
        "/assistances/" +
        this.$root.$data.userID;
      //Get the users assistance to see if the users assisted
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
          }
        })
        .then((data) => {
          console.log(data);
          if (data.length != 0) {
            this.joinText = "JOINED";
            this.buttonBackground = "red";
          }
        });
    },
    //Post the user's assistance in the event
    pushJoin() {
      if (this.joinText == "JOIN") {
        console.log("join");
        let idE = this.$root.$data.eventID;
        var idU = this.$root.$data.userID;
        fetch(`http://puigmal.salle.url.edu/api/v2/assistances/${idU}/${idE}`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((response) => {
          if (response.ok) {
            console.log("ok");
            this.joinText = "JOINED";
            this.buttonBackground = "red";
          } else {
            console.log("error");
          }
        });
      } else {
        //Delete join
        fetch(
          "http://puigmal.salle.url.edu/api/v2/events/" +
            this.$root.$data.eventID +
            "/assistances",
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        ).then((response) => {
          if (response.ok) {
            console.log("ok");
            this.joinText = "JOIN";
            this.buttonBackground = "green";
          } else {
            console.log("error");
          }
        });
      }
    },
    //If the image is not found, it shows a default image
    onError(event) {
      event.target.src = "/party-51.jpg";
    },
  },
  beforeMount() {
    this.createJoin();
  },
};
</script>

<style scoped>
/* --- CSS --- */

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

article {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

div {
  background-color: #8b06d3;
  border-radius: 20px;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  height: fit-content;
  padding: 20px;
  width: 350px; 
  margin-top: 50px;
}

section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

img {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 133px; 
  width: 200px;
  margin-top: 30px;
}

p {
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

b {
  margin-right: 600px;
}

.comment {
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

button {
  background-color: #ffffff;
  color: black;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  font-size: 15px;
  margin: 10px 20px;
}

li {
  list-style: none;
}

@media only screen and (min-width: 410px){
    div{
        width: 700px;
    }
    img{
        height: 266px;
        width: 400px;
    }
}

</style>
