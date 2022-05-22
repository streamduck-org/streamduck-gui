<template>
  <v-container fluid style="background-color: #212f45">
    <v-row>
      <v-col style="flex: 0 0 400px; max-width: 400px">
        <v-card
            style="background-color: #2c3e50"
            elevation="0">
          <v-card-text style="color: white">Brightness</v-card-text>
          <v-slider dark v-model="brightness_value" style="margin: 0 12px" color="white" track-color="white"
                    thumb-label @input="set_brightness" @change="set_brightness">
            <template v-slot:thumb-label="{ value }">
              <span style="color: black">{{ value }}</span>
            </template>
            <template v-slot:append>
              <span style="margin-top: 4px; width: 30px; text-align: center">{{ brightness_value }}</span>
            </template>
          </v-slider>

        </v-card>
      </v-col>
      <v-col style="flex: 0 0 400px; max-width: 400px">
        <v-card
            style="background-color: #2c3e50"
            elevation="0">
          <v-card-text style="color: white">Device Config <br><span
              style="color: darkgray; font-size: 12px">Import overrides device config</span>
          </v-card-text>
          <div
              style="display: flex; flex-direction: row; justify-content: center; align-items: center; padding-bottom: 25px">
            <v-btn class="mr-4" plain @click="$refs.uploader.click()" :loading="reading_file" dark>Import</v-btn>
            <v-btn class="ml-4" plain @click="export_config" :loading="exporting_file" dark>Export</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <input
        ref="uploader"
        class="d-none"
        type="file"
        accept=".streamduck_config"
        @change="file_selected"
    >
    <v-snackbar v-model="failed_import" timeout="3000">Failed to import device config</v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "DeviceTab",
  props: ['serial_number', 'device_type'],
  data() {
    return {
      brightness_value: 0,
      brightness_handle: null,
      failed_import: false,
      reading_file: false,
      exporting_file: false,
    }
  },
  async mounted() {
    this.brightness_value = await window.sd.get_brightness(this.serial_number);
  },
  methods: {
    async set_brightness() {
      await window.sd.set_brightness(this.serial_number, Math.round(this.brightness_value));
      this.$emit("layout-changed");
    },

    async export_config() {
      this.exporting_file = true;
      let config;
      if ((config = await window.sd.export_device_config(this.serial_number))) {
        const blob = new Blob([config], {type: 'text/plain'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${this.serial_number}.streamduck_config`;
        link.click();
      }
      this.exporting_file = false;
    },

    file_selected(e) {
      let file = e.target.files[0];

      if (file) {
        this.reading_file = true;
        const reader = new FileReader();

        reader.onload = async (data) => {
          let response = await window.sd.import_device_config(this.serial_number, data.target.result);

          if (response !== "Imported") {
            this.failed_import = true;
          } else {
            this.$emit('layout-changed');
            this.$emit('imported-config');
          }

          this.reading_file = false;
        }

        reader.onerror = () => {
          this.reading_file = "Error loading file";
          setTimeout(() => this.reading_file = false, 3000);
        }

        reader.readAsBinaryString(file);
      }
    }
  }
}
</script>

<style scoped>

</style>