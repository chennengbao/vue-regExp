# vue-regExp.js 正则验证 #
## author ##
[梦幻雪冰](https://github.com/chennengbao)
## update log

#### V1.1.0 ####
 文档说明
 
  |  name | description  |
| ------------ | ------------ |
|  Vue.phoneByReg(param, config) | 验证手机号码格式  |
| Vue.emailByReg(param, config)  | 电子邮箱验证  |
|Vue.passwordByReg(param, config)|密码验证|
|Vue.verifyCodeByReg(param, config)|数字验证码验证|

#### V1.0.0 ####
文档说明

 |  name | description  |
| ------------ | ------------ |
|  Vue.phoneByReg(param, config) | 验证手机号码格式  |
| Vue.emailByReg(param, config)  | 电子邮箱验证  |

# demo #

## 【1】手机号码验证 ##

	Vue.phoneByReg('18050905128', {
		detail: true, // [可选]
		error: '手机格式不对哦' // [可选]
	})

## 【2】邮箱验证 ##

	Vue.emailByReg('18050905128', {
	    error: '邮箱格式不对' // [可选]
	})

## 【3】密码验证 ##

	Vue.verifyCodeByReg('1314', {
	    count: 4, 
	    error: '验证码有误哦'
	})


## 【4】数字验证码验证 ##

	Vue.passwordByReg('chennengbao1314520', {
	    error: '密码有误哦'
	})