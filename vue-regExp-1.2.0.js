/* 
 * @Author: 陈能堡 - 梦幻雪冰
 * @GitHub: https://github.com/chennengbao
 * @email: chennengbao@mj216.com
 * @Date:   2017-03-15 14:07:47
 * @Last Modified by:   陈能堡 - 梦幻雪冰
 * @Last Modified time: 2017-04-19 16:59:00
 *
 * 文档说明
 * name                                 description
 * 
 * Vue.phoneByReg(param, config)        手机号码验证
 * Vue.emailByReg(param, config)        电子邮箱验证
 * Vue.passwordByReg(param, config)     密码验证
 * Vue.verifyCodeByReg(param, config)   数字验证码验证
 * Vue.idCarNoByReg(param, config)      身份证号码验证
 * Vue.telePhoneByReg(param, config)    电话号码验证
 * Vue.weixinByReg(param, config)       微信号码验证
 * Vue.chineseByReg(param, config)      中文验证
 * Vue.urlByReg(param, config)          url验证
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
        emailReg: /^([a-zA-Z0-9_\+\-\.])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/g,
        // 密码
        passwordReg: /^(?=[a-z0-9]*\d)(?=[a-z0-9]*[a-z])[0-z0-9]{6,20}$/gi,
        // 身份证号码
        idCarNoReg: /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/g,
        // 电话号码
        telePhoneReg: /^((85[23]|0[1-9]\d{1,2})-)?\d{7,8}$/g,
        // 微信号码
        weixinReg: /^[a-zA-Z][a-zA-Z_0-9-]{5,19}$/g,
        // 中文文本
        chineseReg: /^[\u2E80-\u9FFF]+$/g,
        // url地址
        urlReg: /^((https|http):\/\/).+$/g,
    },

    infoObj = {
        phoneError: '手机号码错误',
        emailError: '邮箱格式错误',
        verifyCodeError: '验证码错误',
        passwordError: '密码由6~20位的数字、字母组成',
        idCarNoError: '身份证号码有误',
        telePhoneError: '电话号码有误',
        weixinError: '微信号码有误',
        chineseError: '不是中文',
        urlError: 'url地址有误',

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
         * [phoneByReg 验证手机号码验证]
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

                resultObj['check'] = true;   
                resultObj['success'] = '匹配成功';             
            } else {
                resultObj['check'] = false;
                resultObj['error'] = emailError;
            }

            return resultObj;
        },

        /*
         * [verifyCodeByReg 数字验证码验证]
         * @param  {[type]} verifyCode [数字验证码]
         * @param  {[type]} config     [配置对象]
         * @return {[type]}            [返回验证结果]
         *
         * @demo
         * Vue.verifyCodeByReg('1314', {
         *     count: 4, 
         *     error: '验证码有误哦'
         * })
         */
        verifyCodeByReg: function(verifyCode, config) {
            var verifyCodeStr       = cnbTool.strTrim(verifyCode),
                // 返回结果
                resultObj           = {},
                verifyCodeReg       = new RegExp('^\\d{' + config['count'] + '}$', 'gi'),
                // 自定义错误信息
                verifyCodeError     = infoObj.verifyCodeError;

            // 判断传入的配置信息
            if (typeof config == 'object') {
                verifyCodeError = config['error'] ? config['error'] : infoObj.verifyCodeError;                
            }

            if (verifyCodeReg.test(verifyCodeStr)) {
                verifyCodeReg.lastIndex = 0;

                resultObj['check'] = true;   
                resultObj['success'] = '匹配成功';             
            } else {
                resultObj['check'] = false;
                resultObj['error'] = verifyCodeError;
            }

            return resultObj;
        },

        /*
         * [passwordByReg 密码验证]
         * @param  {[type]} password [6-20的密码]
         * @param  {[type]} config   [配置信息]
         * @return {[type]}          [返回验证结果]
         *
         * @demo
         * Vue.passwordByReg('chennengbao1314520', {
         *     error: '密码有误哦'
         * })
         */
        passwordByReg: function(password, config) {
            var passwordStr     = cnbTool.strTrim(password),
                // 返回结果
                resultObj       = {},
                // 自定义错误信息
                passwordError   = infoObj.passwordError;

            // 判断传入的配置信息
            if (typeof config == 'object') {
                passwordError = config['error'] ? config['error'] : infoObj.passwordError;                
            }

            if (regObj.passwordReg.test(passwordStr)) {
                regObj.passwordReg.lastIndex = 0;

                resultObj['check'] = true;   
                resultObj['success'] = '匹配成功';             
            } else {
                resultObj['check'] = false;
                resultObj['error'] = passwordError;
            }

            return resultObj;            
        },

        /*
         * [idCarNoByReg 身份证号码验证]
         * @param  {[type]} idCarNo [身份证号码]
         * @param  {[type]} config  [配置信息]
         * @return {[type]}         [返回验证结果]
         * 
         * @demo
         * Vue.emailByReg('321083197812162118', {
         *     error: '身份证有误哦'
         * })
         */
        idCarNoByReg: function(idCarNo, config) {
            var idCarNoStr      = cnbTool.strTrim(idCarNo),
                // 返回结果
                resultObj       = {},
                // 前17位号码加权因子为
                weight          = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
                // 验证位 Y 
                arrY            = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2],
                idArr           = idCarNoStr.split(''),
                sum             = 0,
                // 自定义错误信息
                idCarNoError   = infoObj.idCarNoError;

            // 判断传入的配置信息
            if (typeof config == 'object') {
                idCarNoError = config['error'] ? config['error'] : infoObj.idCarNoError;                
            }

            if (regObj.idCarNoReg.test(idCarNoStr)) {
                regObj.idCarNoReg.lastIndex = 0;
                // 计算校验码
                for (var i = 0; i < 17; i++) {
                    sum += weight[i] * idArr[i];
                };
                sum %= 11;

                // x和X加权因子代表的是10
                var lastId = idArr[17];
                if (lastId == 'x' || lastId == 'X') {
                    lastId = 10;
                };

                // 如果相等，身份证有效
                if(lastId == arrY[sum]) {
                    resultObj['areaCode'] = idCarNoStr.substring(0, 6);
                    resultObj['birthday'] = idCarNoStr.substring(6, 14);
                    resultObj['sex'] = (idCarNoStr.substring(16, 17) == 1) ? '男' : '女';
                    resultObj['check'] = true;
                    resultObj['success'] = '验证成功';  
                } else {
                    resultObj['check'] = false;
                    resultObj['error'] = idCarNoError;                            
                }       
            } else {
                resultObj['check'] = false;
                resultObj['error'] = idCarNoError;
            }

            return resultObj;  
        },

        /*
         * [telePhoneByReg 电话号码验证]
         * @param  {[type]} telePhone [电话号码]
         * @param  {[type]} config    [配置信息]
         * @return {[type]}           [返回验证结果]
         * 
         * @demo
         * Vue.emailByReg('0592-537819', {
         *     error: '电话号码有误'
         * })
         */
        telePhoneByReg: function(telePhone, config) {
            var telePhoneStr     = cnbTool.strTrim(telePhone),
                // 返回结果
                resultObj       = {},
                // 自定义错误信息
                telePhoneError   = infoObj.telePhoneError;

            // 判断传入的配置信息
            if (typeof config == 'object') {
                telePhoneError = config['error'] ? config['error'] : infoObj.telePhoneError;                
            }

            if (regObj.telePhoneReg.test(telePhoneStr)) {
                regObj.telePhoneReg.lastIndex = 0;

                resultObj['check'] = true;   
                resultObj['success'] = '匹配成功';             
            } else {
                resultObj['check'] = false;
                resultObj['error'] = telePhoneError;
            }

            return resultObj;             
        },

        /*
         * [weixinByReg 微信号码验证]
         * @param  {[type]} weixin [微信号码]
         * @param  {[type]} config [配置信息]
         * @return {[type]}        [返回验证结果]
         * 
         * @demo
         * Vue.emailByReg('cnb718747239', {
         *     error: '微信号有误'
         * })
         */
        weixinByReg: function(weixin, config) {
            // 验证微信号 6~20个字母、数字、下划线或减号，以字母开头
            var weixinStr     = cnbTool.strTrim(weixin),
                // 返回结果
                resultObj       = {},
                // 自定义错误信息
                weixinError   = infoObj.weixinError;

            // 判断传入的配置信息
            if (typeof config == 'object') {
                weixinError = config['error'] ? config['error'] : infoObj.weixinError;                
            }

            if (regObj.weixinReg.test(weixinStr)) {
                regObj.weixinReg.lastIndex = 0;

                resultObj['check'] = true;   
                resultObj['success'] = '匹配成功';             
            } else {
                resultObj['check'] = false;
                resultObj['error'] = weixinError;
            }

            return resultObj;  
        },

        /*
         * [chineseByReg 中文验证]
         * @param  {[type]} chinese [中文文本]
         * @param  {[type]} config  [配置信息]
         * @return {[type]}         [返回验证结果]
         *
         * @demo
         * Vue.emailByReg('梦幻雪冰', {
         *     error: '不是中文'
         * })
         */
        chineseByReg: function(chinese, config) {
            var chineseStr     = cnbTool.strTrim(chinese),
                // 返回结果
                resultObj       = {},
                // 自定义错误信息
                chineseError   = infoObj.chineseError;

            // 判断传入的配置信息
            if (typeof config == 'object') {
                chineseError = config['error'] ? config['error'] : infoObj.chineseError;                
            }

            if (regObj.chineseReg.test(chineseStr)) {
                regObj.chineseReg.lastIndex = 0;

                resultObj['check'] = true;   
                resultObj['success'] = '匹配成功';             
            } else {
                resultObj['check'] = false;
                resultObj['error'] = chineseError;
            }

            return resultObj;  
        },

        /*
         * [urlByReg url验证]
         * @param  {[type]} url    [url验证]
         * @param  {[type]} config [配置信息]
         * @return {[type]}        [返回验证结果]
         *
         * @demo
         * Vue.emailByReg('http://www.h5course.com/a/20151114316.html', {
         *     error: 'url有误哦'
         * })
         */
        urlByReg: function(url, config) {
            var urlStr     = cnbTool.strTrim(url),
                // 返回结果
                resultObj       = {},
                // 自定义错误信息
                urlError   = infoObj.urlError;

            // 判断传入的配置信息
            if (typeof config == 'object') {
                urlError = config['error'] ? config['error'] : infoObj.urlError;                
            }

            if (regObj.urlReg.test(urlStr)) {
                regObj.urlReg.lastIndex = 0;

                resultObj['check'] = true;   
                resultObj['success'] = '匹配成功';             
            } else {
                resultObj['check'] = false;
                resultObj['error'] = urlError;
            }

            return resultObj;  
        },
    };

    /******** 公用方法结束 *********/

    var cnbPlugin = {};
    cnbPlugin.install = function(Vue, options) {
        // 手机号码验证
        Vue.phoneByReg = cnbTool.phoneByReg;
        // 电子邮箱验证
        Vue.emailByReg = cnbTool.emailByReg;
        // 数字验证码验证
        Vue.verifyCodeByReg = cnbTool.verifyCodeByReg;
        // 密码验证
        Vue.passwordByReg = cnbTool.passwordByReg;
        // 身份证验证
        Vue.idCarNoByReg = cnbTool.idCarNoByReg;
        // 电话号码验证
        Vue.telePhoneByReg = cnbTool.telePhoneByReg;
        // 微信号码验证
        Vue.weixinByReg = cnbTool.weixinByReg;
        // 中文验证
        Vue.chineseByReg = cnbTool.chineseByReg;
        // url验证
        Vue.urlByReg = cnbTool.urlByReg;
    };
    
    // 暴露接口
    if (typeof exports == 'object') {
        module.exports = cnbPlugin;
    } else if(typeof define == 'function' && define.amd) {
        define([], function() { return cnbPlugin;});
    } else if(window.Vue) {
        window.cnbPlugin = cnbPlugin;
        Vue.use(cnbPlugin);
    }
})();

