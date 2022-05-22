<template>
  <v-container fluid style="align-items: start; height: 100%">
    <v-row style="height: 60px" class="mb-3">
      <v-col style="flex: 0 0 72px; max-width: 72px">
        <v-tooltip bottom transition="fade-transition" open-delay="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn height="100%" elevation="0" plain style="color: white" v-bind="attrs" v-on="on"
                   @click="go_back">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
              </svg>
            </v-btn>
          </template>
          <span>Back to device list</span>
        </v-tooltip>
      </v-col>
      <v-col style="flex: 0 0 300px; max-width: 300px" class="pr-0">
        <v-tooltip bottom transition="fade-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-card @click="copy_serial" v-ripple v-bind="attrs" v-on="on"
                    :style="(device != null && device.online) ? 'background-image: linear-gradient(150deg, #00868a, #00607a)' : 'background-color: #212f45'"
                    elevation="0">
              <v-card-text class="pa-3">

                <div
                    style="display: flex; flex-direction: column; letter-spacing: 0.0892857143em; line-height: normal; text-transform: uppercase;">
                  <v-fade-transition mode="out-in">
                            <span ref="serial" :key="copied_serial"
                                  style="color: white; font-size: 18px; font-weight: 500; text-align: center">{{
                                copied_serial ? 'Copied' : serial_number
                              }}</span>
                  </v-fade-transition>

                  <span
                      style="font-size: 10px; color: darkGray; font-weight: 500; text-align: center">{{
                      device_type
                    }}</span>
                </div>

              </v-card-text>
            </v-card>
          </template>
          <span>Copy Serial Number</span>
        </v-tooltip>
      </v-col>
      <v-col style="flex: 0 0 72px; max-width: 72px" class="ml-n1">
        <v-tooltip bottom transition="fade-transition" open-delay="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn height="100%" elevation="0" :plain="!layout_changed" color="#00999a"
                   :style="`color: ${layout_changed ? '#0b525b' : 'white'}`" v-bind="attrs" v-on="on"
                   @click="save_config">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/>
              </svg>
            </v-btn>
          </template>
          <span>Save configuration</span>
        </v-tooltip>
      </v-col>
      <v-spacer></v-spacer>
      <v-col style="flex: 0 0 72px; max-width: 72px">
        <v-tooltip bottom transition="fade-transition" open-delay="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn height="100%" elevation="0" plain style="color: white" v-bind="attrs" v-on="on"
                   @click="reload_config">
              <v-progress-circular indeterminate color="white" size="24" width="2"
                                   v-if="reloading_config"></v-progress-circular>
              <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-else>
                <path fill="currentColor"
                      d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
              </svg>
            </v-btn>
          </template>
          <span>Reload configuration from daemon</span>
        </v-tooltip>
      </v-col>
      <v-col style="flex: 0 0 72px; max-width: 72px" class="pl-2 mr-3">
        <v-tooltip bottom transition="fade-transition" open-delay="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn height="100%" elevation="0" plain
                   :style="{backgroundColor: $route.name === 'LayoutEditor' ? 'transparent' : '#212f45', color: 'white'}"
                   v-bind="attrs"
                   v-on="on"
                   @click="settings">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
              </svg>
            </v-btn>
          </template>
          <span>Settings</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-fade-transition mode="out-in">
      <router-view @layout-changed="report_layout_change" :serial_number="serial_number" :device_type="device_type"
                   ref="child"/>
    </v-fade-transition>

  </v-container>
</template>

<script>


export default {
  name: "DeviceEditor",
  data() {
    return {
      device: null,
      serial_number: "",
      device_type: "",
      reloading_config: false,
      layout_changed: false,
      copied_serial: false,
      copied_serial_handle: null,
    }
  },
  mounted() {
    let device;
    if ((device = window.store.get("selected-device"))) {
      this.serial_number = device;
      let get_device = async () => {
        await window.sd.get_device(device).then(device => {
          this.device = device;
          if (this.device != null) {
            setTimeout(this.full_screen_refresh, 100);
            this.device_type = this.device.device_type;
          }
        }).catch(() => {
        });

      };

      clearInterval(window.device_list);
      clearInterval(window.device_tick);

      get_device();
      window.device_tick = setInterval(get_device, 5000);
    } else {
      this.$router.push({name: "DeviceList"});
    }
  },

  methods: {
    copy_serial() {
      navigator.clipboard.writeText(this.serial_number).then(() => {
        clearTimeout(this.copied_serial_handle);
        this.copied_serial_handle = setTimeout(() => this.copied_serial = false, 2000);
        this.copied_serial = true;

      }).catch(() => {
      });
    },

    go_back() {
      window.store.clear("selected-device");
      this.$router.push({name: "DeviceList"});
    },

    settings() {
      if (this.$route.name === "LayoutEditor") {
        this.$router.push({name: "DeviceSettings"});
      } else {
        this.$router.push({name: "LayoutEditor"});
      }
    },

    report_layout_change() {
      this.layout_changed = true;
    },

    async reload_config() {
      this.reloading_config = true;
      await window.sd.reload_device_config(this.serial_number);
      this.reloading_config = false;

      this.layout_changed = false;

      if (this.$refs.child.get_parameters) {
        this.$refs.child.selected_button = null;
        await this.$refs.child.get_parameters();
      }
    },

    async save_config() {
      await window.sd.save_device_config(this.serial_number);
      this.layout_changed = false;
    },
  }
}
</script>

<style>
.fade-in-enter-active {
  transition: opacity 300ms cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.fade-in-leave-active {
  transition: opacity 225ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}
</style>