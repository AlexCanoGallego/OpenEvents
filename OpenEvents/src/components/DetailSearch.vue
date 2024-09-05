<template>
  <div>
    <section id="filter-bar">
    <label @click="closeFilter()" class="closeButton">Close</label>
    <h2>SEARCH BY...</h2>
    <form onsubmit="return false">
      <label class="rated"
        ><input class="check" type="checkbox" id="ratedCheck" v-model="rated"/>Best rated first</label
      ><br />
      <label for="nameSearch" >Name:</label><br />
      <input type="Text" id="nameSearch" size="50" v-model="name"/>
      <label>Date:</label><br />
      <input type="Date" id="dateSearch" size="50" v-model="date"/>
      <label>Location:</label><br />
      <input type="Text" id="locationSearch" size="50" v-model="location"/>
      <input type="submit" class="submitButton" value="Search" v-on:click="getForm"/> 
    </form>
  </section>
  <input
    type="button"
    value="Filter by"
    @click="openFilter()"
    class="openButton"
  />
  </div>
</template>

<script>
export default {
  name: "SideSearch",
  data() {
    return {
      rated: false,
      name : "",
      date : "",
      location : "",
    };
  },
  methods: {
    openFilter() {
      document.getElementById("filter-bar").style.display = "block";
      document.getElementById("filter-bar").style.width = "300px";
      document.getElementById("filter-bar").style.paddingTop = "40px";
      document.getElementById("filter-bar").style.paddingLeft = "20px";
      document.getElementById("filter-bar").style.paddingRight = "10px";
    },
    closeFilter() {
      document.getElementById("filter-bar").style.width = "0px";
      document.getElementById("filter-bar").style.display = "none";
    },

    getForm() {
      this.$emit("filterEvents", this.name, this.date, this.location, this.rated);
    }, 
    
  },
  emits: ["filterEvents"],
};
</script>

<style scoped>
section {
  height: 100%;
  width: 0;
  position: absolute;
  top: 150px;
  left: 0;
  background-color: #15172b;
  overflow: hidden;
  transition: 1s;
}

h2 {
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
}
label {
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  color: #eee;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

input {
  margin-bottom: 20px;
  margin-right: 10px;
  height: 35px;
}

form input[type="button"] {
  height: 50px;
  border-radius: 10px;
  padding: 15px 32px;
  border: none;
  margin: 20px;
}

.check {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin: 0px;
  margin-right: 10px;
}

.rated {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.openButton {
  margin: 10px;
  margin-top: 20px;
  height: 50px;
  padding: 0px 20px;
  border: none;
  background-color: #8b06d3;
  font-size: medium;
  font-family: Arial, Helvetica, sans-serif;
  color: #eee;
  text-align: center;
  text-decoration: none;
}

.closeButton {
  color: gray;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 10px;
}

.submitButton {
  padding: 0px 20px;
  font-size: medium;
  font-family: Arial, Helvetica, sans-serif;
  color: #eee;
  background-color: #8b06d3;
}
</style>
