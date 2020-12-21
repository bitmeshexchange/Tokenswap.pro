'use strict';
const path = require('path');
const webpack = require('webpack');

export default {
   alias: {
       'src': path.join(__dirname, './src'),
       'i18n': path.join(__dirname, './src/i18n'),
       "mixins": path.join(__dirname, './src/mixins'),
       "components": path.join(__dirname, './src/components'),
       "config": path.join(__dirname, './src/common/config'),
       "api": path.join(__dirname, './src/api'),
       "utils": path.join(__dirname, './src/common/utils'),
   },
    "extraBabelPlugins": [
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
    ],
    theme: './src/common/theme.js',
}