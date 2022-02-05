import Vue from 'vue'
import Validator from './lib/Validator'
import VueShortkey from 'vue-shortkey'
import * as VeeValidate from 'vee-validate'
import * as VeeRules from 'vee-validate/dist/rules'

Validator(VeeValidate, VeeRules)
Vue.use(VueShortkey)
