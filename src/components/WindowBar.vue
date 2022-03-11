<template>
    <div id="navigation" class="_row _navigation">
        <span class="wordmarkWindows">Streamduck </span>
        <div style="margin-left: 20px; -webkit-app-region: drag">
            <span class="connection-status">Connection to daemon: </span>
            <svg v-if="connected" style="width: 20px; height: 20px; color: #006466" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
            </svg>
            <svg v-else style="width: 20px; height: 20px; color: #9b2226" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"/>
            </svg>
        </div>
        
        <div class="_titlebar"></div>
        <span class="titlebar-btn" style="height: 23px">
            <div id="btnMinimize" @click="minimize()">
                <svg style="
                width: 16px;
                height: 16px;
                vertical-align: middle;
                margin-top: 1px;
                " viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20,14H4V10H20"/>
                </svg>
            </div>
            <div id="btnMaximize" @click="maximize()">
                <svg style="width: 16px; height: 16px; vertical-align: middle" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M4,4H20V20H4V4M6,8V18H18V8H6Z"/>
                </svg>
            </div>
            <div id="btnClose" @click="close()">
                <svg style="
                width: 16px;
                height: 16px;
                vertical-align: middle;
                margin-right: 2px;
                " viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
            </div>
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            connected: false,
        };
    },
    
    mounted() {
        setInterval(() => {
            this.connected = window.sd.is_connected();
            
            if ((!this.connected) && (this.$route.name !== "LoadingPage")) {
                this.$router.push({name: "LoadingPage"});
            }
        }, 2000);
    },
    
    methods: {
        minimize() {
            window.preload.minimize();
        },
        maximize() {
            window.preload.maximize();
        },
        close() {
            window.preload.close();
        },
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap");

._navigation {
    /* background-color: var(--background-tertiary); */
    background-color: #00000080;
    display: flex;
    
    color: #ccc;
    
    height: 22px;
    padding-top: 1px;
    /* margin-top: 1px; */
    /* margin-left: 4px; */
    
    z-index: 30000;
    
    /* height: 23px; */
    /* display: flex;
    flex-flow: row wrap; */
    /* justify-content: flex-end; */
    /* padding: 2px; */
}

._titlebar {
    /* -webkit-user-select: none; */
    -webkit-app-region: drag;
    margin: 4px;
    /* width: 100%; */
    flex-grow: 1;
    /* height: 18px; */
    line-height: 23px;
}

.wordmarkWindows {
    -webkit-app-region: drag;
    font-size: 18px;
    font-family: "Source Sans Pro", sans-serif;
    margin-left: 5px;
    font-weight: 500;
    vertical-align: middle;
    line-height: 19px;
    overflow: hidden;
}

.connection-status {
    font-size: 14px;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 900;
    vertical-align: top;
    line-height: 21px;
    color: gray;
}

.titlebar-btn {
    -webkit-user-select: none;
    user-select: none;
    float: right;
    /* width: 90px; */
    width: auto;
    /* height: 18px; */
    -webkit-app-region: none;
    margin-left: 10px;
}

.titlebar-btn > span {
    margin-right: 10px;
    cursor: pointer;
    height: 100%;
}

.titlebar-btn > div {
    display: inline-block;
    cursor: pointer;
    height: 22px;
    min-width: 25px;
    text-align: center;
}

#btnClose:hover {
    color: #fff;
    background-color: hsl(359, calc(82.6%), 59.4%);
}
</style>