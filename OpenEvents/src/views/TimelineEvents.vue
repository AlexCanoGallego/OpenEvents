<template>
  <header>
    <!--Header of the page-->
    <MainHeader></MainHeader>
  </header>
  <main>
    <section>
      <Router class="submit" Text="New" Route="/createEvent"></Router>
    </section>
    <!--LOOP to show all events-->
    <div id="timeline-div">
      <li v-for="timeline in timelines" v-bind:key="timeline.id">
        <TimelineComponent
          @go-to="goTo"
          :ID="timeline.id"
          :time="timeline.eventStart_date"
          :Image="timeline.image"
          :Name="timeline.name"
          :Location="timeline.location"
          :Type="timeline.type"
          :Description="timeline.description"
          :num="timeline.n_participators"
        >
        </TimelineComponent>
      </li>
    </div>
  </main>
</template>

<script>
import TimelineComponent from "../components/Timeline.vue";
import Router from "../components/buttonRoute.vue";
import MainHeader from "../components/MainHeader.vue";
import SearchBar from "../components/searchBar.vue";
import EventList from "../components/EventList.vue";

export default {
  name: "Timeline",
  components: {
    TimelineComponent,
    MainHeader,
    Router,
    SearchBar,
    EventList,
  },
  data() {
    return {
      timelines: [],
    };
  },
  //get all events that users assisted.
  mounted() {
    var id = this.$root.$data.userID;
    console.log(this.$root.$data.userID);
    fetch(`http://puigmal.salle.url.edu/api/v2/users/${id}/assistances`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$root.$data.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.timelines = data;
      });
  },
  methods: {
    //Function to go to comment page
    goTo(id) {
      this.$root.$data.eventID = id;
      this.$router.push("/comment");
    },
  },
};
</script>

<style scoped>


/* --- CSS --- */

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 36px;
}

section {
  align-items: center;
  display: flex;
  flex-direction: row;
}

.submit {
  height: 50px;
  padding: 0px 20px;
  font-size: medium;
  margin-top: 20px;
}

#timeline-div {
    display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
}

li {
  list-style-type: none;
}


@media only screen and (min-width: 410px){
    section{
        margin-inline-start: 20%;
    }
}
</style>
