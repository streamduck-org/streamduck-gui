<template>
    <v-container fluid>
        <v-row v-for="(item, index) in items" :key="index">
            <UIValueItem :serial_number="serial_number" :component_name="component_name" :button_index="button_index"
                         :item="item" @refresh="refresh"/>
        </v-row>
    </v-container>
</template>

<script>
import UIValueItem from "./UIValueItem";

export default {
    name: "UIValueList",
    props: ['serial_number', 'button_index', 'component_name', 'items'],
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