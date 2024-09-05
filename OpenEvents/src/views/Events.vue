<template>
  <header>
    <!--Header of the page-->
    <MainHeader></MainHeader>
  </header>
  <main>
    <section>
      <detail-search @filter-events="filterEvents"></detail-search>
      <search-bar @search="searchWord" id="search" ></search-bar>
    </section>
    <ul class="list">
      <li v-for="event in events" v-bind:key="event.id">
        <Event
          @go-to-event="goToEvent"
          :ID="event.id"
          :Name="event.name"
          :Hour="event.date"
          :Image="event.image"
        ></Event>
      </li>
    </ul>
  </main>
</template>

<script>
import Event from "../components/EventList.vue";
import SearchBar from "../components/searchBar.vue";
import MainHeader from "../components/MainHeader.vue";
import DetailSearch from "../components/DetailSearch.vue";

export default {
  name: "ListEvents",
  components: {
    Event,
    SearchBar,
    MainHeader,
    DetailSearch,
  },
  data() {
    return {
      events: [],
    };
  },
  //get all events
  mounted() {

    fetch("http://puigmal.salle.url.edu/api/v2/events", {
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
    //Search events by name, search bar component
    searchWord(search) {
      console.log(search);
      const path =
        "http://puigmal.salle.url.edu/api/v2/events/search?keyword=" + search;
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
            return [];
          }
        })
        .then((data) => {
          this.events = data;
        });
    },

    getRatedItems(name, date, location){
      var rEvents = [];
      fetch("http://puigmal.salle.url.edu/api/v2/events/best", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$root.$data.token,
        },
      })
      .then((response) => {
        if (response.ok) return response.json();
        else return null;
      })
      .then((data) => {
        rEvents = data;
        var name = document.getElementById("nameSearch").value;
        var date = document.getElementById("dateSearch").value;
        var location = document.getElementById("locationSearch").value;
        if(name == "" && date == "" && location == ""){
          this.events = rEvents;
        }
        else{
          this.getItems(name, date, location, rEvents);
        }
      });
    },

    getItems(name, date, location, ratedEvents){
      var fevents = [];
      var path = "http://puigmal.salle.url.edu/api/v2/events/search?&";
      if (location != "") path += "location=" + location + "&";
      if (name != "") path += "keyword=" + name + "&";
      if (date != "") path += "date=" + date + "&";
      path = path.substring(0, path.length - 1);

      fetch(path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$root.$data.token,
        },
      })
      .then((response) => {
        if (response.ok) return response.json();
        else return [];
      })
      .then((data) => {
        fevents = data;
        if(ratedEvents == null){
          console.log("no rated");
          this.events = fevents;
        }else {
          this.events = ratedEvents.filter((item1) => {
            return fevents.find((item2) => item2.id === item1.id);
          });
        }
      });

    },

    filterEvents(name, date, location, rated) {
      if(rated)this.getRatedItems(name, date, location);
      else this.getItems(name, date, location, null);
    },

    

    //Function to go to event page
    goToEvent(id) {
      this.$root.$data.eventID = id;
      this.$router.push("/joinEvent");
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}

.list {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
  margin: auto;
  margin-top:20px;
  padding: 0%;
}


li {
  list-style: none;
}
</style>
