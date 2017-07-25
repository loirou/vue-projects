/**
 * Created by Darren on 16/09/11.
 *
 * Des: 路由模块
 *
 */

// menu 和 index 组件页面进入立即加载，不需要设置懒加载
import main from '../components/main';
import index from '../components/index';

// home 首页
const home = r => require.ensure([], () => r(require('../components/home')), 'home');

// list 模块 begin ----------
// 固收
const decentralization = r => require.ensure([], () => r(require('../components/decentralization')), 'products');
// 散标
const fixed = r => require.ensure([], () => r(require('../components/fixed')), 'products');
// list 模块 end ----------

// product 模块 begin ----------
// 产品详情页面
const pro_info = r => require.ensure([], () => r(require('../components/product/pro_Info')), 'product-info');
// 购买界面
const buyProject = r => require.ensure([], () => r(require('../components/buy/buyProject')), 'product-buy');
// 购买完成界面
const buyFinish = r => require.ensure([], () => r(require('../components/buy/buyFinish')), 'product-buy');
// product 模块 end ----------

// 收益计算器模块
// 引用了chart.js，组件依赖文件较大，单独打包
const profit_calculator = r => require.ensure([], () => r(require('../components/product/profit_calculator.vue')), 'profit_calculator');

// my 模块 begin ----------
// 我的个人中心首页
const my = r => require.ensure([], () => r(require('../components/my')), 'my-center');
// 我的资产明细
const my_assetList = r => require.ensure([], () => r(require('../components/my/my_assetList')), 'my-asset');
// 我的-资产一览
const my_asset = r => require.ensure([], () => r(require('../components/my/my_asset')), 'my-asset');
// 提现
const my_withdraw = r => require.ensure([], () => r(require('../components/my/my_withdraw')), 'my-withdraw');
// 提现
const my_withdraw_finish = r => require.ensure([], () => r(require('../components/my/my_withdrawFinish')), 'my-withdraw');
// 充值
const my_recharge = r => require.ensure([], () => r(require('../components/my/my_recharge')), 'my-recharge');
// 充值完成
const my_recharge_finish = r => require.ensure([], () => r(require('../components/my/my_rechargeFinish')), 'my-recharge');
// 我的-投资记录
const my_invest_record = r => require.ensure([], () => r(require('../components/my/my_investRecord')), 'my-invest');
// 我的-银行卡
const my_bank = r => require.ensure([], () => r(require('../components/my/my_bankcard')), 'my-bankcard');
// 我的-银行卡-添加银行卡
const my_add_bank = r => require.ensure([], () => r(require('../components/my/my_add_bank')), 'my-bankcard');
// 我的-银行卡说明
const my_bankDeclare = r => require.ensure([], () => r(require('../components/my/my_bankDeclare')), 'my-bankcard');
// 我的-账号信息
const my_account = r => require.ensure([], () => r(require('../components/my/my_account')), 'my-account');
// 我的-账号信息
const my_fund_pwd = r => require.ensure([], () => r(require('../components/my/my_fund_pwd')), 'my-pwd');
// 我的-我的卡券
const my_coupon = r => require.ensure([], () => r(require('../components/my/my_coupon')), 'my-coupon');
// 我的-我的卡券说明
const my_coupon_declare = r => require.ensure([], () => r(require('../components/my/my_coupon_declare')), 'my-coupon');
// my 模块 end ----------

// info 模块 begin ----------
// 收益计算器页面——异步加载
// 品牌介绍
const info_about = r => require.ensure([], () => r(require('../components/info/about.vue')), 'info');
// 安全保障
const info_security = r => require.ensure([], () => r(require('../components/info/security.vue')), 'info');
// 常见问题
const info_qa = r => require.ensure([], () => r(require('../components/info/qa.vue')), 'info');
// 特别说明
const info_note = r => require.ensure([], () => r(require('../components/info/note.vue')), 'info');
// 客服中心
const info_service = r => require.ensure([], () => r(require('../components/info/service.vue')), 'info');
// 客服中心
const info_error = r => require.ensure([], () => r(require('../components/info/error.vue')), 'info');
// 第三方协议
const info_treaty = r => require.ensure([], () => r(require('../components/info/treaty.vue')), 'info');
// info 模块 end

//wx 模块
const wx = r => require.ensure([], () => r(require('../components/wx/index.vue')), 'wx'); // 微信中转路由
const bind = r => require.ensure([], () => r(require('../components/wx/bind.vue')), 'wx-bind'); // 微信号绑定
const feedback = r => require.ensure([], () => r(require('../components/wx/feedback.vue')), 'wx-feedback'); // 微信反馈
const hzq_describe = r => require.ensure([], () => r(require('../components/wx/hzq_describe.vue')), 'wx-describe');
const xjg_describe = r => require.ensure([], () => r(require('../components/wx/xjg_describe.vue')), 'wx-describe');
//wx 模块 end

//我的收益
const profit = r => require.ensure([],() => r(require('../components/my/my_profit.vue')),'profit');
//我的历史收益
const my_history_profit = r => require.ensure([],() => r(require('../components/my/my_historyProfit.vue')),'my-history-profit');

