/**
  * Created by Darren_YCDing on 16/11/14.
  */
'use strict';

let http_url = ''; //接口地址根路径
let http_url2 = ''; //接口地址根路径
let fileUrl = ''; //文件服务器复制
let wxUrl = ''; //微信路径
let wxCallback = ''; // 微信回调地址
let hcqUrl = ''; // 汇存钱地址
//根据不同构建环境加载不同配置
switch (__ENV__) {
  case 'dev': //开发环境
    http_url = 'http://172.21.1.205:8088';
    http_url2 = 'http://172.21.1.205:8090';
    fileUrl = 'http://172.21.1.206';
    wxUrl = 'http://xjg.h2finance.com';
    wxCallback = 'http://172.21.1.204:5001';
    hcqUrl = 'http://172.21.1.204:5002';
    // hcqUrl = 'http://localhost:3000';
    break;
  case 'qa': //测试环境
    http_url = 'http://172.21.1.234:8088';
    http_url2 = 'http://172.21.1.234:8090';
    fileUrl = 'http://172.21.1.206';
    wxUrl = 'http://172.21.1.234:8080';
    wxCallback = 'http://172.21.1.231:5001';
    hcqUrl = 'http://172.21.1.231:5002';
    break;
  case 'prod': //生产环境
    http_url = 'http://hzq.h2finance.com';
    http_url2 = 'http://hzq.h2finance.com';
    fileUrl = 'http://hzq.h2finance.com';
    wxUrl = 'http://xjg.h2finance.com';
    wxCallback = 'http://hzq.h2finance.com';
    hcqUrl = 'http://xjg.h2finance.com';
    break;
  default:
    break;
}
const img_url = fileUrl;
const hzq_api = `${http_url}/hzq-api`; //公共模块
const investment_api = `${http_url}/investment-api`; //投资-1
const purchase_api = `${http_url}/purchase-api`; // 投资-2
const account_api = `${http_url}/account-api`; //账户
const recharge_api = `${http_url}/recharge-api`; //充值
const withdraw_api = `${http_url}/withdraw-api`; //提现
const metadata_api = `${http_url}/api-metadata`; //验证银行卡
const coupon_api = `${http_url2}/coupon-api`; // 卡券
const current_domain = window.location.origin; //当前 //http://localhost:8088/my/recharge
const wx_api = `${wxUrl}/wx`; // 微信api
const feedback_api = `${wxUrl}/feedback-api`; //微信意见反馈

