/**
 * storage helper
 */
export default {
  install(Vue) {
    Vue.prototype.Storage = {
      get: function(key) {
        if (window.localStorage) {
          return localStorage.getItem(key);
        }
        // if browser does not support storage, use cookie instead
        var arr;
        var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
          return unescape(arr[2]);
        } else {
          return null;
        }
      },
      set: function(key, value) {
        if (window.localStorage) {
          localStorage.setItem(key, value);
          return;
        }
        document.cookie = key + "=" + escape(value) + ";path=/";
      },
      remove: function(key) {
        if (window.localStorage) {
          localStorage.removeItem(key);
          return;
        }
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie = key + "=;expires=" + exp.toGMTString();
      },
      clear: function() {
        if (window.localStorage) {
          localStorage.clear();
        }
      }
    };
  }
}
