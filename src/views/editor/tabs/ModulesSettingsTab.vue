<template>
  <v-card class="fill-height" style="overflow-y: scroll" color="#212f45" elevation="0">
    <div style="display: flex; flex-direction: column; width: calc(100% - 24px)" class="ml-3">
      <v-expansion-panels flat dark accordion multiple v-if="module_parameters.length > 0">
        <v-expansion-panel v-for="module in module_parameters" :key="module.module"
                           style="background-color: #2c3e50">
          <v-expansion-panel-header style="color: white">
            <span>{{ module.display }}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <UIValueList :module_name="module.module" :items="module.parameters"
                         @refresh="module.refresh"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <span v-else-if="module_parameters.length <= 0"
            style="width: 100%; text-align: center; color: #495963; font-size: 14px; font-weight: 400"
            class="mt-6">No modules...</span>
    </div>
  </v-card>
</template>

<script>
import UIValueList from "../../../components/UIValueList";

export default {
  name: "ModulesSettingsTab",
  components: {
    UIValueList
  },
  data() {
    return {
      module_parameters: []
    }
  },
  async mounted() {
    await this.update_parameters();
  },
  methods: {
    async event_refresh() {
      await this.update_parameters();
    },

    async update_parameters() {
      let module_parameters = [];

      let module_list = await window.sd.list_modules().catch(() => {
      });

      if (module_list) {
        for (let i in module_list) {
          let values = await window.sd.get_module_values(module_list[i].name);
          console.log(values, module_list[i].name);

          if (values && Object.keys(values).length > 0) {
            console.log(values);
            module_parameters.push({
              module: module_list[i].name,
              display: module_list[i].name,
              parameters: values,
              refresh: this.event_refresh
            });
          }
        }
      }

      this.module_parameters = module_parameters;
    }
  }
}
</script>

<style scoped>

</style>