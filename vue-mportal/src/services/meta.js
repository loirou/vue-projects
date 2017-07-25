/**
 * create by youhy on 16/03/2017
 * meta data service
 */
import Vue from 'vue'; //vue
import HttpUrl from '../common/js/http-url.js';

const _this = new Vue();
export default {
  // supported bank list
  getSupportedBanks : function(cfg) {
    const config = Object.assign({}, {
      method: "GET",
      url: HttpUrl.my_bank_supported
    }, cfg);
    return _this.$http(config);
  }
}
