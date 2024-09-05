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
          <!--Enter comment-->
          <input
            id="comentary"
            name="from_input_comment"
            type="text"
            placeholder="COMMENT: "
          />
          <!--Enter puntuation-->
          <input
            id="puntuation"
            name="from_input_puntuation"
            type="number"
            placeholder="PUNTUATION: "
          />
        </section>
        <section>
          <!--Push the comment-->
          <Router
            class="submit"
            Text="COMMENT"
            Route="/events"
            v-on:click="pushComment"
          ></Router>
          <!--Delete the assistance-->
          <Router
            class="submit"
            Text="DELETE"
            Route="/events"
            v-on:click="delete"
          ></Router>
          <!--Return back-->
          <Router class="submit" Text="CANCEL" Route="/events"></Router>
        </section>
        <section class="comment">
          <!--LOOP to show all comments-->
          <li v-for="comments in comments">
            <Comments
              class="Comments"
              :lastName="comments.last_name"
              :Comment="comments.comentary"
              :Puntuation="comments.puntuation"
              :nom="comments.name"
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
  name: "comment",
  components: {
    Comments,
    MainHeader,
    Router,
  },
  data() {
    return {
      Name: String,
      Location: String,
      Type: String,
      Description: String,
      Num: Number,
      Start: String,
      End: String,
      Image: String,
      comments: [],
    };
  },
  methods: {
    //Get the information of the event
    create() {
      let id = this.$root.$data.eventID;
      console.log(id);
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
    },
    //Put the user's comment as well as puntuation
    pushComment() {
      let id = this.$root.$data.eventID;
      fetch(`http://puigmal.salle.url.edu/api/v2/events/${id}/assistances`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          comentary: document.getElementById("comentary").value,
          puntuation: document.getElementById("puntuation").value,
        }),
      }).then((response) => {
        if (response.ok) {
          console.log("ok");
          return response.json();
        } else {
          console.log("error");
        }
      });
    },
    //GDelete the user that assist in the event
    delete() {
      let id = this.$root.$data.eventID;
      fetch(`http://puigmal.salle.url.edu/api/v2/events/${id}/assistances`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("error");
        }
      });
    },
    //If the image is not found, it shows a default image
    onError(event) {
      event.target.src = "/party-51.jpg";
    },
  },
  beforeMount() {
    this.create();
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

input {
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: 110px;
}

p {
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

.comment {
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

b {
  margin-right: 600px;
}

button {
  background-color: #ffffff;
  color: black;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  font-size: 15px;
  margin: 10px ;
}

@media only screen and (min-width: 410px){
    div{
        width: 700px;
        padding: 10px;
    }
    img{
        height: 266px;
        width: 400px;
    }
    input{
        width: 200px;
    }
}

</style>
