<template>
  <div class="user-box" v-on:click="goToProfile">
    <img
      id="profileImage"
      :src="Image"
      alt="User profile image"
      @error="onError"
    />
    <h3>{{ Name }} {{ Surname }}</h3>
  </div>
</template>

<script>
export default {
  name: "UserList",
  props: {
    ID: Number,
    Name: String,
    Surname: String,
    Image: String,
  },
  methods: {
    goToProfile() {
      this.$emit("goToProfile", this.$props.ID);
    },
    onError(event) {
      event.target.src = "/no-profile-pic.png";
    },
  },
};
</script>

<style scoped>
.user-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  min-width: 350px;
  max-width: 350px;
  height: 150px;
  background-color: #15172b;
  border-radius: 5%;
}

h3 {
  margin-left: 20px;
  margin-right: 20px;
}

#profileImage {
  width: 100px;
  height: 100px;
  margin: 10px;
  object-fit: cover;
  border-radius: 50%;
}

@media only screen and (max-width: 410px) {
  .user-box {
    width: 90%;
  }
}
</style>
