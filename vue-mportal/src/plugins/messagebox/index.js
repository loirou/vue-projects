import Vue from 'vue';

const Indicator = Vue.extend(require('./messagebox.vue'));
let instance;
let timer;

module.exports = {
    alert(options) {
        if (!instance) {
            instance = new Indicator({
                el: document.createElement('div')
            });
        }
        if (instance.visible) return;
        if (typeof options === 'string') {
            instance.text = options;
        } else if (Object.prototype.toString.call(options) === '[object Object]') {
            instance.text = options.text || '';
        } else {
            instance.text = '';
        }
        instance.$appendTo(document.body);

        Vue.nextTick(() => {
            instance.visible = true;
        });
    }
};
