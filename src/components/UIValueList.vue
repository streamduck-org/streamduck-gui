<template>
  <v-container fluid>
    <v-row v-for="(item, index) in items" :key="index">
      <UIValueItem :serial_number="serial_number" :component_name="component_name" :button_index="button_index"
                   :module_name="module_name"
                   :item="item" @refresh="refresh"/>
    </v-row>
    <v-row v-if="items.length <= 0">
            <span
                style="text-align: center; width: 100%; font-size: 14px; font-weight: 300; color: gray">No items</span>
    </v-row>
  </v-container>
</template>

<script>
import UIValueItem from "./UIValueItem";

export default {
  name: "UIValueList",
  props: ['serial_number', 'button_index', 'component_name', 'items', 'module_name'],
  mounted() {
    console.log(this.items);
  },
  components: {
    UIValueItem
  },
  methods: {
    refresh() {
      this.$emit("refresh")
    }
  }
}
</script>

<style scoped>

</style>