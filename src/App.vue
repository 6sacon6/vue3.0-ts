
<template>
  <div class="view">
    <div id="nav">
      <div>
        <router-link to="/todomvc">Todos MVC</router-link>
      </div>
    </div>
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  background-color: #040609;
  color: #92abcf;
}
.view {
  position: relative;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
}
#nav {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 24px 12px 12px;
  flex: 0 0 auto;
  height: 100vh;
  z-index: 99;
  div {
    display: flex;
    height: 46px;
    line-height: 46px;
    color: #92abcf;
  }
  a {
    width: 100%;
    font-weight: bold;
    color: #92abcf;
    text-decoration: none;
    cursor: pointer;
    padding-left: 30px;
  }
}
#content {
  position: relative;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  padding-left: 230px;
}

ol,
ul {
  list-style: none;
}
</style>
