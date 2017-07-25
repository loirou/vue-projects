/**
 * create by youhy on 21/03/2017
 * account data service
 */
import Vue from 'vue'; //vue
import HttpUrl from '../common/js/http-url.js';

const _this = new Vue();

export default {
  // get amount state: hidden or visibility
  getAmountHiddenState: function(cfg) {
    const config = Object.assign({}, {
      method: "GET",
      url: HttpUrl.get_amount_hidden_state
    }, cfg);
    return _this.$http(config);
  },
  // set amount state: hidden or visibility
  setAmountHiddenState: function(cfg) {
    const config = Object.assign({}, {
      method: "POST",
      url: HttpUrl.set_amount_hidden_state,
      ignoreIndicator: true,
    }, cfg);
    return _this.$http(config);
  }
}
