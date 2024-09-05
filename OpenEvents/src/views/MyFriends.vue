<template>
  <header>
    <MainHeader></MainHeader>
  </header>
  <aside>
    <SearchBar id="search" class="search" v-on:search="updateFriendsList"></SearchBar>
  </aside>
  <div class="f-list">
  <div class="friend-list" v-for="friend in friends" v-bind:key="friend.id">
    <Friend
      v-on:viewProfile="firendProfile"
      v-on:open="openChat"
      :Name="friend.name"
      :Surname="friend.last_name"
      :Picture="friend.image"
      :Id="friend.id"
    >
    </Friend>
  </div>
</div>
  <div>
    <Chat v-on:close="closeChat" id="chat" ref="show"></Chat>
  </div>
</template>

<script>
import Friend from "../components/Friend.vue";
import MainHeader from "../components/MainHeader.vue";
import SearchBar from "../components/searchBar.vue";
import Chat from "../components/Chat.vue";

export default {
  name: "MyFriends",
  components: {
    Friend,
    MainHeader,
    SearchBar,
    Chat,
  },
  data() {
    return {
      friends: [],
    };
  },
  mounted() {
    this.updateFriendsList("");
  },
  methods: {
    // Chat methods
    openChat(Name, Surname, Picture, Id) {
      this.$refs.show.setChat(Name, Surname, Picture);  // Set the chat arguments
      this.$refs.show.updateChat(Id);
      this.$refs.show.showChat();                       // Show the chat
    },
    closeChat() {
      this.$refs.show.hideChat();                       // Hide the chat
    },
    // Switch views
    firendProfile(id) {
      this.$root.$data.usrProfile = id;                 // Save friend id to singleton
      this.$router.push("/usr-profile");                // Go to friend profile
    },
    updateFriendsList(filter) {
      fetch("http://puigmal.salle.url.edu/api/v2/friends  ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Correctly fetched friends");
          return response.json();
        } else {
          console.log("Error fetching friends");
        }
      })
      .then((data) => {
        var aux = data;                               // Save the data to a auxiliar variable
        this.friends = aux.filter((item1) => {        // Filter the data, consider all string fields (name, last_name, email)
            return item1.name.toLowerCase().includes(filter.toLowerCase())
            || item1.last_name.toLowerCase().includes(filter.toLowerCase())
            || item1.email.toLowerCase().includes(filter.toLowerCase());
          });
      });
    }
  },
};
</script>

<style scoped>

.f-list {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: baseline;
  flex-wrap: wrap;
  column-gap: 50;
  margin-top: 60px;
  row-gap: 20px;
}
</style>
