<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark-c">
    <router-link @click="startLoading" to="/" style="color: black;" class="navbar-brand">STEM</router-link>
      <div class="navbar-nav mr-auto">
<!--        <li class="nav-item">
          <router-link to="/stem" class="nav-link">Stem</router-link>
</li> -->
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: "app",
  methods: { 
             startLoading() {
                 const preloader = document.getElementById('preloader')
                 preloader.style.display = "block";
                 preloader.style.opacity = 1;
                 setTimeout(() => {preloader.style.opacity = 0}, 200);
                 setTimeout(() => {preloader.style.display = "none"}, 2000);
             } 
  },
  mounted() {
    var p = document.querySelector('#preloader');
    p.style.opacity = 0;
    setTimeout(() => {p.style.display = "none"}, 2000);
  }
};
</script>

<style>

.bg-dark-c {
	background-color: gold!important;
}

.navbar {
	position: fixed!important;
	width: 100%;
	top: 0;
	text-shadow: -3px -2px white;
	z-index: 999999;
}
.container {
	padding: 85px 0;
}
</style>
