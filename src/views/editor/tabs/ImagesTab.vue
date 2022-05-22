<template>
  <v-card color="#2c3e50" elevation="0"
          style="border-style: solid; border-width: 3px; border-color: #00000000; height: 100%;">
    <v-container fluid>
      <v-row dense style="height: 60px">
        <v-col style="flex: 0 0 72px; max-width: 72px">
          <v-tooltip bottom transition="fade-transition" open-delay="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn height="100%" elevation="0" plain style="color: white" v-bind="attrs" v-on="on"
                     @click="$refs.uploader.click()" :loading="reading_file">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"/>
                </svg>
              </v-btn>
            </template>
            <span>Upload new image</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-card class="overflow-y-auto" color="#212f45" elevation="0"
                  style="border-style: solid; border-width: 3px; border-color: #00000000; height: calc(100vh - 243px);">
            <v-container fluid>
              <v-row justify="start">

                <v-col style="flex: 0 0 16.5%; max-width: 16.5%" v-for="(item, key) in images" :key="key">
                  <v-card class="ma-auto square"
                          :style="{minWidth: '130px', backgroundImage: `url(${'data:image/png;base64,' + item.image_blob}`, backgroundSize: '101% 101%', backgroundColor: '#000000', position: 'relative'}"
                          elevation="0">
                    <span v-show="item.animated"
                          style="font-size: 13px; position: absolute; top: 3%; left: 5%; color: white; text-shadow: 2px 2px black">GIF</span>
                    <v-btn fab style="position: absolute; bottom: -10%; right: -10%" color="red" x-small
                           @click="delete_image(key)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <input
          ref="uploader"
          class="d-none"
          type="file"
          accept="image/*"
          @change="file_selected"
      >
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "ImagesTab",
  props: ['serial_number'],
  data() {
    return {
      reading_file: false,
      images: {}
    }
  },
  async mounted() {
    await this.update_images();
  },
  updated() {
    this.update_images()
  },
  methods: {
    async update_images() {
      let images = await window.sd.list_images(this.serial_number);
      if (Object.keys(this.images).length !== Object.keys(images).length) {
        this.images = images;
      }
    },

    async delete_image(identifier) {
      await window.sd.remove_image(this.serial_number, identifier);
      this.$emit('layout-changed');
      await this.update_images();
    },

    file_selected(e) {
      let file = e.target.files[0];

      if (file) {
        this.reading_file = true;
        const reader = new FileReader();

        reader.onload = async (data) => {
          await window.sd.add_image(this.serial_number, btoa(data.target.result));
          this.$emit('layout-changed');
          this.reading_file = false;

          await this.update_images();
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
.square:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
</style>