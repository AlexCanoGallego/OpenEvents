<template>
  <section class="info-box">
    <img class="image" :src="Photo" alt="User profile image" @error="onError" />
    <div class="lateral">
      <h2 class="title">Hi, i am ...</h2>
      <h3 class="nameuser">{{ Name }} {{ Surname }}</h3>
      <div class="buttons">
        <button v-on:click="this.$emit('submitUsr')" class="button">
          {{ TextButton }}
        </button>
        <button @click="openChat()" class="button">Send a message</button>
      </div>
    </div>
  </section>
  <Chat id="chat" v-on:close="closeChat" ref="show"></Chat>
</template>

<script>
import Chat from "../components/Chat.vue";

export default {
  name: "UserInfo",
  props: {
    Id: Number,
    Photo: String,
    Name: String,
    Surname: String,
    TextButton: String,
  },
  methods: {
    // Chat methods
    openChat() {
      this.$refs.show.setChat(this.Name, this.Surname, this.Photo); // Set the chat arguments
      this.$refs.show.updateChat(this.$root.$data.usrProfile); // Update the chat
      this.$refs.show.showChat(); // Show the chat
    },
    closeChat() {
      this.$refs.show.hideChat();
    },
    onError(event) {
      event.target.src = "/no-profile-pic.png";
    },
    hide()
    {
      document.getElementById("frdReq").style.display = "none";
    }
  },
  components: {
    Chat,
  },
};
</script>

<style>
.info-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px;
}

.image {
  width: 400px;
  height: 400px;
  object-fit: cover;
  padding: 10px;
  margin-top: auto;
  margin-right: 20px;
  border-radius: 50%;
}

.lateral {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: nowrap;
  padding-left: 40px;
}
.title {
  display: inline-block;
  font-size: 80px;
  font-style: italic;
  font-weight: bold;
  margin-bottom: 20px;
}

.nameuser {
  display: flex;
  flex-direction: row;
  font-size: 42px;
  font-weight: lighter;
}

.buttons {
  display: flex;
  flex-direction: row;
  column-gap: 50px;
}

button {
  padding: 15px 32px;
  text-align: center;
  font-style: italic;
  margin: 8px 4px;
  cursor: pointer;
}

@media only screen and (max-width: 410px) {
  .image {
    width: 200px;
    height: 200px;
    margin-right: 0%;
  }
  .title {
    margin-top: 10px;
    font-size: 55px;
  }
  .nameuser {
    font-size: 36px;
    margin-top: 10px;
  }

  .buttons {
    column-gap: 10px;
  }

  .lateral {
    padding-left: 10px;
  }
}
</style>
