<template>
  <header>
    <MainHeader></MainHeader>
  </header>
  <main>
    <form class="info" onsubmit="return false">
      <div class="change-image" onsubmit="return false">
        <img
          class="image"
          :src="image"
          alt="User profile image"
          v-bind:error="onError"
        />
        <label for="image">Select image</label>
        <input class="input" type="text" v-model="image" />
      </div>
      <div class="lateral">
        <input class="input" type="text" :placeholder="name" v-model="name" />
        <input
          class="input"
          type="text"
          :placeholder="surname"
          v-model="surname"
        />
        <input v-model="email" class="input" type="text" :placeholder="email" />
        <input
          v-model="password"
          class="input"
          type="password"
          placeholder="Password"
        />
        <input
          v-model="confirm_password"
          class="input"
          type="password"
          placeholder="Confirm Password"
        />
        <button class="submit" v-on:click="modifyUser">Save changes</button>
      </div>
    </form>
  </main>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";

export default {
  name: "UserProfile",
  components: {
    MainHeader,
  },
  data() {
    return {
      name: this.$root.$data.userName,
      surname: this.$root.$data.userLastName,
      email: this.$root.$data.userEmail,
      image: this.$root.$data.userImage,
      password: "",
      confirm_password: "",
    };
  },
  methods: {
    modifyUser() {
      if (this.password == "" || this.confirm_password == "") {
        //en aquets cas no es modifica la contrasenya
        //actualitzem les dades de l'usuari
        console.log("no password");
        this.checkEmail();
        this.$root.$data.userName = this.name;
        this.$root.$data.userLastName = this.surname;
        this.$root.$data.userEmail = this.email;
        this.$root.$data.userImage = this.image;
        console.log(this.image);
        const url = "http://puigmal.salle.url.edu/api/v2/users";
        //fem la crida a l'api per modificar les dades de l'usuari (sense la contrasenya)
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: this.name,
            last_name: this.surname,
            email: this.email,
            image: this.image,
          }),
        }).then((response) => {
          if (response.ok) alert("User modified successfully");
          else alert("Error modifying user");
        });
      } else if (this.password != this.confirm_password)
        alert("Passwords don't match"); //les contrasenyes no coincideixen
      else {
        this.checkEmail(); //fucnio per comprovar si el email ha canviat i actualitzar el localStorage
        //en aquest cas es modifica la contrasenya
        //actualitzem les dades del usuari en local        
        this.$root.$data.userName = this.name;
        this.$root.$data.userLastName = this.surname;
        this.$root.$data.userEmail = this.email;
        this.$root.$data.userImage = this.image;
        //fem la crida a l'api per modificar les dades de l'usuari (amb la contrasenya)
        const url = "http://puigmal.salle.url.edu/api/v2/users";
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$root.$data.token,
          },
          body: JSON.stringify({
            name: this.name,
            last_name: this.surname,
            email: this.email,
            image: this.image,
            password: this.password,
          }),
        }).then((response) => {
          if (response.ok) alert("User modified successfully");
          else alert("Error modifying user");
        });
      }
    },
    onError(event) {
      event.target.src = "/no-profile-pic.png";
    },

    //Funcio per comprovar si el email ha canviat i actualitzar el localStorage
    checkEmail(){
      if(this.$root.$data.userEmail != this.email){
        var userInSystem = [];
        userInSystem = JSON.parse(localStorage.getItem("logging"));
        for (var i = 0; i < userInSystem.length; i++) {
          if (userInSystem[i] == this.$root.$data.userEmail) {
            //Delete the user from the system
            userInSystem.splice(i, 1);
            break;
          }
        }
        userInSystem.push(this.email);
        localStorage.removeItem("logging");
        localStorage.setItem("logging", JSON.stringify(userInSystem));
      }      
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
}
.info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px;
  background-color: #15172b;
  border-radius: 15px;
  width: 90%;
  padding-bottom: 20px;
}
.change-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  margin-bottom: 10px;
}

label {
  text-align: center;
}
.image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  padding: 10px;
  border-radius: 50%;
}
.file {
  font-size: 16px;
  color: #b8b8b8;
}

.lateral {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: nowrap;
}
.input {
  height: 50px;
  width: 100%;
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  outline: 0;
  padding: 4px 20px;
  margin-bottom: 10px;
}

.submit {
  box-sizing: border-box;
  cursor: pointer;
  height: 50px;
  margin-top: 10px;
  width: 100%;
}

@media only screen and (min-width: 410px) {
  .lateral{
    padding: 60px;
  }

  .image{
    width: 300px;
    height: 300px;
  }
  .input{
    width: 300px;
  }

  .info{
    width: 70%;
  }
}



</style>
