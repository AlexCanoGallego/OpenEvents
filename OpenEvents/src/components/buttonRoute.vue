<template>
  <button @click="goTo(Route)" type="button">{{ Text }}</button>
</template>

<script>
export default {
  name: "RouterButton",
  props: {
    Route: String,
    Text: String,
  },
  methods: {
    goTo(page) {
      this.$router.push(page);
    },
  },
};
</script>

<style scoped></style>
