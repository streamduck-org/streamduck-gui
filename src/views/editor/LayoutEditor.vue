<template>
  <v-row dense style="height: calc(100% - 74px);">
    <v-col cols="3" style="height: 100%">
      <v-card class="fill-height overflow-y-auto" color="#212f45" elevation="0"
              style="border-style: solid; border-width: 3px; border-color: #00000000">
        <div style="display: flex; flex-direction: column; width: calc(100% - 24px)" class="ml-3">
                          <span
                              style="font-size: 10px; color: #495963; font-weight: 500; text-align: left; letter-spacing: 0.0892857143em; line-height: normal; text-transform: uppercase;"
                              class="ml-2 mt-3 mb-3">Components</span>
          <v-expansion-panels flat dark accordion multiple>
            <v-expansion-panel v-for="module in components" :key="module.module"
                               style="background-color: #2c3e50">
              <v-expansion-panel-header style="color: white">
                {{ module.display }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container fluid style="align-items: start; width: 100%">
                  <v-row dense v-for="component in module.components" :key="component.component">
                    <v-tooltip bottom transition="fade-transition" open-delay="500">
                      <template v-slot:activator="{ on, attrs }">
                        <v-card style="width: 100%" class="pa-4 mb-2" draggable="true"
                                color="#00868a" elevation="0"
                                @dragstart="start_component_drag($event, component.component)"
                                @dragend="dragging.component = false" v-bind="attrs"
                                v-on="on">
                          {{ component.display }}
                        </v-card>
                      </template>
                      <span>{{ component.description }}</span>
                    </v-tooltip>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-card>
    </v-col>
    <v-col cols="5" style="height: 100%">
      <v-card class="fill-height" style="background-color: #212f45" elevation="0">
        <div style="display: flex; flex-direction: column; width: 100%; height: 100%">
          <v-container fluid style="height: 102px">
            <v-row dense>
                                  <span
                                      style="font-size: 10px; color: #495963; font-weight: 500; text-align: left; letter-spacing: 0.0892857143em; line-height: normal; text-transform: uppercase;"
                                      class="ml-4 ma-2 mb-2">Stack
                                  </span>
            </v-row>
            <v-row dense>
              <v-col style="flex: 0 0 1; max-width: calc(100% - 150px)">
                <div class="overflow-y-auto" style="height: 52px;">
                  <v-breadcrumbs :items="stack" style="color: white; padding: 5px"
                                 dark></v-breadcrumbs>
                </div>
              </v-col>
              <v-col style="flex: 0 0 68px; max-width: 68px" class="ml-2">
                <v-tooltip bottom transition="fade-transition" open-delay="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn plain height="52px" dark @click="stack_back" v-bind="attrs"
                           v-on="on">
                      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"/>
                      </svg>
                    </v-btn>
                  </template>
                  <span>Back</span>
                </v-tooltip>
              </v-col>
              <v-col style="flex: 0 0 68px; max-width: 68px">
                <v-tooltip bottom transition="fade-transition" open-delay="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn plain height="52px" dark @click="stack_home" v-bind="attrs"
                           v-on="on">
                      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
                      </svg>
                    </v-btn>
                  </template>
                  <span>Go To Root</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-container>
          <v-container fluid fill-height @click.self="clear_selection" :ripple="false" class="card-thing">
            <v-row dense align="center" justify="center" @click.self="clear_selection" :ripple="false"
                   class="card-thing">
              <v-col v-for="(button, index) in buttons" :key="index" :style="button_column_flex"
                     @click.self="clear_selection" :ripple="false" class="card-thing">
                <v-card class="ma-auto square" :style="button_style(button, index)" elevation="0"
                        @click="select_button(index)" :draggable="button.image != null"
                        @dragstart="start_button_drag($event, index)" :ripple="false"
                        @drop="end_drag($event, index)" @dragover.prevent
                        @dragenter="button.drop = dragging.button || dragging.component"
                        @dragleave="button.drop = false" @dragend="dragging.button = false"
                        @contextmenu="show_context_menu($event, index, button)"></v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
    </v-col>
    <v-col cols="4" content="#212f45" style="height: 100%">
      <v-card class="fill-height" style="overflow-y: scroll" color="#212f45" elevation="0"
              @dragover="$event.preventDefault(); component_parameters_drop = dragging.component"
              @dragenter="component_parameters_drop = dragging.component" @drop="end_params_drag($event)"
              @dragleave="component_parameters_drop = false"
              :style="{borderStyle: 'solid', borderWidth: '3px', borderColor: (component_parameters_drop && this.selected_button != null) ? '#44AA00' : '#00000000'}">
        <div style="display: flex; flex-direction: column; width: calc(100% - 24px)" class="ml-3">
                          <span
                              style="font-size: 10px; color: #495963; font-weight: 500; text-align: left; letter-spacing: 0.0892857143em; line-height: normal; text-transform: uppercase;"
                              class="ml-2 mt-3 mb-3">Parameters</span>
          <v-expansion-panels flat dark accordion multiple v-if="component_parameters.length > 0">
            <v-expansion-panel v-for="component in component_parameters" :key="component.component"
                               style="background-color: #2c3e50">
              <v-expansion-panel-header style="color: white">
                <span>{{ component.display }}</span>
                <v-btn style="min-width: 40px; flex: 0 0 40px" plain class="mr-4"
                       @click.native.stop="delete_component(component.component)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <UIValueList :serial_number="serial_number" :button_index="selected_button"
                             :component_name="component.component" :items="component.parameters"
                             @refresh="component.refresh"/>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <span v-if="selected_button == null"
                style="width: 100%; text-align: center; color: #495963; font-size: 14px; font-weight: 400"
                class="mt-6">No button selected...</span>
          <span v-else-if="component_parameters.length <= 0"
                style="width: 100%; text-align: center; color: #495963; font-size: 14px; font-weight: 400"
                class="mt-6">No components...</span>
        </div>
      </v-card>
    </v-col>
    <v-menu v-model="context_menu.show" :position-x="context_menu.x" :position-y="context_menu.y" absolute offset-y
            dark>
      <v-list width="200px" flat>
        <v-list-item v-if="context_menu.item.image" @click="copy_button(context_menu.item_index)">
          Copy
        </v-list-item>
        <v-list-item v-else @click="create_empty(context_menu.item_index)">
          Create empty
        </v-list-item>
        <v-list-item v-if="context_menu.item.image" @click="delete_button(context_menu.item_index)">
          Delete
        </v-list-item>
        <v-list-item v-else :disabled="!clipboard_status" @click="paste_button(context_menu.item_index)">
          Paste
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
</template>

<script>
import UIValueList from "../../components/UIValueList";

export default {
  name: "LayoutEditor",
  components: {
    UIValueList
  },
  data() {
    return {
      context_menu: {
        show: false,
        x: 0,
        y: 0,
        item_index: 0,
        item: {},
      },

      device: null,
      serial_number: "",
      device_type: "",
      buttons: {},
      components: [],
      stack: [],
      component_names: {},
      component_parameters: [],
      component_parameters_drop: false,
      dragging: {
        button: false,
        component: false,
      },
      selected_button: null,
      clipboard_status: false,
    }
  },
  async mounted() {
    let device;
    if ((device = window.store.get("selected-device"))) {
      this.serial_number = device;
      let get_device = async () => {
        this.clipboard_status = await window.sd.clipboard_status() === "Full";
        this.device = await window.sd.get_device(device);
        if (this.device != null) {
          setTimeout(this.full_screen_refresh, 100);
          this.device_type = this.device.device_type;
          if (this.components.length <= 0) {
            await this.refresh_components();
          }
        }
      };

      await get_device();
      await this.full_screen_refresh();
      window.sd.set_sd_listener(this.handle_event);
    }
  },
  methods: {
    async handle_event(event) {
      console.log(event);

      // Whole screen refresh
      if (event.StackReset || event.PanelPushed || event.PanelPopped || event.PanelReplaced) {
        console.log("refreshing all panels")
        window.sd.get_button_images(this.serial_number).then(buttons => {
          let new_buttons = {};

          if (buttons != null) {
            for (let i = 0; i < this.key_count(); i++) {
              let image = buttons[i.toString()];

              new_buttons[i.toString()] = {
                image: image ? image : null,
                drop: (this.buttons[i] && this.buttons[i].drop) || false,
              };
            }
          }

          this.buttons = new_buttons;
          console.log(new_buttons);
        });

        if (this.selected_button) {
          window.sd.get_button(this.serial_number, this.selected_button).then(async button => {
            if (button == null) {
              this.selected_button = null;
            }
            await this.get_parameters();
          }).catch(() => {
          });
        }
      }

      // Breadcrumbs
      if (event.StackReset) {
        this.stack = [{text: event.StackReset.new_panel.display_name}];
      }
      if (event.PanelPushed) {
        this.stack.push({text: event.PanelPushed.new_panel.display_name});
      }
      if (event.PanelPopped) {
        this.stack.pop();
      }
      if (event.PanelReplaced) {
        this.stack.pop();
        this.stack.push({text: event.PanelReplaced.new_panel.display_name})
      }

      // Updating button images
      if (event.ButtonUpdated || event.ButtonAdded) {
        let key = event.ButtonUpdated ? event.ButtonUpdated.key.toString() : event.ButtonAdded.key.toString();
        this.buttons[key].image = await window.sd.get_button_image(this.serial_number, key);
        this.$emit("layout-changed");
      }

      if (event.ButtonDeleted) {
        this.buttons[event.ButtonDeleted.key.toString()].image = null;
        this.$emit("layout-changed");
      }

      // Device connection
      if (event.DeviceConnected) {
        if (event.DeviceConnected.serial_number === this.serial_number) {
          this.device.online = true;
        }
      }

      if (event.DeviceDisconnected) {
        if (event.DeviceDisconnected.serial_number === this.serial_number) {
          this.device.online = false;
        }
      }
    },

    async select_button(key) {
      if (this.buttons[key].image) {
        if (this.selected_button === key) {
          await window.sd.do_button_action(this.serial_number, parseInt(key));
          this.selected_button = null;
          await this.get_parameters();
        } else {
          this.selected_button = key;
          await this.get_parameters();
        }
      } else {
        this.selected_button = null;
        await this.get_parameters();
      }
    },

    async event_refresh() {
      window.layout_changed = true;
      await this.get_parameters();
    },

    async get_parameters() {
      let component_params = [];

      if (this.selected_button !== null) {
        let button;
        if ((button = await window.sd.get_button(this.serial_number, this.selected_button))) {
          for (let component in button) {
            let values;
            if ((values = await window.sd.get_component_values(this.serial_number, this.selected_button, component))) {
              component_params.push({
                component,
                display: this.component_names[component],
                parameters: values,
                refresh: this.event_refresh
              });
            }
          }
        }
      }

      this.component_parameters = component_params;
    },

    async delete_component(component) {
      await window.sd.remove_component(this.serial_number, this.selected_button, component);
      await window.sd.commit_changes(this.serial_number);
      this.$emit("layout-changed");
      await this.get_parameters();
    },

    async clear_selection() {
      this.selected_button = null;
      await this.get_parameters();
    },

    show_context_menu(e, index, item) {
      e.preventDefault()
      this.context_menu.show = false
      this.context_menu.x = e.clientX
      this.context_menu.y = e.clientY
      this.context_menu.item_index = index;
      this.context_menu.item = item;
      this.$nextTick(() => {
        this.context_menu.show = true
      })
    },

    key_count() {
      if (this.device) {
        let type = this.device_type;

        if (type === "Mini") {
          return 6;
        } else if (type === "XL") {
          return 32;
        } else {
          return 15;
        }
      } else {
        return 0;
      }
    },

    async stack_back() {
      await window.sd.pop_screen(this.serial_number);
    },

    async stack_home() {
      await window.sd.drop_stack_to_root(this.serial_number);
    },

    async full_screen_refresh() {
      await window.sd.get_button_images(this.serial_number).then(buttons => {
        let new_buttons = {};

        if (buttons != null) {
          for (let i = 0; i < this.key_count(); i++) {
            let image = buttons[i.toString()];

            new_buttons[i.toString()] = {
              image: image ? image : null,
              drop: (this.buttons[i] && this.buttons[i].drop) || false,
            };
          }
        }

        this.buttons = new_buttons;
      });


      window.sd.get_stack_names(this.serial_number).then(stack => {
        this.stack = [];

        if (stack != null) {
          for (let i = 0; i < stack.length; i++) {
            this.stack.push({text: stack[i]});
          }
        }
      }).catch(() => {
      });


      if (this.selected_button) {
        window.sd.get_button(this.serial_number, this.selected_button).then(async button => {
          if (button == null) {
            this.selected_button = null;
            await this.get_parameters();
          }
        }).catch(() => {
        });
      }
    },

    async refresh_components() {
      let map = await window.sd.list_components();

      this.components = [];

      for (let module in map) {
        let components = [];

        for (let component in map[module]) {
          this.component_names[component] = map[module][component].display_name;

          components.push({
            component,
            display: map[module][component].display_name,
            description: map[module][component].description,
          });
        }

        this.components.push({
          module,
          display: module,
          components
        })
      }
    },

    async create_empty(index) {
      await window.sd.new_button(this.serial_number, index);
      await window.sd.commit_changes(this.serial_number);
      this.$emit("layout-changed");
    },

    async copy_button(index) {
      await window.sd.copy_button(this.serial_number, index);
      this.clipboard_status = true;
    },

    async delete_button(index) {
      await window.sd.clear_button(this.serial_number, index);
      await window.sd.commit_changes(this.serial_number);
      this.$emit("layout-changed");
      this.selected_button = null;
      await this.get_parameters();
    },

    async paste_button(index) {
      await window.sd.paste_button(this.serial_number, index);
      await window.sd.commit_changes(this.serial_number);
      this.$emit("layout-changed");
    },

    button_style(button, index) {
      return this.button_size +
          (button.image ? `background-image: url(${'data:image/png;base64,' + button.image}); background-size: 101% 101%; background-color: #000000` : `background-color: #2c3e50`) +
          (`; border-style: ${(this.selected_button === index || button.drop) ? 'solid' : 'none'}; border-width: 3px; ${button.drop ? 'border-color: #44AA00' : 'border-color: white'}`);
    },

    start_button_drag(evt, index) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('index', index)
      this.dragging.button = true;
    },

    start_component_drag(evt, component) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('component', component)
      this.dragging.component = true;
    },

    async end_drag(evt, index) {
      // Dragging buttons around
      const old_index = evt.dataTransfer.getData('index');
      if ((old_index !== "") && (index !== old_index)) {
        if ((await window.sd.get_button(this.serial_number, index)) == null) {
          this.selected_button = null;
          await this.get_parameters();
          let new_button = await window.sd.get_button(this.serial_number, parseInt(old_index));
          if (new_button != null) {
            await window.sd.set_button(this.serial_number, index, new_button);
            await window.sd.clear_button(this.serial_number, old_index);
            await window.sd.commit_changes(this.serial_number);
            this.$emit("layout-changed");
          }
        }
      }

      // Dragging new components
      const component = evt.dataTransfer.getData('component');
      if (component !== "") {
        if ((await window.sd.get_button(this.serial_number, index)) == null) {
          await window.sd.new_button_from_component(this.serial_number, index, component);
          await window.sd.commit_changes(this.serial_number);
          this.$emit("layout-changed");
        } else {
          await window.sd.add_component(this.serial_number, index, component);
          await window.sd.commit_changes(this.serial_number);
          await this.get_parameters();
          this.$emit("layout-changed");
        }
      }

      this.buttons[index].drop = false;
    },

    async end_params_drag(evt) {
      // Dragging new components
      const component = evt.dataTransfer.getData('component');
      if (component !== "") {
        if (this.selected_button != null) {
          await window.sd.add_component(this.serial_number, this.selected_button, component);
          await window.sd.commit_changes(this.serial_number);
          await this.get_parameters();
          this.$emit("layout-changed");
        }
      }

      this.component_parameters_drop = false;
    }
  },
  computed: {
    button_size() {
      let type = this.device_type;

      if (type === "Mini") {
        return `min-width: 150px;`
      } else if (type === "XL") {
        return `min-width: 50px;`
      } else {
        return `min-width: 100px;`
      }
    },

    button_column_flex() {
      let type = this.device_type;

      if (type === "Mini") {
        return `flex: 0 0 33.333333%; max-width: 33.333333%`
      } else if (type === "XL") {
        return `flex: 0 0 12.5%; max-width: 12.5%`
      } else {
        return `flex: 0 0 20%; max-width: 20%`
      }
    }
  }
}
</script>

<style>
.square:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.card-thing {
  cursor: auto
}

.card-thing::before {
  display: none;
}

.v-expansion-panel-content__wrap {
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
}
</style>