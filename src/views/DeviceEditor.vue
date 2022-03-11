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
                <v-card
                    :style="(device != null && device.online) ? 'background-image: linear-gradient(150deg, #00868a, #00607a)' : 'background-color: #212f45'"
                    elevation="0">
                    <v-card-text class="pa-3">
                        <div
                            style="display: flex; flex-direction: column; letter-spacing: 0.0892857143em; line-height: normal; text-transform: uppercase;">
                            <span
                                style="color: white; font-size: 18px; font-weight: 500; text-align: center">{{ serial_number }}</span>
                            <span
                                style="font-size: 10px; color: darkGray; font-weight: 500; text-align: center">{{ device_type }}</span>
                        </div>
                    
                    </v-card-text>
                </v-card>
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
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
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
                        <v-btn height="100%" elevation="0" plain style="color: white" v-bind="attrs" v-on="on">
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
                <v-card class="fill-height overflow-y-auto" color="#212f45" elevation="0"
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
        </v-row>
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
                <v-list-item v-else :disabled="!check_clipboard()" @click="paste_button(context_menu.item_index)">
                    Paste
                </v-list-item>
            </v-list>
        </v-menu>
    </v-container>
</template>

<script>
import UIValueList from "../components/UIValueList";

export default {
    name: "DeviceEditor",
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
            buttons: [],
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
            layout_changed: false,
        }
    },
    mounted() {
        let device;
        if ((device = window.store.get("selected-device"))) {
            this.serial_number = device;
            let get_device = async () => {
                this.device = await window.sd.get_device(device);
                if (this.device != null) {
                    this.device_type = this.device.device_type;
                    if (this.components.length <= 0) {
                        await this.refresh_components();
                    }
                }
            };
            
            clearInterval(window.device_list);
            clearInterval(window.device_tick);
            clearInterval(window.refresh_tick);
            
            get_device();
            this.refresh_screen();
            window.device_tick = setInterval(get_device, 2000);
            window.refresh_tick = setInterval(this.refresh_screen, 700)
        } else {
            this.$router.push({name: "DeviceList"});
        }
        
        
    },
    methods: {
        go_back() {
            window.store.clear("selected-device");
            this.$router.push({name: "DeviceList"});
        },
        
        async select_button(key) {
            if (this.buttons[key].image) {
                if (this.selected_button === key) {
                    await window.sd.do_button_action(this.serial_number, key);
                    this.selected_button = null;
                    await this.get_parameters();
                    await this.refresh_screen();
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
            this.layout_changed = true;
            await this.get_parameters();
            setTimeout(async () => await this.refresh_screen(), 50);
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
            this.layout_changed = true;
            await this.get_parameters();
            setTimeout(async () => await this.refresh_screen(), 50);
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
        
        async reload_config() {
            await window.sd.reload_device_config(this.serial_number);
            this.layout_changed = false;
            this.selected_button = null;
            await this.get_parameters();
            setTimeout(async () => await this.refresh_screen(), 50);
        },
        
        async save_config() {
            await window.sd.save_device_config(this.serial_number);
            this.layout_changed = false;
            setTimeout(async () => await this.refresh_screen(), 50);
        },
        
        async stack_back() {
            await window.sd.pop_screen(this.serial_number);
            await this.refresh_screen();
        },
        
        async stack_home() {
            await window.sd.drop_stack_to_root(this.serial_number);
            await this.refresh_screen();
        },
        
        async refresh_screen() {
            window.sd.get_button_images(this.serial_number).then(buttons => {
                let new_buttons = [];
                
                if (buttons != null) {
                    for (let i = 0; i < this.key_count(); i++) {
                        let image = buttons[i.toString()];
                        
                        new_buttons.push({
                            index: i,
                            image: image ? image : null,
                            drop: (this.buttons[i] && this.buttons[i].drop) || false,
                        });
                    }
                }
                
                this.buttons = new_buttons;
            }).catch(() => {
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
            this.layout_changed = true;
            setTimeout(async () => await this.refresh_screen(), 50);
        },
        
        async copy_button(index) {
            let button;
            if ((button = await window.sd.get_button(this.serial_number, index))) {
                window.button_clipboard = button;
            }
        },
        
        async delete_button(index) {
            await window.sd.clear_button(this.serial_number, index);
            await window.sd.commit_changes(this.serial_number);
            this.layout_changed = true;
            this.selected_button = null;
            await this.get_parameters();
            setTimeout(async () => await this.refresh_screen(), 50);
        },
        
        async paste_button(index) {
            await window.sd.set_button(this.serial_number, index, window.button_clipboard);
            await window.sd.commit_changes(this.serial_number);
            this.layout_changed = true;
            setTimeout(async () => await this.refresh_screen(), 50);
        },
        
        button_style(button, index) {
            return this.button_size +
                (button.image ? `background-image: url(${'data:image/png;base64,' + button.image}); background-size: 101% 101%; background-color: #2c3e50` : `background-color: #2c3e50`) +
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
                        await window.sd.clear_button(this.serial_number, parseInt(old_index));
                        await window.sd.commit_changes(this.serial_number);
                        setTimeout(async () => await this.refresh_screen(), 50);
                        this.layout_changed = true;
                    }
                }
            }
            
            // Dragging new components
            const component = evt.dataTransfer.getData('component');
            if (component !== "") {
                if ((await window.sd.get_button(this.serial_number, index)) == null) {
                    await window.sd.new_button_from_component(this.serial_number, index, component);
                    await window.sd.commit_changes(this.serial_number);
                    setTimeout(async () => await this.refresh_screen(), 50);
                    this.layout_changed = true;
                } else {
                    await window.sd.add_component(this.serial_number, index, component);
                    await window.sd.commit_changes(this.serial_number);
                    await this.get_parameters();
                    setTimeout(async () => await this.refresh_screen(), 50);
                    this.layout_changed = true;
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
                    setTimeout(async () => await this.refresh_screen(), 50);
                    this.layout_changed = true;
                }
            }
            
            this.component_parameters_drop = false;
        },
        
        check_clipboard() {
            return !!window.button_clipboard;
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