<template>
  <div id="app">
    <WindowBar></WindowBar>
    <div>
      <v-app>
        <v-main id="router">
          <v-fade-transition mode="out-in">
            <router-view/>
          </v-fade-transition>
          <v-snackbar vertical bottom timeout="0" v-model="update" v-if="downloaded === 0">
            New GUI Client update available!
            <template v-slot:action="{ attrs }">
              <v-btn color="white" plain v-bind="attrs"
                     @click="download">
                Download
              </v-btn>
              <v-btn color="white" plain v-bind="attrs" @click="changelog">
                Changelog
              </v-btn>
              <v-btn color="white" plain v-bind="attrs" @click="update = false">
                Dismiss
              </v-btn>
            </template>
          </v-snackbar>
          <v-snackbar v-else-if="downloaded === 1" v-model="update" timeout="0">
            Downloading update...
          </v-snackbar>
          <v-snackbar v-else-if="downloaded === 2" v-model="update" timeout="0">
            Ready to update!
            <template v-slot:action="{ attrs }">
              <v-btn color="white" plain v-bind="attrs" @click="do_update">
                Restart
              </v-btn>
            </template>
          </v-snackbar>
        </v-main>
      </v-app>
    </div>
  </div>
</template>

<script>
import WindowBar from "./components/WindowBar.vue";

export default {
  name: "App",

  data() {
    return {
      update: false,
      downloaded: 0,
    }
  },

  components: {
    WindowBar,
  },

  mounted() {
    this.$router.push({name: "DeviceList"});
    window.update.register(() => {
      this.update = true;
      this.downloaded = 0;
    }, () => {
      this.downloaded = 2;
    })
  },

  methods: {
    changelog() {
      window.misc.changelog();
    },

    download() {
      window.update.download();
      this.downloaded = 1;
    },

    do_update() {
      window.update.update();
    }
  }
};
</script>

<style>
html {
  background-image: linear-gradient(200deg, #006466, #1b3a4b);
  overflow: hidden !important;
  -webkit-user-select: none;
}

body {
  margin: 0;
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#router {
  width: 100%;
  height: calc(100% - 23px);
  min-height: 50px;
  position: relative;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.theme--light.v-application {
  background: transparent !important;
}

/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #006466 #1b3a4b;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: #1b3a4b;
}

*::-webkit-scrollbar-thumb {
  background-color: #006466;
  border-radius: 20px;
  border: 3px solid #1b3a4b;
}
</style>
