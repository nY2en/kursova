<template>
  <div class="area">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Kalam, sans-serif;
}

ul {
  list-style: none;
}

::-webkit-scrollbar {
  display: none;
}

.area {
  width: 100%;
  height: 100vh;

  background-image: url("img/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  overflow: hidden;
  color: white;
}
</style>
