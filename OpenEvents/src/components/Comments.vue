<template>
  <!--Show the comments info-->
  <article class="item">
    <h4>{{ nom }} {{ lastName }}</h4>
    <div>
      <article>
        <section>
          <p>{{ Comment }}</p>
        </section>
        <section>
          <p>{{ Puntuation }}</p>
        </section>
      </article>
    </div>
  </article>
</template>

<script>
export default {
  name: "CommentComponent",
  props: {
    nom: String,
    lastName: String,
    Comment: String,
    Puntuation: Number,
  },
};
</script>

<style scoped>

.item {
  display: flex;
  flex-direction: column;
  width: 320px;     /*880*/
  height: 100%;
  background-color: #9c2ada;
  border-radius: 20px;
  margin-bottom: 20px;
}

div {
  display: flex;
  flex-direction: row;
  width: 320px;     /*880*/
  height: fit-content;
  align-items: center;
  background-color: #15172b; 
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

section {
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: space-between;
  width: 100%;
  column-gap: normal;
}

p {
  font-size: 16px;
  text-align: justify;
  margin-inline-start: 30px;
}

h4 {
  align-items: left;
  font-size: 16px;
  margin-right: auto;
  margin-left: 20px;
  margin-bottom: 10px;
}

@media only screen and (min-width: 410px){
    div{
        width: 690px;
    }

    .item{
        width: 690px;
    }

}
</style>
