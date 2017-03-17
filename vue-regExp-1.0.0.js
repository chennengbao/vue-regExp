/* 
 * @Author: 陈能堡 - 梦幻雪冰
 * @GitHub: https://github.com/chennengbao
 * @email: chennengbao@mj216.com
 * @Date:   2017-03-15 14:07:47
 * @Last Modified by:   陈能堡 - 梦幻雪冰
 * @Last Modified time: 2017-03-17 18:07:32
 *
 * 文档说明
 * name                                 description
 * 
 * Vue.phoneByReg(param, config)        验证手机号码格式
 * Vue.emailByReg(param, config)        电子邮箱验证
 */
;(function() {
    /******** 公用属性开始 *********/
    var regObj = {
        // 通用手机号码
        phoneReg: /^(13\d|14[57]|15[012356789]|17[03678]|18\d)\d{8}$/g,
        // 移动号码
        motionReg: /^(13[456789]|147|15[012789]|18[23478]|178|170)\d$/g,
        // 联通号码
        unicomReg: /^(13[012]|145|15[56]|176|18[56]|170)\d$/g,
        // 电信号码
        telecomReg: /^(133|153|17[37]|18[019]|170)\d$/g,
        // 电子邮箱
        emailReg: /^([a-zA-Z0-9_\+\-\.])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/g
    },
    infoObj = {
        phoneError: '手机号码错误',
        emailError: '邮箱格式错误'
    },
    /******** 公用属性结束 *********/

    /******** 公用方法开始 *********/
    cnbTool = {
        /*
         * [strTrim 去除字符串首尾空格]
         * @param  {[字符串]} str [去除的字符串]
         * @return {[字符串]}     [去除首尾空格的字符串]
         */
        strTrim: function(str) {
            if(typeof str === 'number') {
                str = str.toString();                
            }

            return str.trim();
        },

        /*
         * [phoneByReg 验证手机号码格式]
         * @param  {[字符串/数字]} phone  [手机号码]
         * @param  {[对象]} config [配置对象]
         * @return {[对象]}        [返回验证结果]
         *
         * @demo
         * Vue.phoneByReg('18210246884', {
         *     detail: true, [是否显示运营商信息]
         *     error: '您输入的手机号码有误' [自定义错误提示信息]
         *  })
         */
        phoneByReg: function(phone, config) {
            var phoneNum        = cnbTool.strTrim(phone),
                // 返回结果
                resultObj       = {},
                // 是否需要运营商信息
                operatorInfor   = false,
                // 自定义错误信息
                phoneError      = infoObj.phoneError,
                // 号码段
                sectionStr      = phoneNum.substring(0, 4);

            // 判断传入的配置信息
            if (typeof config === 'object') {
                operatorInfor = config['detail'] ? config['detail'] : false;
                phoneError = config['error'] ? config['error'] : infoObj.phoneError;                
            } 

            if (regObj.phoneReg.test(phoneNum)) {
                regObj.phoneReg.lastIndex = 0;

                if (operatorInfor) {
                    switch(true) {
                        case regObj.telecomReg.test(sectionStr):
                            resultObj['type'] = '电信'; 
                            regObj.telecomReg.lastIndex = 0;
                            break;
                        case regObj.motionReg.test(sectionStr):
                            resultObj['type'] = '移动'; 
                            regObj.motionReg.lastIndex = 0;
                            break;
                        case regObj.unicomReg.test(sectionStr):
                            resultObj['type'] = '联通';
                            regObj.unicomReg.lastIndex = 0; 
                            break;
                    } 
                };

                resultObj['check'] = true;
                resultObj['success'] = '匹配成功';                
            } else {
                resultObj['check'] = false;
                resultObj['error'] = phoneError;
            }

            return resultObj;
        },

        /*
         * [emailByReg 电子邮箱验证]
         * @param  {[字符串]} email  [电子邮箱]
         * @param  {[对象]} config [配置对象]
         * @return {[对象]}        [返回验证结果]
         *
         * @demo
         * Vue.emailByReg('chennengbao16.com', {
         *     error: '邮箱格式不对哦'
         * })
         */
        emailByReg: function(email, config) {
            var emailStr    = cnbTool.strTrim(email),
                // 返回结果
                resultObj   = {},
                // 自定义错误信息
                emailError  = infoObj.emailError;

            // 判断传入的配置信息
            if (typeof config == 'object') {
                emailError = config['error'] ? config['error'] : infoObj.emailError;                
            } 

            if (regObj.emailReg.test(emailStr)) {
                regObj.emailReg.lastIndex = 0;

                resultObj['check']  = true;   
                resultObj['success'] = '匹配成功';             
            } else {
                resultObj['check']  = false;
                resultObj['error'] = emailError;
            }

            return resultObj;
        }
    };

    /******** 公用方法结束 *********/

    var cnbPlugin = {};
    cnbPlugin.install = function(Vue, options) {
        // 手机号码验证
        Vue.phoneByReg = cnbTool.phoneByReg;
        // 电子邮箱验证
        Vue.emailByReg = cnbTool.emailByReg;
    };
    
    // 暴露接口
    if (typeof exports == 'object') {
        module.exports = cnbPlugin;
    } else if(typeof define == 'function' && define.amd) {
        define([], function() { return cnbPlugin;});
    } else if(window.Vue) {
        window.cnbPlugin = cnbPlugin;
    }
})();

