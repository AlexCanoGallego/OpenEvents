<template>
  <article class="chat-box" id="chat">
    <div class="title_chat">
      <img class="image" :src="Picture" @error="onError" />

      <h3 class="name">{{ Name }}</h3>

      <button class="close-butt" v-on:click="this.$emit('close')">Close</button>
    </div>
    <div class="messages_viewport">
      <div v-for="message in Messages" v-bind:key="message.id">
        <label :class="getMsgSide(message.user_id_send)">{{
          message.content
        }}</label>
      </div>
    </div>
    <div class="user_input">
      <input id="msg" class="input" />
      <button @click="sendMsg" class="send-button">Send</button>
    </div>
  </article>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
        Name: "",                                                   // Name of the friend  
        Surname: "",                                                // Name and surname of the friend       
        Picture: "",                                                // Profile picture of the friend
        Messages: [],                                               // Array of messages from the chat
        rMsg: "right-msg",                                          // Class for messages from the user (right side of the chat)                 
        lMsg: "left-msg",                                           // Class for messages from the friend (left side of the chat)
        friendId: 0,                                                // Id of the friend with whom we are chatting         
        LastMsgLength: 0                                            // Used to determine if new messages have been added to the chat                                  
    }
  },
  beforeUnmount() {
      window.removeEventListener("resize", this.myEventHandler);    // Remove resize listener when the component is destroyed
      this.hideChat();                                              // Hide the chat when the component is destroyed                      
    },
  mounted() {
      this.updateWindowFlag();                                      // Check if the window is mobile or not, and set the flag accordingly
      window.addEventListener("resize", this.myEventHandler);       // Add event listener to update the chat size if needed
      this.$data.polingChat = false;                                // Flag that indicates if we are polling messages from the chat
    },
    updated() {
      console.log("updated");
      // If there are more than 8 messages and new messages have been added to the chat
      if (this.$data.Messages.length > 8 && this.$data.LastMsgLength != this.$data.Messages.length) { 
        this.$data.LastMsgLength = this.$data.Messages.length;      // Update the last message length  
        this.scrollToMsg(this.$data.Messages.length-1);             // Scroll to the last message    
      }
    },
  methods: {
    /**
     * Sets the chat data
     * @param Name Friend name
     * @param Surname Friend surname
     * @param Picture Firned profile picture
     */
    setChat(Name, Surname, Picture) {                                      
      this.$data.Name = Name;
      this.$data.Surname = Surname;
      this.$data.Picture = Picture;
    },
    /**
     * Updates the messages of the chat with the messages from the friend with the given Id
     * @param Id Id of the friend with whom we are chatting
     */
    updateChat(Id) {                                                // Updates the chat with the messages from the friend with the given Id
      this.$data.friendId = Id;
      fetch(`http://puigmal.salle.url.edu/api/v2/messages/${Id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log("error");
          }
        })
        .then((data) => {
          this.$data.Messages = data;
        });
    },
    /**
     * Used to determinate the side of the given message by the sender and receiver of the msg.
     * @param Id User id of the sender of the message
     */
    getMsgSide(Id) {        // Determnines if the message is from the user or the friend and returns the corresponding class
      if (Id == this.$root.$data.userID) {
        return this.$data.rMsg;
      } else {
        return this.$data.lMsg;
      }
    },
    /**
     * Sends a message to the opened chat friend
     */
    sendMsg() {             // Sends a message to the opened chat friend   
      let msg = document.getElementById("msg").value;
      fetch(`http://puigmal.salle.url.edu/api/v2/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          content: msg,
          user_id_send: this.$root.$data.userID,
          user_id_recived: this.friendId,
        }),
      })
        .then((response) => {
          if (response.ok) {
            document.getElementById("msg").value = "";                            // Clear usr input if send was successful
            return response.json();
          } else {
            console.log("error");
          }
        })
        .then((data) => {
          console.log(data);
          this.$data.Messages.push(data);
        });
    },
    /**
     * Called when profile image fails to load. Sets the default profile picture.
     */
    onError(event) {                                                              // Handles profile picture error                    
      event.target.src = "/no-profile-pic.png";
    },
    /**
     * Shows the chat component. To be called by parent classes.
     */
    showChat(){                                                                   // Shows the chat
        // Start poling the chat if we are not already doing it
        if (this.$data.polingChat == false) {
          this.$data.polingChat = true;
          this.$data.poling = setInterval(this.refreshChat, 1000);
        }
        this.myEventHandler();                                                    // Update the chat size if needed
    },
    /**
     * Hides the chat component. To be called by parent classes.
     */
    hideChat(){
        // Stop poling the chat if we are currently doing it
        if (this.$data.polingChat == true) {
            this.$data.polingChat = false;
            clearInterval(this.$data.poling);
        }
        document.getElementById("chat").style.width = "0px";                      // Hide the chat
    },
    /**
     * Poling function called by setInterval in order to pol the chat messages.
     */
    refreshChat(){
        this.updateChat(this.$data.friendId);                                     // Called every second. We do it this way in order make sure friendId is updated
    },
    /**
     * Determines if the chat is mobile or web.
     */
    updateWindowFlag() {
        // Check if the window is mobile or not, and set the flag accordingly
        if (window.innerWidth < 410) {
          this.$data.WebNotMobile = true;
        }else {
          this.$data.WebNotMobile = false;
        }
    },
    /**
     * Handles the window resize event in order to dynamically change the chat size.
     */
    myEventHandler() {                                                            // Checks the screen and updates the chat size if needed
        this.updateWindowFlag();
        if (window.innerWidth < 665 && this.$data.polingChat == true) {           // Mobile size
          document.getElementById("chat").style.width = "340px";
        } else if (window.innerHeight >= 665 && this.$data.polingChat == true)    // Desktop size
        {
          document.getElementById("chat").style.width = "450px";
        } 
    },
    /**
     * Scrolls the messages viewport to the given msg id.
     * @param lastMsgId Id of the msg that we want to scroll
     */
    scrollToMsg(lastMsgId) {                                                          // Scrolls to the bottom of the chat if needed   
      const el = this.$el.querySelector(`#num-${lastMsgId}`);
        console.log(el);
        if (el) {
          el.scrollIntoView();
        }
      }
    }
  }
