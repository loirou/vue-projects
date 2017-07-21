<template>
    <div class="pd-15px" style="color:#a2a2a2;background:url('../static/bg_info.png') no-repeat;background-size:contain;">
        <div style="font-size:16px;color:#9a9a9a;border-color:#45484a;margin-bottom: 29px;">支持本场比赛</div>

        <div class="row">
            <div class="col-3" style="color:#fff;line-height:37px;">金额</div>
            <div class="col-9" style="left:-14px;">
                <input type="number" class="text-center" style="border-radius:3px;width:130px;height:35px;font-size:16px;opacity:0.2;background:#fff;color:#ff5a5f;"/>
            </div>
        </div>
        <div class="row mg-t-10px" style="margin-top: 15px;">
            <div class="col-3">&nbsp;</div>
            <div class="col-9" style="left:-14px;">
                <button class="button pd-10px" style="border-radius:3px;background-color:#2b52b2;color:#FFF;border:none;width:130px;">
                    立即支付
                </button>
            </div>
        </div>
        <div class="row mg-t-30px border-b pd-tb-10px" style="border-color:#45484a;">
            <div class="col-4">
                共 <span style="color:#FFF; font-size:17px;">26</span>人参与
            </div>
            <div class="col-8 text-right">
                累计金额<span style="color:#FFF;"> ¥ 25.37</span>
            </div>
        </div>
        <div>
            <div class="flex-row flex-middle pd-tb-5px border-b" style="border-color:#45484a;">
                <div class="col-2">
                    <img src="../asset/icon_suc.png" class="" style="border-radius:50%;width:38px;height:38px;"/>
                </div>
                <div class="col-6">张三</div>
                <div class="col-4 text-right">
                    <span style="color:#FF5A5F;"> ¥ 25.37</span>
                </div>
            </div>
            <div class="flex-row flex-middle pd-tb-5px border-b" style="border-color:#45484a;">
                <div class="col-2">
                    <img src="../asset/icon_suc.png" class="" style="border-radius:50%;width:38px;height:38px;"/>
                </div>
                <div class="col-6">张三</div>
                <div class="col-4 text-right">
                    <span style="color:#FF5A5F;"> ¥ 25.37</span>
                </div>
            </div>
            <div class="flex-row flex-middle pd-tb-5px border-b" style="border-color:#45484a;">
                <div class="col-2">
                    <img src="../asset/icon_suc.png" class="" style="border-radius:50%;width:38px;height:38px;"/>
                </div>
                <div class="col-6">张三</div>
                <div class="col-4 text-right">
                    <span style="color:#FF5A5F;"> ¥ 25.37</span>
                </div>
            </div>
            <div class="flex-row flex-middle pd-tb-5px border-b" style="border-color:#45484a;">
                <div class="col-2">
                    <img src="../asset/icon_suc.png" class="" style="border-radius:50%;width:38px;height:38px;"/>
                </div>
                <div class="col-6">张三</div>
                <div class="col-4 text-right">
                    <span style="color:#FF5A5F;"> ¥ 25.37</span>
                </div>
            </div>
            <div class="flex-row flex-middle pd-tb-5px border-b" style="border-color:#45484a;">
                <div class="col-2">
                    <img src="../asset/icon_suc.png" class="" style="border-radius:50%;width:38px;height:38px;"/>
                </div>
                <div class="col-6">张三</div>
                <div class="col-4 text-right">
                    <span style="color:#FF5A5F;"> ¥ 25.37</span>
                </div>
            </div>
            <div class="flex-row flex-middle pd-tb-5px border-b" style="border-color:#45484a;">
                <div class="col-2">
                    <img src="../asset/icon_suc.png" class="" style="border-radius:50%;width:38px;height:38px;"/>
                </div>
                <div class="col-6">张三</div>
                <div class="col-4 text-right">
                    <span style="color:#FF5A5F;"> ¥ 25.37</span>
                </div>
            </div>
            <div class="flex-row flex-middle pd-tb-5px border-b" style="border-color:#45484a;">
                <div class="col-2">
                    <img src="../asset/icon_suc.png" class="" style="border-radius:50%;width:38px;height:38px;"/>
                </div>
                <div class="col-6">张三</div>
                <div class="col-4 text-right">
                    <span style="color:#FF5A5F;"> ¥ 25.37</span>
                </div>
            </div>
            <div class="flex-row flex-middle pd-tb-5px border-b" style="border-color:#45484a;">
                <div class="col-2">
                    <img src="../asset/icon_suc.png" class="" style="border-radius:50%;width:38px;height:38px;"/>
                </div>
                <div class="col-6">张三</div>
                <div class="col-4 text-right">
                    <span style="color:#FF5A5F;"> ¥ 25.37</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {tool} from 'app-utils';
    var si;
    export default {
        created: function () {
            tool.setPageTitle('打赏');
        },
        mounted: function () {

        },
        data() {
            return {

            }
        },
        methods: {
        }
    };

</script>
<style>

.pd-15px {
  padding: 15px;
}

.pd-tb-5px {
  padding-top: 5px;
  padding-bottom: 5px;
}

</style>
