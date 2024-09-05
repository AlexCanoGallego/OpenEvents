<template>
  <!--Timeline element inside a section-->
  <section class="item" v-on:click="this.$emit('goTo', this.$props.ID)">
    <h4>{{ date }}</h4>
    <div class="div">
      <img :src="image" alt="Penjar una foto" @error="onError" />
      <!--Show timeline info-->
      <div class="info">
        <div class="parag">
          <p><label>Name: </label>{{ Name }}</p>
          <p>
            <label>Num participants: </label><b>{{ num }}</b>
          </p>
        </div>
        <p><label>Location: </label>{{ Location }}</p>
        <p><label>Description: </label>{{ Description }}</p>
        <div class="parag">
          <p><label>Type event: </label>{{ Type }}</p>
          <p>
            <label>State: </label><b>{{ state }}</b>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TimelineComponent",
  props: {  //Timeline properties
    time: String,
    Name: String,
    Location: String,
    Type: String,
    Description: String,
    num: Number,
    Image: String,
    ID: Number,
  },
  data() {
    return {
      state: "unknown",
      date: "",
      image: "",
    };
  },

  methodes: {
    //If the image is not found, it shows a default image
    onError(event) {
      event.target.src = "/party-51.jpg";
    },
  },
  mounted() {
    if(this.$props.Image == null) this.image = "/party-51.jpg";
    else this.image = this.$props.Image;
    
    if(this.$props.time == null) {
      this.state = "unknown";
      this.date = "unknown";
      return;
    }
    
    this.date = this.$props.time.split("T")[0];

    if (this.$props.time < new Date().getTime()) {
      this.state = "finished";
    } else {
      this.state = "pending";
    }
  },
};
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  width: 400px;     /*880*/
  height: 100%;
  background-color: #9c2ada;
  border-radius: 20px;
  margin-bottom: 20px;
}

.div {
  display: flex;
  flex-direction: row;
  width: 400px;     /*880*/
  height: fit-content;
  align-items: center;
  background-color: #15172b; 
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

img {
  width: 125px;     /*250*/
  height: 93px;    /*186*/
  margin: 1.5em;
  object-fit: cover;
  border-radius: 5%;
}

.info {
  align-items: left;
  font-size: 16px;
  width: 100%;
  margin-right: 20px;
}

.parag {
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: space-between;
  width: 100%;
  column-gap: normal;
}

p {
  font-size: 16px;
  text-align: justify;
  margin-inline-start: 30px;
}

h4 {
  align-items: left;
  font-size: 16px;
  margin-right: auto;
  margin-left: 20px;
  margin-bottom: 10px;
}

@media only screen and (min-width: 410px){
    .div{
        width: 880px;
    }

    .item{
        width: 880px;
    }

}

</style>