//活动页
const activity_revision = r => require.ensure([], () => r(require('../components/activity/revision')), 'activity');
const activity_coupon = r => require.ensure([], () => r(require('../components/activity/coupon')), 'activity');
const activity_wyjh = r => require.ensure([], () => r(require('../components/activity/wyjh')), 'activity');


// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由

export default function(router) {
  router.map({
    '/': {
      component: main,
      subRoutes: {
        '/': {
          name: 'index',
          component: index
        },
        '/home': {
          name: 'home',
          component: home,
          title: '汇赚钱'
        },
        '/decentralization': {
          name: 'decentralization',
          component: decentralization,
          title: '散标理财'
        },
        '/fixed': {
          name: 'fixed',
          component: fixed,
          title: '固收理财'
        },
        '/my': {
          name: 'my',
          component: my,
          title: '我的'
        },
        '/my/assets-list': {
          name: "assets-list",
          component: my_assetList,
          title: '资金明细'
        },
        '/my/my-asset': {
          name: "my-asset",
          component: my_asset,
          title: '资产一览'
        },
        '/my/recharge': {
          name: 'my-recharge',
          component: my_recharge,
          title: '充值'
        },
        '/my/withdraw': {
          name: 'my-withdraw',
          component: my_withdraw,
          title: '提现'
        },
        '/my/invest-record': {
          name: 'my-invest-record',
          component: my_invest_record,
          title: '投资记录'
        },
        '/my/bank-card': {
          name: 'my-bankcard',
          component: my_bank,
          title: '我的银行卡'
        },
        '/my/coupon': {
          name: 'my-coupon',
          component: my_coupon,
          title: '我的加息券'
        },
        '/my/coupon-declare': {
          name: 'coupon-declare',
          component: my_coupon_declare,
          title: '卡券介绍'
        },
        '/my/bank-declare': {
          name: 'declare',
          component: my_bankDeclare,
          title: '银行卡说明'
        },
        '/my/my-add-bank': {
          name: "my-add-bank",
          component: my_add_bank,
          title: '添加银行卡'
        },
        '/pro/product/:targetId': {
          name: "product",
          component: pro_info,
          title: '产品详情'
        },
        '/my/withdraw-finish/:orderNo': {
          name: "withdraw-finish",
          component: my_withdraw_finish,
          title: '提现成功'
        },
        //充值结束页面
        '/my/recharge-finish/:random': { //加一个random参数防止缓存
          name: "recharge-finish",
          component: my_recharge_finish,
          title: '充值成功'
        },
        '/my/account': {
          name: "my-account",
          component: my_account,
          title: '账户信息'
        },
        '/my/fund-pwd-set': {
          name: 'my-fund-pwd-set',
          component: my_fund_pwd,
          title: '设置资金密码'
        },
        '/my/fund-pwd-change': {
          name: 'my-fund-pwd-change',
          component: my_fund_pwd,
          title: '修改资金密码'
        },
        '/my/fund-pwd-reset': {
          name: 'my-fund-pwd-reset',
          component: my_fund_pwd,
          title: '重置资金密码'
        },
        '/buy/buy-project/:targetId': {
          name: 'pay-money',
          component: buyProject,
          title: '项目投资'
        },
        '/buy/buy-finish/:id': {
          name: 'buy-finish',
          component: buyFinish,
          title: '购买完成'
        },
        '/pro/calculator/:targetId': {
          name: 'profit-calculator',
          component: profit_calculator,
          title: '收益计算器'
        },
        '/info/about': {
          name: 'info-about',
          component: info_about,
          title: '品牌介绍'
        },
        '/info/security': {
          name: 'info-security',
          component: info_security,
          title: '安全保障'
        },
        '/info/qa': {
          name: 'info-qa',
          component: info_qa,
          title: '常见问题'
        },
        '/info/note': {
          name: 'info-note',
          component: info_note,
          title: '特别说明'
        },
        '/info/service': {
          name: 'info-service',
          component: info_service,
          title: '客服中心'
        },
        '/info/error': {
          name: 'info-error',
          component: info_error,
          title: '网络繁忙'
        },
        '/info/treaty': {
          name: 'info-treaty',
          component: info_treaty,
          title: '代扣协议'
        },
        '/activity/revision': {
          name: 'activity-revision',
          component: activity_revision,
          title: '全新改版'
        },
        '/activity/coupon': {
          name: 'activity-coupon',
          component: activity_coupon,
          title: '加息券'
        },
        '/activity/wyjh': {
          name: 'activity-wyjh',
          component: activity_wyjh,
          title: '稳赢计划'
        },
        // wechat
        '/wechat': {
          name: 'wechat',
          component: wx,
          title: '微信回调'
        },
        '/wechat/bind/:openid': {
          name: 'wechat-bind',
          component: bind,
          title: '账户绑定'
        },
        '/wechat/feedback': {
          name: 'wechat-feedback',
          component: feedback,
          title: '问题反馈'
        },
        '/wechat/hzq-describe': {
          name: 'hzq-describe',
          component: hzq_describe
        },
        '/wechat/xjg-describe': {
          name: 'xjg-describe',
          component: xjg_describe
        },
        //my-profit
        '/my/profit': {
          name: 'profit',
          component: profit,
          title: '我的收益'
        },
        '/my/history-profit': {
          name: 'my-history-profit',
          component:my_history_profit,
          title: '历史收益'
        }
      }
    },
  })
}
