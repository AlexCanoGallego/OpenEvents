<template>
  <article class="friend-box">
    <img
      v-on:click="this.$emit('viewProfile', Id)"
      class="image"
      :src="Picture"
      width="100"
      @error="onError"
    />

    <h3>{{ Name }} {{ Surname }}</h3>

    <img
      v-on:click="this.$emit('open', Name, Surname, Picture, Id)"
      class="icon"
      src="/speech-bubble.png"
      width="50"
    />
  </article>
</template>

<script>
export default {
  name: "FriendComponent",
  props: {
    Name: String,
    Surname: String,
    Picture: String,
    Id: Number,
  },
  methods: {
    onError(event) {
      event.target.src = "/no-profile-pic.png";
    },
  },
};
</script>

<style scoped>
.friend-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  width: 380px;
  height: 140px;
  background-color: #15172b;
  border-radius: 5%;
}

h3 {
  margin-right: auto;
}

.image {
  margin-left: 15px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 20px;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  object-fit: cover;
}

.icon {
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
}

@media only screen and (max-width: 410px) {
  .friend-box {
    width: 90%;
  }
}


</style>
