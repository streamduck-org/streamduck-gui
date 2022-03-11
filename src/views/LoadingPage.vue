<template>
    <v-container fluid fill-height>
        <v-row align="center" justify="center">
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
                <span class="mb-4" style="font-size: 24px; font-weight: 400">Check your connection to daemon</span>
                <v-progress-circular indeterminate :size="100" :width="5" color="black"
                                     class="slider_center_item"></v-progress-circular>
            </div>
        </v-row>
    </v-container>


</template>

<script>
export default {
    mounted() {
        let interval = setInterval(() => {
            if (window.sd.is_connected()) {
                this.$router.push({name: "DeviceList"});
                clearInterval(interval);
            }
        }, 500)
    }
}
</script>

<style></style>