<template>
  <v-container fluid style="background-color: #212f45">
    <v-row>
      <v-col cols="4" v-for="( item ) in modules" :key="item.name">
        <v-card dark
                style="background-color: #2c3e50"
                elevation="0">
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>By {{ item.author }}</v-card-subtitle>
          <v-card-text>
            <span>{{ item.description }}</span>
            <br><br>
            <span>Used features:</span>
            <br>
            <v-chip v-for="(feature) in item.used_features" :key="feature[0]" class="mr-2 mt-2">{{
                feature[0]
              }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ModulesTab",
  async mounted() {
    this.modules = await window.sd.list_modules();
  },
  data() {
    return {
      modules: []
    }
  }
}
</script>

<style scoped>

</style>