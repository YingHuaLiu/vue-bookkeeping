import Vue from 'vue'

import 'vue-ydui/dist/ydui.base.css'

const {Button, ButtonGroup} = require('vue-ydui/dist/lib.px/button')
const {DateTime} = require('vue-ydui/dist/lib.px/datetime')

Vue.component(Button.name, Button)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component(DateTime.name, DateTime)
