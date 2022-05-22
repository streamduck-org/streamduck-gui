<template>
  <v-row dense style="height: calc(100% - 74px);">
    <v-col cols="12" style="height: 100%">
      <v-card class="fill-height overflow-y-auto" color="#212f45" elevation="0"
              style="border-style: solid; border-width: 3px; border-color: #00000000">
        <v-tabs vertical dark style="padding: 10px;" class="fill-height" background-color="#212f45">
          <v-tab style="width: 200px">Device</v-tab>
          <v-tab style="width: 200px">Images</v-tab>
          <v-divider style="border-color: #2c3e50; margin: 5px 20px"></v-divider>
          <v-tab style="width: 200px">Modules</v-tab>
          <v-tab style="width: 200px">Module Settings</v-tab>
          <v-tabs-slider color="#00868a"></v-tabs-slider>
          <v-tab-item transition="scroll-y-transition" reverse-transition="scroll-y-transition"
                      style="position: absolute; width: 100%; height: calc(100vh - 130px);">
            <DeviceTab @layout-changed="$emit('layout-changed')" @imported-config="$refs.images.update_images()"
                       :serial_number="serial_number"
                       :device_type="device_type"/>
          </v-tab-item>
          <v-tab-item transition="scroll-y-transition" reverse-transition="scroll-y-transition"
                      style="position: absolute; width: 100%; height: calc(100vh - 130px); padding: 12px">
            <ImagesTab ref="images" @layout-changed="$emit('layout-changed')" :serial_number="serial_number"/>
          </v-tab-item>
          <v-tab-item transition="scroll-y-transition" reverse-transition="scroll-y-transition"
                      style="position: absolute; width: 100%; height: calc(100vh - 130px);">
            <ModulesTab/>
          </v-tab-item>
          <v-tab-item transition="scroll-y-transition" reverse-transition="scroll-y-transition"
                      style="position: absolute; width: 100%; height: calc(100vh - 130px); padding-top: 12px">
            <ModulesSettingsTab ref="modules" @layout-changed="$emit('layout-changed')"/>
          </v-tab-item>
        </v-tabs>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DeviceTab from "../../views/editor/tabs/DeviceTab";
import ImagesTab from "@/views/editor/tabs/ImagesTab";
import ModulesSettingsTab from "@/views/editor/tabs/ModulesSettingsTab";
import ModulesTab from "@/views/editor/tabs/ModulesTab";

export default {
  name: "DeviceSettings",
  components: {
    ModulesTab,
    ModulesSettingsTab,
    ImagesTab,
    DeviceTab
  },
  props: ['serial_number', 'device_type'],
  data() {
    return {}
  },
  methods: {
    async get_parameters() {
      await this.$refs.images.update_images();
      await this.$refs.modules.update_parameters();
    }
  }
}
</script>

<style>
.v-tabs-items {
  background-color: #212f45 !important;
}
</style>