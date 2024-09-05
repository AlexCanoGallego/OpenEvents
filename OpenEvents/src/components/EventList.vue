<template>
  <!--Event element inside a div-->
  <div class="event-box" v-on:click="goToEvent"> <!--When clicked, it emits the event ID to the parent component-->
    <img class="image" :src="image" alt="No event foto" @error="onError" />
    <!--Show event info: name and date-->
    <div class="info_event">
      <h4 id="name">{{ Name }}</h4>
      <h4>{{ date }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventList",
  props: { //Event properties
    ID: Number,
    Name: String,
    Hour: String,
    Image: String,
  },
  data() {
    return {
      date: "",
      image: "",
    };
  },
  //When the component is mounted, it gets the date from the Hour property
  mounted() {
    if(this.$props.Image == null) this.image = "/party-51.jpg";
    else this.image = this.$props.Image;

    if(this.$props.Hour == null) {
      this.date = "unknown";
      return;
    }

    this.date = this.$props.Hour.split("T")[0];

  },
  methods: {
    //If the image is not found, it shows a default image
    onError(event) {
      event.target.src = "/party-51.jpg";
    },
    //Emit the event ID to the parent component
    goToEvent() {
      this.$emit("goToEvent", this.$props.ID);
    },
  },
};

</script>

<style scoped>

/*Event box style with flex row display*/
.event-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 350px;
  height: 180px;
  background-color: #15172b;
  border-radius: 5%;
  overflow-x: hidden;
}

.info_event {
  display: flex;
  flex-direction: column;
  padding-left: 15px;
}
.image {
  width: 150px;
  height: 100px;
  margin: 10px;
  margin-left: 20px;
  object-fit: cover;
  border-radius: 5%;
}

h4 {
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