let config_url = {
  hcq: `${hcqUrl}`, // 汇存钱路径
  recharge_callback_url: `${current_domain}/my/recharge-finish`,
  img_url: img_url,
  login: `${hzq_api}/register/`, //一键登录  GET 丁延超/位金越
  my: `${account_api}/account/getAccountPage/`, //我的页面接口  GET 丁延超/万子龙
  buy_password: `${purchase_api}/bidding/bidding`, //立即投资  POST 丁延超/万子龙
  // buy_password: `http://172.21.20.25:8080/bidding/bidding`,
  buy_finish: `${purchase_api}/bidding/detail/`, //购买完成页面接口  GET 丁延超/万子龙
  buy_financing: `${hzq_api}/hzq/project/saleInfo`, //项目投资页面接口  POST 丁延超/位金越
  buy_proInfo_list: `${hzq_api}/hzq/project/investor`, //产品详情-第二页-投资信息页面接口  POST 丁延超/位金越
  list_home: `${hzq_api}/hzq/project/recommendTarget`, //首页-标的产品列表  GET 高燕茹/位金越
  list_assets: `${account_api}/account/allAmount/`, //我的-资产一览  GET 高燕茹/万子龙
  list_assetsList: `${account_api}/account/accountLog/`, //我的-资产明细  GET 高燕茹/万子龙
  list_assetsListForce: `${account_api}/account/getAssetDetailOfEnforce/`, //我的-资产明细 强制刷新 GET 高燕茹/万子龙
  my_recordTender: `${purchase_api}/bidding/allList`, //我的-投资记录-投标中  GET 高燕茹/万子龙
  my_record: `${investment_api}/investment/allList`, //我的-投资记录-还款中/已结清  GET 高燕茹/万子龙
  my_free_balance: `${account_api}/account/freeBalance`, //我的可用余额

  list_targetList_decentralization: `${hzq_api}/hzq/project/productList/`, //标的产品列表-散标  GET 丁延超/位金越
  list_targetList_fix: `${hzq_api}/hzq/project/projectList/`, //标的产品列表-固收  GET 丁延超/位金越
  buy_proInfo_deatils: `${hzq_api}/hzq/project/productDetail/`, //产品详情-第二页-借款详情页面接口-散标  GET 丁延超/位金越
  buy_proInfo_fix: `${hzq_api}/hzq/project/projectDetail/`, //产品详情-第二页-借款详情页面接口-固收  GET 高燕茹/位金越
  buy_info1: `${hzq_api}/hzq/project/targetInfo`, //产品详情-第一页页面接口  POST 丁延超/位金越
  risk: `${hzq_api}/hzq/project/risk`, //风控页面  POST 丁延超/位金越

  my_bank: `${hzq_api}/hzq/project/bankCard/`, //银行卡 GET 高燕茹/位金越
  my_add_bank_code: `${metadata_api}/bank/cardbin/`, //银行卡验证 GET 高燕茹/邱志刚
  my_add_bank: `${hzq_api}/hzq/project/bankCard`, //添加银行卡 POST 高燕茹/位金越
  my_bank_supported: `${metadata_api}/bank/channel/list`, // 支持的银行卡列表 GET
  my_delete_bank: `${hzq_api}/hzq/project/bankCard`, // 删除银行卡 delete 尤海洋/位金越
  my_bank_captcha: `${hzq_api}/hzq/captcha`, //添加银行卡-验证码 POST 高燕茹/位金越
  my_recharge_bank: `${recharge_api}/recharge/withhold`, //充值_银行卡   POST 丁延超/张云龙
  my_recharge_pos: `${recharge_api}/recharge/pos`, //充值_POS机   POST 丁延超/张云龙
  my_withdraw: `${withdraw_api}/withdraw/withdrawRequest`, //提现   POST 高燕茹/张云龙
  my_bank_list: `${hzq_api}/hzq/project/bankCard`, //银行卡列表获取 GET 丁延超/张云龙
  my_recharge_procedure_bank: `${recharge_api}/recharge/withhold/serviceFee/`, //手续费-充值-银行卡   GET 丁延超/张云龙
  my_recharge_procedure_pos: `${recharge_api}/recharge/pos/serviceFee/`, //手续费-充值-pos   GET 丁延超/张云龙
  my_withdraw_procedure: `${withdraw_api}/withdraw/serviceFee/IBOXPAY/`, //手续费-提现   GET 高燕茹/张云龙
  my_withdraw_finish: `${withdraw_api}/withdraw/withdrawResult/`, //提现完成   GET 高燕茹/张云龙
  my_recharge_finish: `${recharge_api}/recharge/rechargeRequest/`, //充值完成   GET 丁延超/张云龙

  my_pwd_captcha: `${hzq_api}/hzq/sms/send`, //发送验证码 GET 尤海洋/张云龙
  my_pwd_set: `${hzq_api}/hzq/fund/set`, //设置资金密码
  my_pwd_change: `${hzq_api}/hzq/fund/modify`, //修改资金密码
  my_pwd_reset: `${hzq_api}/hzq/fund/find`, //找回资金密码

  coupon: `${coupon_api}/coupon`, // 卡券
  coupon_unread_count: `${coupon_api}/coupon/unread_count`, // 卡券未读数量 GET

  //中间版本
  pb_my_assets: `${account_api}/account/getTotalBalance`,//我的资产 GET 丁延超/张云龙
  pb_my_receive: `${account_api}/account/getTotalInterest`,//我的收益 GET 丁延超/张云龙
  pb_my_receive_his: `${account_api}/account/getYesTerDayInterest`,//历史收益 GET 高艳茹/张云龙
  // pb_my_assets: 'http://172.21.1.205:8088/account-api/account/getTotalBalance',//我的资产 GET 丁延超/张云龙
  // pb_my_receive: 'http://172.21.1.205:8088/account-api/account/getTotalInterest',//我的收益 GET 王丹/张云龙
  // pb_my_receive_his: 'http://172.21.1.205:8088/account-api/account/getYesTerDayInterest',//历史收益 GET 高艳茹/张云龙

  //微信
  wx_callback: wxCallback, // 微信回调地址
  wx_oauth: `${wx_api}/auth/oauth/authorize`, // 获取微信code
  wx_authorize: `${wx_api}/auth/authorize/`, //微信一键登录 GET
  wx_bind: `${wx_api}/auth/binding`, //微信绑定用户 POST
  get_wx_captcha: `${wx_api}/wechat/sms/`, //微信获取验证码
  wx_feedback: `${feedback_api}/feedback`, //微信意见反馈接口

  set_amount_hidden_state: `${hzq_api}/investor/setHideAmount`,  //设置隐藏显示金额 POST 尤海洋/李晓阳
  get_amount_hidden_state: `${hzq_api}/investor/getHideAmountState`,  //获取隐藏显示金额 GET 尤海洋/李晓阳
};

export default config_url;
