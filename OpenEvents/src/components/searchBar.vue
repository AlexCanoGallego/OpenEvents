<template>
  <form class="searchbar" onsubmit="return false">
    <input type="text" id="word" placeholder="Search" class="bar" v-model="word"/>
    <button type="submit" class="button" v-on:click="saveAnswer">Submit</button>
  </form>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      word: "",
    };
  },
  methods: {
    saveAnswer() {
      this.$emit("search", this.word);
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 30px;
  margin: 10px;
  margin-top: 20px;
  height: 50px;
}
.bar {
  padding: 6px;
  border: none;
  font-size: 16px;
  padding: 20px;
  width: 55%;
}
.button {
  margin-top: 0px;
  height: 50px;
  padding: 0px 20px;
  font-size: medium;
}

@media only screen and (min-width: 410px) {
  .bar {
    width: 400px;
  }
}
</style>
