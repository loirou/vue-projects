/**
 * static data
 */

let _appcode = ''; //钱盒入口appcode
//根据不同构建环境加载不同配置
switch (__ENV__) {
  case 'dev': //开发环境
  case 'qa': //测试环境
    _appcode = '2001233';
    break;
  case 'prod': //生产环境
    _appcode = '2001234';
    break;
  default:
    break;
}

export default {
  APP_CODE : _appcode, //钱盒入口appcode
  SECRET_KEY : '!QA2Z@w1sxO*(-8L', //加密串
  PAYMENT_CHANNEL : 'IBOXPAY', //支付渠道
  RECHARGE_CHANNEL : 1, //充值渠道：1代表汇赚钱
  SALES_ID : 1, //销售平台：1代表钱盒
  //代扣支持的银行
  BANKS : [
    {
      code: '103100000026',
      name: '中国农业银行'
    }, {
      code: '105100000017',
      name: '中国建设银行'
    }, {
      code: '303100000006',
      name: '中国光大银行'
    }, {
      code: '307584007998',
      name: '平安银行'
    }, {
      code: '309391000011',
      name: '兴业银行'
    }, {
      code: '302100011000',
      name: '中信银行'
    }, {
      code: '403100000004',
      name: '中国邮政储蓄银行'
    }, {
      code: '305100000013',
      name: '中国民生银行'
    }, {
      code: '104100000004',
      name: '中国银行'
    }, {
      code: '102100099996',
      name: '中国工商银行'
    }, {
      code: '306581000003',
      name: '广发银行'
    }
  ]
}
