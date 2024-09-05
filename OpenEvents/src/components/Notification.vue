<template>
  <article class="notif-box">
    <img class="profile-image" :src="Image" />
    <h3>{{ Origin }}</h3>
    <label>{{ Message }}</label>
    <div class="butt">
      <img
        v-on:click="this.$emit('accept', Id)"
        class="icon"
        src="public/speech-bubble.png"
        width="50"
      />
      <img
        v-on:click="this.$emit('decline', Id)"
        class="icon"
        src="public/multiply.png"
        width="50"
      />
    </div>
  </article>
</template>

<script>
export default {
  name: "NotificationComponent",
  props: {
    Origin: String,
    Message: String,
    Image: String,
    Id: Number,
  },
};
</script>

<style scoped>
.notif-box {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 20px;
  align-items: center;
  flex-wrap: wrap;
  border: none;
  width: 650px;
  background-color: #15172b;
  border-radius: 20px;
}

h3 {
  margin-left: 15px;
  margin-right: 25px;
}

.profile-image {
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
}

.butt {
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: auto;
}

.icon {
  margin-left: 5px;
  margin-right: 5px;
}

@media only screen and (max-width: 410px) {
  .notif-box {
    width: 90%;
  }

  .profile-image {
    width: 50px;
    height: 50px;
    margin-right: 2px;
  }

  h3 {
    font-size: x-small;
    inline-size: 50px;
    text-align: center;
  }

  label {
    font-size: x-small;
    inline-size: 100px;
    margin-right: 10px;
  }

  .butt {
    margin: 0px;
  }
  .icon {
    margin-left: 0px;
    width: 25px;
    height: 25px;
  }
}
</style>
