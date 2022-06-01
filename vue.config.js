const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: [
        'vuetify'
    ],
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            builderOptions: {
                appId: 'org.streamduck.streamduck-gui',
                productName: 'Streamduck GUI',
                win: {
                    target: ['nsis'],
                    publish: ['github'],
                    icon: "build/icons/icon.png"
                },
                linux: {
                    target: ['AppImage'],
                    publish: ['github'],
                    icon: "build/icons/icon.png"
                }
            }
        }
    }
})
