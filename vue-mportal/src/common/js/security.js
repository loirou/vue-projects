/**
 * 加密解密
 * 不再全量引用cryptojs，改为之引用AES加密算法相关模块
 * 压缩后能节省大约400K大小
 */
import Data from './data.js';

//cryptojs核心模块
const _crypto = require('crypto-js/core');
//AES加密模块
const _aes = require("crypto-js/aes");
//ECB加密方式
const _ecbMode = require('crypto-js/mode-ecb');
export default {
  // 加密
  encrypt : function(value) {
    // 秘钥格式转换
    var key = _crypto.enc.Utf8.parse(Data.SECRET_KEY);
    // 加密文本格式转换
    var srcs = _crypto.enc.Utf8.parse(value);
    // 开始加密
    var encrypted = _crypto.AES.encrypt(srcs, key, {
      mode: _crypto.mode.ECB,
      padding: _crypto.pad.Pkcs7
    });
    return encrypted.toString();
  },
  // 解密
  decrypt : function(value) {
    // 秘钥格式转换
    var key = _crypto.enc.Utf8.parse(Data.SECRET_KEY);
    // 开始解密
    var decrypt = _crypto.AES.decrypt(value, key, {
      mode: _crypto.mode.ECB,
      padding: _crypto.pad.Pkcs7
    });
    // 解密文本格式转换
    return _crypto.enc.Utf8.stringify(decrypt).toString();
  }
}