</script>

<style scoped>
.chat-box {
  display: block;
  height: fit-content;
  max-height: 600px;
  width: 0px;
  position: absolute;
  top: 150px;
  left: 0;
  background-color: #15172b;
  overflow: auto;
  transition: 1s;
}
.title_chat {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  flex-wrap: wrap;
  max-height: 140px;
  background-color: #607092;
}
.messages_viewport {
  display: block;
  flex-direction: column;
  background-color: #15172b;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: auto;
  border-width: 5px;
  height: 350px;
  overflow-y: auto;
  scrollbar-color: green;
}
.user_input {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-top: auto;
  justify-content: right;
  background-color: #607092;
  max-height: 200px;
  min-height: 50px;
}
.input {
  resize: none;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  padding-left: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: medium;
  height: 40%;
  border-radius: 7px;
  color: #eee;
  background-color: #303245;
  border-color: #eee;
}
.send-button {
  margin-right: 10px;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: #8b06d3;
  border-style: hidden;
  color: #eee;
}
.name {
  margin-right: auto;
  margin-left: 20px;
}
.image {
  display: flex;
  border-radius: 50%;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  min-width: 50px;
  min-height: 50px;
  max-width: 100px;
  max-height: 100px;
}
.icon {
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
}

.close-butt {
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: auto;
  border: hidden;
  background-color: #8b06d3;
  color: #eee;
}

.right-msg {
  margin-left: auto;
}

.left-msg {
  margin-right: auto;
  background-color: grey;
}

label {
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  border-radius: 15px;
  padding: 8px 12px;
  margin: 8px 12px;
  background-color: #8b06d3;
}

</style>
