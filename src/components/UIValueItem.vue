<template>
    <v-card elevation="0" style="background-color: #212f45" width="100%" class="mb-1 pa-4">
        <!--        {{ item.path }}-->
        <div v-if="item.ty === 'Header'" style="width: calc(100% - 32px); font-size: 18px; text-align: center"
             class="fancy">
            <span>{{ item.display_name }}
            </span></div>
        <v-text-field v-else-if="item.ty === 'Label'" :label="item.display_name" flat readonly dark outlined
                      :value="item.value.Label" hide-details disabled></v-text-field>
        <v-text-field v-else-if="item.ty === 'InputFieldFloat'" :label="item.display_name" :rules="[rules.float]"
                      :value="Math.round(item.value.InputFieldFloat * 1000) / 1000"
                      @change="set_input_float"></v-text-field>
        <v-text-field v-else-if="item.ty === 'InputFieldInteger'" :label="item.display_name" :rules="[rules.int]"
                      :value="item.value.InputFieldInteger" @change="set_input_int"></v-text-field>
        <v-text-field v-else-if="item.ty === 'InputFieldString'" :label="item.display_name"
                      :value="item.value.InputFieldString" @change="set_input_string" hide-details></v-text-field>
        <div v-else-if="item.ty === 'InputFieldFloat2'" style="width: 100%; display: flex; flex-direction: column">
            <span style="font-size: 14px;" class="mb-2">{{ item.display_name }}</span>
            <div style="width: 100%; display: flex; flex-direction: row">
                <v-text-field :rules="[rules.float]" label="X"
                              :value="Math.round(item.value.InputFieldFloat2[0] * 1000) / 1000" class="mr-1"
                              @change="set_input_float_left"></v-text-field>
                <v-text-field :rules="[rules.float]" label="Y"
                              :value="Math.round(item.value.InputFieldFloat2[1] * 1000) / 1000" class="ml-1"
                              @change="set_input_float_right"></v-text-field>
            </div>
        </div>
        <div v-else-if="item.ty === 'InputFieldInteger2'" style="width: 100%; display: flex; flex-direction: column">
            <span style="font-size: 14px;" class="mb-2">{{ item.display_name }}</span>
            <div style="width: 100%; display: flex; flex-direction: row">
                <v-text-field :rules="[rules.int]" :value="item.value.InputFieldInteger2[0]" label="X" class="mr-1"
                              @change="set_input_int_left"></v-text-field>
                <v-text-field :rules="[rules.int]" :value="item.value.InputFieldInteger2[1]" label="Y" class="ml-1"
                              @change="set_input_int_right"></v-text-field>
            </div>
        </div>
        <v-text-field v-else-if="item.ty === 'InputFieldUnsignedInteger'" :label="item.display_name"
                      :rules="[rules.positive]" :value="item.value.InputFieldUnsignedInteger"
                      @change="set_input_unsigned_int"></v-text-field>
        <div v-else-if="item.ty === 'Color'" style="width: 100%; display: flex; flex-direction: column">
            <span style="font-size: 14px;" class="mb-2">{{ item.display_name }}</span>
            <div style="width: 100%; display: flex; flex-direction: row">
                <v-text-field :rules="[rules.byte]" :value="item.value.Color[0]" label="Red" class="mr-2"
                              @change="set_input_color_r"></v-text-field>
                <v-text-field :rules="[rules.byte]" :value="item.value.Color[1]" label="Green" class="mr-2"
                              @change="set_input_color_g"></v-text-field>
                <v-text-field :rules="[rules.byte]" :value="item.value.Color[2]" label="Blue" class="mr-2"
                              @change="set_input_color_b"></v-text-field>
                <v-text-field :rules="[rules.byte]" :value="item.value.Color[3]" label="Alpha"
                              @change="set_input_color_a"></v-text-field>
                <v-menu :close-on-content-click="false" v-model="color_picker_open" left>
                    <template v-slot:activator="{ on }">
                        <div
                            :style="{backgroundColor: `rgba(${item.value.Color[0]}, ${item.value.Color[1]}, ${item.value.Color[2]}, ${item.value.Color[3] / 255})`, width: '30px', height: '30px', borderRadius: '4px', borderStyle: 'solid', borderWidth: '1px', borderColor: 'white'}"
                            class="pl-7 ml-2 mt-4" v-on="on"/>
                    </template>
                    <v-card>
                        <v-card-text class="pa-0">
                            <v-color-picker
                                :value="{r: item.value.Color[0], g: item.value.Color[1], b: item.value.Color[2], a: item.value.Color[3] / 255}"
                                @update:color="set_input_color" dark flat/>
                        </v-card-text>
                    </v-card>
                </v-menu>
            </div>
        </div>
        <v-select v-else-if="item.ty === 'Font'" dark flat :label="item.display_name" :items="fonts"
                  :value="item.value.Font" @change="set_font" hide-details :menu-props="{dark: true}"></v-select>
        <v-select v-else-if="item.ty.Choice" dark flat :label="item.display_name" :items="item.ty.Choice"
                  :value="item.value.Choice" @change="set_choice" hide-details :menu-props="{dark: true}"></v-select>
        <div v-else-if="item.ty.Checkbox" style="width: 100%; display: flex; flex-direction: row">
            <span style="font-size: 14px; flex: 0 0 calc(100% - 50px); padding-top: 8px">{{ item.display_name }}</span>
            <v-switch :input-value="item.value.Checkbox" style="height: 20px; position: relative; bottom: 13px" dark
                      flat :disabled="item.ty.Checkbox.disabled" @change="set_input_bool"></v-switch>
        </div>
        <div v-else-if="item.ty.Array" style="width: 100%;">
            <span style="font-size: 14px;" class="mx-1">{{ item.display_name }}</span>
            <v-expansion-panels v-if="item.value.Array.length > 0" accordion flat dark class="mt-2">
                <v-expansion-panel v-for="(sub_item, index) in item.value.Array" :key="index"
                                   style="background-color: #2c3e50">
                    <v-expansion-panel-header style="color: white">
                        {{ index }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <UIValueList :serial_number="serial_number" :button_index="button_index"
                                     :component_name="component_name" :items="sub_item" @refresh="refresh"/>
                        <div style="width: 100%; display: flex; justify-content: flex-end">
                            <v-btn dark plain elevation="0" class="mt-2" @click="remove_element(index)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <div v-else style="width: 100%; display: flex; justify-content: center" class="mt-4">
                <span style="font-size: 18px; color: gray" class="mx-1">No items</span>
            </div>
            <div style="width: 100%; display: flex; justify-content: flex-end">
                <v-btn dark plain elevation="0" class="mt-2" @click="add_element">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </div>
        
        </div>
    </v-card>
</template>

<script>
export default {
    name: "UIValueItem",
    props: ['serial_number', 'button_index', 'component_name', 'item'],
    components: {
        'UIValueList': () => import('./UIValueList')
    },
    async mounted() {
        this.fonts = await window.sd.list_fonts();
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
            color_picker_open: false,
            color: null,
            color_handle: null
        }
    },
    methods: {
        async set_input_float(value) {
            let item = this.item;
            
            item.value = {
                InputFieldFloat: parseFloat(value)
            }
            
            if (this.rules.float(value) !== "Invalid float") {
                await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
                await window.sd.commit_changes(this.serial_number);
                this.$emit("refresh")
            }
        },
        
        async set_input_int(value) {
            let item = this.item;
            
            item.value = {
                InputFieldInteger: parseInt(value)
            }
            
            if (this.rules.int(value) !== "Invalid integer") {
                await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
                await window.sd.commit_changes(this.serial_number);
                this.$emit("refresh")
            }
        },
        
        async set_input_unsigned_int(value) {
            let item = this.item;
            
            item.value = {
                InputFieldUnsignedInteger: parseInt(value)
            }
            
            if (this.rules.positive(value) !== "Invalid positive integer") {
                await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
                await window.sd.commit_changes(this.serial_number);
                this.$emit("refresh")
            }
        },
        
        async set_input_bool(value) {
            let item = this.item;
            
            item.value = {
                Checkbox: value
            }
            
            await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
            await window.sd.commit_changes(this.serial_number);
            this.$emit("refresh")
        },
        
        async set_input_float_left(value) {
            let item = this.item;
            
            item.value.InputFieldFloat2[0] = parseFloat(value);
            
            if (this.rules.float(value) !== "Invalid float") {
                await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
                await window.sd.commit_changes(this.serial_number);
                this.$emit("refresh")
            }
        },
        
        async set_input_float_right(value) {
            let item = this.item;
            
            item.value.InputFieldFloat2[1] = parseFloat(value);
            
            if (this.rules.float(value) !== "Invalid float") {
                await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
                await window.sd.commit_changes(this.serial_number);
                this.$emit("refresh")
            }
        },
        
        async set_input_int_left(value) {
            let item = this.item;
            
            item.value.InputFieldInteger2[0] = parseInt(value);
            
            if (this.rules.int(value) !== "Invalid integer") {
                await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
                await window.sd.commit_changes(this.serial_number);
                this.$emit("refresh")
            }
        },
        
        async set_input_int_right(value) {
            let item = this.item;
            
            item.value.InputFieldInteger2[1] = parseInt(value);
            
            if (this.rules.int(value) !== "Invalid integer") {
                await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
                await window.sd.commit_changes(this.serial_number);
                this.$emit("refresh")
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
                    
                    await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
                    await window.sd.commit_changes(this.serial_number);
                    this.$emit("refresh");
                    
                    this.color_handle = null;
                }, 100);
            }
            
            
        },
        
        async set_input_color_r(value) {
            let item = this.item;
            
            item.value.Color[0] = parseInt(value);
            
            if (this.rules.byte(value) !== "Invalid byte") {
                await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
                await window.sd.commit_changes(this.serial_number);
                this.$emit("refresh")
            }
        },
        
        async set_input_color_g(value) {
            let item = this.item;
            
            item.value.Color[1] = parseInt(value);
            
            if (this.rules.byte(value) !== "Invalid byte") {
                await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
                await window.sd.commit_changes(this.serial_number);
                this.$emit("refresh")
            }
        },
        
        async set_input_color_b(value) {
            let item = this.item;
            
            item.value.Color[2] = parseInt(value);
            
            if (this.rules.byte(value) !== "Invalid byte") {
                await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
                await window.sd.commit_changes(this.serial_number);
                this.$emit("refresh")
            }
        },
        
        async set_input_color_a(value) {
            let item = this.item;
            
            item.value.Color[3] = parseInt(value);
            
            if (this.rules.byte(value) !== "Invalid byte") {
                await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
                await window.sd.commit_changes(this.serial_number);
                this.$emit("refresh")
            }
        },
        
        async set_input_string(value) {
            let item = this.item;
            
            item.value = {
                InputFieldString: value.toString()
            }
            
            await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
            await window.sd.commit_changes(this.serial_number);
            this.$emit("refresh")
        },
        
        async set_font(value) {
            let item = this.item;
            
            item.value = {
                Font: value.toString()
            }
            
            await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
            await window.sd.commit_changes(this.serial_number);
            this.$emit("refresh")
        },
        
        async set_choice(value) {
            let item = this.item;
            
            item.value = {
                Choice: value.toString()
            }
            
            await window.sd.set_component_value(this.serial_number, this.button_index, this.component_name, item);
            await window.sd.commit_changes(this.serial_number);
            this.$emit("refresh")
        },
        
        async add_element() {
            await window.sd.add_component_value(this.serial_number, this.button_index, this.component_name, this.item.path);
            this.$emit("refresh")
        },
        
        async remove_element(index) {
            await window.sd.remove_component_value(this.serial_number, this.button_index, this.component_name, this.item.path, index);
            this.$emit("refresh")
        },
        
        refresh() {
            this.$emit("refresh")
        }
    }
}
</script>

<style scoped>

</style>