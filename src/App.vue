<template>
    <div id="app">
        <WindowBar></WindowBar>
        <div>
            <v-app>
                <v-main id="router">
                    <v-scroll-x-transition mode="out-in">
                        <router-view/>
                    </v-scroll-x-transition>
                </v-main>
            </v-app>
        </div>
    </div>
</template>

<script>
import WindowBar from "./components/WindowBar.vue";

export default {
    name: "App",
    
    components: {
        WindowBar,
    },
    
    mounted() {
        this.$router.push({name: "DeviceList"});
    },
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
