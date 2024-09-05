<template>
  <HeaderWeb class="webHeader"></HeaderWeb>
  <HeaderMobile id="mobileHeader"></HeaderMobile>
</template>

<script>
import HeaderWeb from "../components/HeaderWeb.vue";
import HeaderMobile from "../components/HeaderMobile.vue";

export default {
  name: "MainHeader",
  props: {
    Img: String,
  },
  components: {
    HeaderWeb,
    HeaderMobile,
  },
};
</script>

<style scoped>
.webHeader {
  display: none;
}
#mobileHeader {
  display: flex;
}

@media only screen and (min-width: 412px) {
  .webHeader {
    display: flex;
  }
  #mobileHeader {
    display: none;
  }
}
</style>
