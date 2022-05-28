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
                win: {
                    publish: ['github']
                },
                linux: {
                    publish: ['github']
                }
            }
        }
    }
})
