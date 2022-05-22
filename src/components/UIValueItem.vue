<template>
  <v-card :class="['mb-1', (item.ty === 'Collapsable' ? 'pb-1' : 'pa-4')]" elevation="0"
          style="background-color: #212f45" width="100%">
    <!--        {{ item.path }}-->

    <div class="fancy"
         style="width: calc(100% - 32px); font-size: 18px; text-align: center" v-if="item.ty === 'Header'">
        <span>{{ item.display_name }}
        </span></div>
    <div v-else-if="item.ty === 'Label'" style="width: 100%; display: flex; flex-direction: column">
      <v-text-field :label="item.display_name" :value="item.value.Label" dark disabled
                    flat
                    outlined readonly hide-details></v-text-field>
      <span class="mt-2" style="font-size: 12px; color: rgb(178, 178, 178)"
            v-if="item.description">{{ item.description }}</span>
    </div>
    <v-text-field :label="item.display_name"
                  :rules="[rules.float]"
                  :value="Math.round(item.value.InputFieldFloat * 1000) / 1000"
                  @change="set_input_float" v-else-if="item.ty === 'InputFieldFloat'" :hint="item.description"
                  persistent-hint></v-text-field>
    <v-text-field v-else-if="item.ty === 'InputFieldInteger'" :label="item.display_name" :rules="[rules.int]"
                  :value="item.value.InputFieldInteger" @change="set_input_int" :hint="item.description"
                  persistent-hint></v-text-field>
    <v-text-field v-else-if="item.ty === 'InputFieldString'" :label="item.display_name"
                  :value="item.value.InputFieldString" @change="set_input_string"
                  :hint="item.description" persistent-hint></v-text-field>
    <div v-else-if="item.ty === 'InputFieldFloat2'" style="width: 100%; display: flex; flex-direction: column">
      <span style="font-size: 14px;">{{ item.display_name }}</span>
      <span class="mb-2" style="font-size: 12px; color: rgb(178, 178, 178)"
            v-if="item.description">{{ item.description }}</span>
      <div style="width: 100%; display: flex; flex-direction: row">
        <v-text-field :rules="[rules.float]" :value="Math.round(item.value.InputFieldFloat2[0] * 1000) / 1000"
                      class="mr-1" label="X"
                      @change="set_input_float_left"></v-text-field>
        <v-text-field :rules="[rules.float]" :value="Math.round(item.value.InputFieldFloat2[1] * 1000) / 1000"
                      class="ml-1" label="Y"
                      @change="set_input_float_right"></v-text-field>
      </div>
    </div>
    <div v-else-if="item.ty === 'InputFieldInteger2'" style="width: 100%; display: flex; flex-direction: column">
      <span style="font-size: 14px;">{{ item.display_name }}</span>
      <span class="mb-2" style="font-size: 12px; color: rgb(178, 178, 178)"
            v-if="item.description">{{ item.description }}</span>
      <div style="width: 100%; display: flex; flex-direction: row">
        <v-text-field :rules="[rules.int]" :value="item.value.InputFieldInteger2[0]" class="mr-1" label="X"
                      @change="set_input_int_left"></v-text-field>
        <v-text-field :rules="[rules.int]" :value="item.value.InputFieldInteger2[1]" class="ml-1" label="Y"
                      @change="set_input_int_right"></v-text-field>
      </div>
    </div>
    <v-text-field v-else-if="item.ty === 'InputFieldUnsignedInteger'" :label="item.display_name"
                  :rules="[rules.positive]" :value="item.value.InputFieldUnsignedInteger"
                  @change="set_input_unsigned_int" :hint="item.description" persistent-hint></v-text-field>
    <div v-else-if="item.ty === 'Color'" style="width: 100%; display: flex; flex-direction: column">
      <span style="font-size: 14px;">{{ item.display_name }}</span>
      <span class="mb-2" style="font-size: 12px; color: rgb(178, 178, 178)"
            v-if="item.description">{{ item.description }}</span>
      <div style="width: 100%; display: flex; flex-direction: row">
        <v-text-field :rules="[rules.byte]" :value="item.value.Color[0]" class="mr-2" label="Red"
                      @change="set_input_color_r"></v-text-field>
        <v-text-field :rules="[rules.byte]" :value="item.value.Color[1]" class="mr-2" label="Green"
                      @change="set_input_color_g"></v-text-field>
        <v-text-field :rules="[rules.byte]" :value="item.value.Color[2]" class="mr-2" label="Blue"
                      @change="set_input_color_b"></v-text-field>
        <v-text-field :rules="[rules.byte]" :value="item.value.Color[3]" label="Alpha"
                      @change="set_input_color_a"></v-text-field>
        <v-menu v-model="color_picker_open" :close-on-content-click="false" left>
          <template v-slot:activator="{ on }">
            <div
                :style="{backgroundColor: `rgba(${item.value.Color[0]}, ${item.value.Color[1]}, ${item.value.Color[2]}, ${item.value.Color[3] / 255})`, width: '30px', height: '30px', borderRadius: '4px', borderStyle: 'solid', borderWidth: '1px', borderColor: 'white'}"
                class="pl-7 ml-2 mt-4" v-on="on"/>
          </template>
          <v-card>
            <v-card-text class="pa-0">
              <v-color-picker
                  :value="{r: item.value.Color[0], g: item.value.Color[1], b: item.value.Color[2], a: item.value.Color[3] / 255}"
                  dark flat @update:color="set_input_color"/>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </div>
    <div v-else-if="item.ty === 'Font'" style="width: 100%; display: flex; flex-direction: column">
      <v-select :items="fonts" :label="item.display_name" :menu-props="{dark: true}"
                :value="item.value.Font"
                dark flat hide-details @change="set_font" :hint="item.description" persistent-hint></v-select>
      <span class="mt-2" style="font-size: 12px; color: rgb(178, 178, 178)"
            v-if="item.description">{{ item.description }}</span>
    </div>
    <div v-else-if="item.ty === 'Collapsable'" style="width: 100%;">
      <v-expansion-panels accordion class="mt-2" dark flat>
        <v-expansion-panel style="background-color: #212f45">
          <v-expansion-panel-header style="color: white; padding-left: 16px">
            <div style="width: 100%; display: flex; flex-direction: column">
              <span>{{ item.display_name }}</span>
              <span class="mt-2" style="font-size: 12px; color: rgb(178, 178, 178)"
                    v-if="item.description">{{
                  item.description
                }}</span>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <UIValueList :button_index="button_index" :component_name="component_name" :module_name="module_name"
                         :items="item.value.Collapsable" :serial_number="serial_number" @refresh="refresh"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </div>

    <div v-else-if="item.ty === 'ImageData'" style="width: 100%; display: flex; flex-direction: row">
      <div style="flex: 1; display: flex; flex-direction: column; padding-top: 8px">
        <span style="font-size: 14px;">{{ item.display_name }}</span>
        <span class="mb-2" style="font-size: 12px; color: rgb(178, 178, 178)"
              v-if="item.description">{{ item.description }}</span>
      </div>

      <div style="flex: 0">
        <v-progress-circular style="margin-top: 20px; margin-right: 10px" size="25" width="3" indeterminate
                             v-if="this.reading_file"></v-progress-circular>
        <v-file-input v-else prepend-icon="mdi-upload" hide-input
                      :label="item.display_name" access="image/*"
                      ref="img"
                      @change="set_image_data"></v-file-input>
      </div>
    </div>

    <div v-else-if="item.ty === 'ExistingImage' && !module_name"
         style="width: 100%; display: flex; flex-direction: row">
      <div style="flex: 1; display: flex; flex-direction: column; padding-top: 35px">
        <span style="font-size: 14px;">{{ item.display_name }}</span>
        <span class="mb-2" style="font-size: 12px; color: rgb(178, 178, 178)"
              v-if="item.description">{{ item.description }}</span>
      </div>
      <div style="flex: 0; max-width: 100px">
        <v-select dark hide-details :items="Object.keys(images)" :value="item.value.ExistingImage"
                  :menu-props="{dark: true}"
                  @change="set_existing_image">
          <template v-slot:selection="{ item }">
            <div style="position: relative">
              <img :src="'data:image/png;base64, ' + images[item].image_blob"/>
              <span v-show="images[item].animated"
                    style="font-size: 10px; position: absolute; top: 5px; left: 5px; color: white; text-shadow: 2px 2px black">GIF</span>
            </div>
          </template>
          <template v-slot:item="{ item }">
            <div style="position: relative; padding-top: 5px">
              <img :src="'data:image/png;base64, ' + images[item].image_blob"/>
              <span v-show="images[item].animated"
                    style="font-size: 10px; position: absolute; top: 5px; left: 5px; color: white; text-shadow: 2px 2px black">GIF</span>
            </div>
          </template>
        </v-select>
      </div>
    </div>

    <div v-else-if="item.ty === 'ExistingImage' && module_name"
         style="width: 100%; display: flex; flex-direction: column">
      <span style="font-size: 14px;">{{ item.display_name }}</span>
      <span class="mb-2" style="font-size: 12px; color: rgb(178, 178, 178)"
            v-if="item.description">{{ item.description }}</span>
      <span style="font-size: 14px;">Impossible element</span>
    </div>

    <div v-else-if="item.ty.ValueSliderFloat" style="width: 100%; display: flex; flex-direction: column">
      <span style="font-size: 14px;">{{ item.display_name }}</span>
      <span class="mb-2" style="font-size: 12px; color: rgb(178, 178, 178)"
            v-if="item.description">{{ item.description }}</span>
      <v-slider v-model="slider_value" hide-details class="align-center" :min="item.ty.ValueSliderFloat.min_value"
                :max="item.ty.ValueSliderFloat.max_value" :step="item.ty.ValueSliderFloat.step"
                :value="item.value.ValueSliderFloat" @input="set_input_slider_float">
        <template v-slot:append>
          <v-text-field
              :value="item.value.ValueSliderFloat"
              class="mt-0 pt-0"
              hide-details
              single-line
              style="width: 60px"
              @change="set_input_slider_float_immediate"
          >
          </v-text-field>
        </template>
      </v-slider>
    </div>

    <div v-else-if="item.ty.ValueSliderInteger" style="width: 100%; display: flex; flex-direction: column">
      <span style="font-size: 14px;">{{ item.display_name }}</span>
      <span class="mb-2" style="font-size: 12px; color: rgb(178, 178, 178)"
            v-if="item.description">{{ item.description }}</span>
      <v-slider v-model="slider_value" hide-details class="align-center" :min="item.ty.ValueSliderInteger.min_value"
                :max="item.ty.ValueSliderInteger.max_value" :step="item.ty.ValueSliderInteger.step"
                :value="item.value.ValueSliderInteger" @input="set_input_slider_int">
        <template v-slot:append>
          <v-text-field
              :value="item.value.ValueSliderInteger"
              class="mt-0 pt-0"
              hide-details
              single-line
              style="width: 60px"
              @change="set_input_slider_int_immediate"
          >
          </v-text-field>
        </template>
      </v-slider>
    </div>

    <div v-else-if="item.ty.Choice" style="width: 100%; display: flex; flex-direction: column">
      <v-select :items="item.ty.Choice" :label="item.display_name"
                :menu-props="{dark: true}" :value="item.value.Choice"
                dark flat hide-details @change="set_choice"></v-select>
      <span class="mt-2" style="font-size: 12px; color: rgb(178, 178, 178)"
            v-if="item.description">{{ item.description }}</span>
    </div>
    <div v-else-if="item.ty.Checkbox" style="width: 100%; display: flex; flex-direction: column">
      <div style="width: 100%; display: flex; flex-direction: row">
                <span style="font-size: 14px; flex: 0 0 calc(100% - 50px); padding-top: 8px">{{
                    item.display_name
                  }}</span>
        <v-switch :disabled="item.ty.Checkbox.disabled" :input-value="item.value.Checkbox" dark
                  flat style="height: 20px; position: relative; bottom: 13px"
                  @change="set_input_bool"></v-switch>
      </div>
      <span style="font-size: 12px; color: rgb(178, 178, 178)"
            v-if="item.description">{{ item.description }}</span>
    </div>

    <div v-else-if="item.ty.Array" style="width: 100%; display: flex; flex-direction: column">
      <span class="mx-1" style="font-size: 14px;">{{ item.display_name }}</span>
      <span class="mb-2 mx-1" style="font-size: 12px; color: rgb(178, 178, 178)"
            v-if="item.description">{{ item.description }}</span>
      <v-expansion-panels v-if="item.value.Array.length > 0" accordion class="mt-2" dark flat>
        <v-expansion-panel v-for="(sub_item, index) in item.value.Array" :key="index"
                           style="background-color: #2c3e50">
          <v-expansion-panel-header style="color: white">
            {{ index }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <UIValueList :button_index="button_index" :component_name="component_name" :module_name="module_name"
                         :items="sub_item" :serial_number="serial_number" @refresh="refresh"/>
            <div style="width: 100%; display: flex; justify-content: flex-end">
              <v-btn class="mt-2" dark elevation="0" plain @click="remove_element(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <div v-else class="mt-4" style="width: 100%; display: flex; justify-content: center">
        <span class="mx-1" style="font-size: 18px; color: gray">No items</span>
      </div>
      <div style="width: 100%; display: flex; justify-content: flex-end">
        <v-btn class="mt-2" dark elevation="0" plain @click="add_element">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>

    </div>
  </v-card>
</template>

<script>
export default {
  name: "UIValueItem",
  props: ['serial_number', 'button_index', 'component_name', 'item', 'module_name'],
  components: {
    'UIValueList': () => import('./UIValueList')
  },
  async mounted() {
    if (this.item.ty === "Font") {
      this.fonts = await window.sd.list_fonts();
    }
    if (this.item.ty === "ExistingImage" && !this.module_name) {
      this.images = await window.sd.list_images(this.serial_number).catch(() => {
      });
    }
  },
  async updated() {
    if (this.item.ty === "ExistingImage" && !this.module_name) {
      let images = await window.sd.list_images(this.serial_number).catch(() => {
      });

      if (Object.keys(this.images).length !== Object.keys(images).length) {
        this.images = images;
      }
    }
  },
  data() {
    return {
      rules: {
        float(str) {
          if (typeof str != "string") str = str.toString()
          let value = !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
              !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
          return value || "Invalid float"
        },
        int(str) {
          // noinspection EqualityComparisonWithCoercionJS
          let value = !isNaN(str) &&
              parseInt(Number(str)) == str &&
              !isNaN(parseInt(str, 10));

          return value || "Invalid integer"
        },
        positive(str) {
          // noinspection EqualityComparisonWithCoercionJS
          let value = !isNaN(str) &&
              parseInt(Number(str)) == str &&
              !isNaN(parseInt(str, 10));

          return (value && (parseInt(str) >= 0)) || "Invalid positive integer"
        },
        byte(str) {
          // noinspection EqualityComparisonWithCoercionJS
          let value = !isNaN(str) &&
              parseInt(Number(str)) == str &&
              !isNaN(parseInt(str, 10));

          return (value && ((parseInt(str) >= 0) && (parseInt(str) <= 255))) || "Invalid byte"
        }
      },
      fonts: [],
      images: [],
      color_picker_open: false,
      color: null,
      color_handle: null,
      reading_file: false,
      slider_value: this.item.value.ValueSliderFloat || this.item.value.ValueSliderInteger,
      slider_handle: null,
      slider_skip_update: false,
    }
  },
  methods: {
    async set_value(item) {
      if (this.module_name) {
        await window.sd.set_module_value(this.module_name, item);
      } else {
        await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
        await window.sd.commit_changes(this.serial_number);
      }

      this.$emit("refresh");
    },


    async set_input_float(value) {
      let item = this.item;

      item.value = {
        InputFieldFloat: parseFloat(value)
      }

      if (this.rules.float(value) !== "Invalid float") {
        await this.set_value(item);
      }
    },

    async set_input_int(value) {
      let item = this.item;

      item.value = {
        InputFieldInteger: parseInt(value)
      }

      if (this.rules.int(value) !== "Invalid integer") {
        await this.set_value(item);
      }
    },

    async set_input_unsigned_int(value) {
      let item = this.item;

      item.value = {
        InputFieldUnsignedInteger: parseInt(value)
      }

      if (this.rules.positive(value) !== "Invalid positive integer") {
        await this.set_value(item);
      }
    },

    async set_input_bool(value) {
      let item = this.item;

      item.value = {
        Checkbox: value
      }

      await this.set_value(item);
    },

    async set_input_float_left(value) {
      let item = this.item;

      item.value.InputFieldFloat2[0] = parseFloat(value);

      if (this.rules.float(value) !== "Invalid float") {
        await this.set_value(item);
      }
    },

    async set_input_float_right(value) {
      let item = this.item;

      item.value.InputFieldFloat2[1] = parseFloat(value);

      if (this.rules.float(value) !== "Invalid float") {
        await this.set_value(item);
      }
    },

    async set_input_int_left(value) {
      let item = this.item;

      item.value.InputFieldInteger2[0] = parseInt(value);

      if (this.rules.int(value) !== "Invalid integer") {
        await this.set_value(item);
      }
    },

    async set_input_int_right(value) {
      let item = this.item;

      item.value.InputFieldInteger2[1] = parseInt(value);

      if (this.rules.int(value) !== "Invalid integer") {
        await this.set_value(item);
      }
    },

    set_input_slider_float(value) {
      let item = this.item;

      if (this.slider_skip_update) {
        this.slider_skip_update = false;
        return;
      }

      if (!this.slider_handle) {
        this.slider_handle = setTimeout(async () => {
          if (this.rules.float(value) !== "Invalid float") {
            value = item.ty.ValueSliderFloat.allow_out_of_bounds ?
                parseFloat(value) : Math.min(item.ty.ValueSliderFloat.max_value, Math.max(item.ty.ValueSliderFloat.min_value, parseFloat(value)));

            item.value = {
              ValueSliderFloat: value
            }

            await this.set_value(item);
          }

          this.slider_handle = null;
        }, 150);
      }
    },

    async set_input_slider_float_immediate(value) {
      let item = this.item;

      if (this.rules.float(value) !== "Invalid float") {
        value = item.ty.ValueSliderFloat.allow_out_of_bounds ?
            parseFloat(value) : Math.min(item.ty.ValueSliderFloat.max_value, Math.max(item.ty.ValueSliderFloat.min_value, parseFloat(value)));

        item.value = {
          ValueSliderFloat: value
        }

        this.slider_value = value;
        this.slider_skip_update = true;

        await this.set_value(item);
      }
    },

    async set_input_slider_int(value) {
      let item = this.item;

      if (this.slider_skip_update) {
        this.slider_skip_update = false;
        return;
      }

      if (!this.slider_handle) {
        this.slider_handle = setTimeout(async () => {
          if (this.rules.int(value) !== "Invalid integer") {
            value = Math.round(item.ty.ValueSliderInteger.allow_out_of_bounds ?
                parseFloat(value) : Math.min(item.ty.ValueSliderInteger.max_value, Math.max(item.ty.ValueSliderInteger.min_value, parseFloat(value))));

            item.value = {
              InputFieldInteger: value
            }

            await this.set_value(item);
          }

          this.slider_handle = null;
        }, 150);
      }
    },

    async set_input_slider_int_immediate(value) {
      let item = this.item;

      if (this.rules.int(value) !== "Invalid integer") {
        value = Math.round(item.ty.ValueSliderInteger.allow_out_of_bounds ?
            parseFloat(value) : Math.min(item.ty.ValueSliderInteger.max_value, Math.max(item.ty.ValueSliderInteger.min_value, parseFloat(value))));

        item.value = {
          InputFieldInteger: value
        }

        this.slider_value = value;
        this.slider_skip_update = true;

        await this.set_value(item);
      }
    },

    async set_input_color(value) {
      this.color = value.rgba;

      if (!this.color_handle) {
        this.color_handle = setTimeout(async () => {
          let item = this.item;

          item.value.Color = [
            this.color.r,
            this.color.g,
            this.color.b,
            Math.round(this.color.a * 255)
          ];

          await this.set_value(item);

          this.color_handle = null;
        }, 150);
      }


    },

    async set_input_color_r(value) {
      let item = this.item;

      item.value.Color[0] = parseInt(value);

      if (this.rules.byte(value) !== "Invalid byte") {
        await this.set_value(item);
      }
    },

    async set_input_color_g(value) {
      let item = this.item;

      item.value.Color[1] = parseInt(value);

      if (this.rules.byte(value) !== "Invalid byte") {
        await this.set_value(item);
      }
    },

    async set_input_color_b(value) {
      let item = this.item;

      item.value.Color[2] = parseInt(value);

      if (this.rules.byte(value) !== "Invalid byte") {
        await this.set_value(item);
      }
    },

    async set_input_color_a(value) {
      let item = this.item;

      item.value.Color[3] = parseInt(value);

      if (this.rules.byte(value) !== "Invalid byte") {
        await this.set_value(item);
      }
    },

    async set_input_string(value) {
      let item = this.item;

      item.value = {
        InputFieldString: value.toString()
      }

      await this.set_value(item);
    },

    async set_font(value) {
      let item = this.item;

      item.value = {
        Font: value.toString()
      }

      await this.set_value(item);
    },

    async set_choice(value) {
      let item = this.item;

      item.value = {
        Choice: value.toString()
      }

      await this.set_value(item);
    },

    async set_image_data(file) {
      let item = this.item;
      if (file) {
        this.reading_file = true;
        const reader = new FileReader();

        reader.onload = async (data) => {
          item.value = {
            ImageData: btoa(data.target.result)
          }

          await this.set_value(item);
          this.reading_file = false;
        }

        reader.onerror = () => {
          this.reading_file = "Error loading file";

          setTimeout(() => this.reading_file = false, 3000);
        }

        reader.readAsBinaryString(file);
      }
    },

    async set_existing_image(value) {
      let item = this.item;

      item.value = {
        ExistingImage: value.toString()
      }

      await this.set_value(item);
    },

    async add_element() {
      if (this.module_name) {
        await window.sd.add_module_value(this.module_name, this.item.path);
      } else {
        await window.sd.add_component_value(this.serial_number, this.button_index, this.component_name, this.item.path);
      }
      this.$emit("refresh")
    },

    async remove_element(index) {
      if (this.module_name) {
        await window.sd.remove_module_value(this.module_name, this.item.path, index);
      } else {
        await window.sd.remove_component_value(this.serial_number, this.button_index, this.component_name, this.item.path, index);
      }
      this.$emit("refresh")
    },

    refresh() {
      this.$emit("refresh")
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