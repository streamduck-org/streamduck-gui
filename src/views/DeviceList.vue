<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-card width="500px" color="#212f45" class="justify-center pt-2">
        <v-card-title class="justify-center" style="color: white; text-align: center; font-size: 28px"
                      width="100%">
          Device List
        </v-card-title>
        <v-card-text class="justify-center"
                     style="justify-content: center; display: flex; flex-direction: column">
                    <span style="color: darkgray; text-align: center">
                        Select device to configure
                    </span>
          <v-card color="#1B3A4B" width="500px" height="250px"
                  class="ma-auto mt-4 overflow-y-auto overflow-x-hidden" elevation="0">
            <v-card-text v-if="devices.length > 0">
              <v-container fill-height full-width fluid>
                <v-row v-for="device in devices" :key="device.serial_number"
                       class="overflow-visible mb-2" style="flex-direction: row" full-width no-gutters>
                  <v-col :cols="device.managed ? 10 : 12">
                    <v-btn
                        v-bind:style="device.online ? (device.managed ? 'background-image: linear-gradient(150deg, #00868a, #00607a)' : 'background-color: #0b525b') : 'background-color: #212f45'"
                        style="width: 100%" class="py-7" elevation="0"
                        @click="select_device(device.serial_number)">
                      <div style="width: 110px; margin-right: 40px; color: white">
                        <span v-if="device.managed && device.online">Connected</span>
                        <span v-if="!device.managed && device.online">Discovered</span>
                        <span v-if="device.managed && !device.online">Offline</span>
                      </div>
                      <div style="display: flex; flex-direction: column">
                                                <span
                                                    style="color: white; font-size: 18px">{{
                                                    device.serial_number
                                                  }}</span>
                        <span
                            style="font-size: 10px; color: darkGray">{{ device.device_type }}</span>
                      </div>
                    </v-btn>
                  </v-col>
                  <v-col cols="1" v-if="device.managed" class="ml-1">
                    <v-btn height="100%" width="50px" color="#006466" style="color: #1b3a4b"
                           elevation="0" @click="remove_device(device.serial_number)">
                      <svg style="width: 36px; height: 36px" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                      </svg>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-text v-else>
              <v-container fill-height full-width fluid>
                <v-row align="center" justify="center" full-width>
                  <span class="no-devices-text">No devices found...</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      devices: [],
    };
  },
  mounted() {
    if (window.store.get("selected-device")) {
      this.$router.push({name: "LayoutEditor"});
    } else {
      clearInterval(window.device_list);
      clearInterval(window.device_tick);
      clearInterval(window.refresh_tick);

      this.refresh_list();
      window.device_list = setInterval(this.refresh_list, 2000);
    }
  },
  methods: {
    async select_device(serial_number) {
      let device;
      if ((device = await window.sd.get_device(serial_number))) {
        if (device.online) {
          window.store.set("selected-device", serial_number);
          await this.$router.push({name: "LayoutEditor"});
        }
      } else {
        await window.sd.add_device(serial_number);
        await this.refresh_list();
      }
    },

    async remove_device(serial_number) {
      if (await window.sd.get_device(serial_number)) {
        await window.sd.remove_device(serial_number);
        await this.refresh_list();
      }
    },

    async refresh_list() {
      if (window.sd.is_connected()) {
        this.devices = await window.sd.device_list();
      }
    },
  },
};
</script>

<style>
.no-devices-text {
  font-size: 20px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
  vertical-align: top;
  line-height: 21px;
  color: #495963;
}
</style>