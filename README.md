# vue-regExp.js 正则验证 #
## author ##
[梦幻雪冰](https://github.com/chennengbao)
## update log

#### V1.3.0 ####
 文档说明
 
  |  name | description  |
| ------------ | ------------ |
|Vue.idCarNoByReg(param, config)|身份证号码验证|
|Vue.telePhoneByReg(param, config)|电话号码验证|
|Vue.weixinByReg(param, config)|微信号码验证|
|Vue.chineseByReg(param, config)|中文验证|
|Vue.urlByReg(param, config)|url验证|
|Vue.phoneByReg(param, config) | 验证手机号码格式  |
|Vue.emailByReg(param, config)  | 电子邮箱验证  |
|Vue.passwordByReg(param, config)|密码验证|
|Vue.verifyCodeByReg(param, config)|数字验证码验证|
|Vue.luhnValidate(param, config)|校验各种识别号码（信用卡号、银行卡号等）|

#### V1.2.0 ####
 文档说明
 
  |  name | description  |
| ------------ | ------------ |
|Vue.idCarNoByReg(param, config)|身份证号码验证|
|Vue.telePhoneByReg(param, config)|电话号码验证|
|Vue.weixinByReg(param, config)|微信号码验证|
|Vue.chineseByReg(param, config)|中文验证|
|Vue.urlByReg(param, config)|url验证|
|Vue.phoneByReg(param, config) | 验证手机号码格式  |
|Vue.emailByReg(param, config)  | 电子邮箱验证  |
|Vue.passwordByReg(param, config)|密码验证|
|Vue.verifyCodeByReg(param, config)|数字验证码验证|

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

## demo ##

#### 1. 手机号码验证 ####

	Vue.phoneByReg('18050905128', {
		detail: true, // [可选]
		error: '手机格式不对哦' // [可选]
	})

#### 2. 邮箱验证 ####

	Vue.emailByReg('chennengbao@mj216.com', {
		error: '邮箱格式不对' // [可选]
	})

#### 3.验证码验证 ####

	Vue.verifyCodeByReg('1314', {
		count: 4, // [必选]
		error: '验证码有误哦' // [可选]
	})

#### 4. 密码验证 ####

	Vue.passwordByReg('mj216com', {
		error: '密码有误哦' // [可选]
	})
	
#### 5. 身份证号码验证 ####

	Vue.idCarNoByReg('321083197812162118', {
		error: '身份证有误哦' // [可选]
	})

#### 6. 电话号码验证 ####

	Vue.telePhoneByReg('0592-5378199', {
		error: '电话号码有误' // [可选]
	})

#### 7. 微信号码验证 #### 

	Vue.weixinByReg('cnb718747239', {
		error: '微信号有误' // [可选]
	})

#### 8. 中文验证 #### 

	Vue.chineseByReg('梦幻雪冰', {
		error: '不是中文' // [可选]
	})

#### 9. url验证 #### 

	Vue.urlByReg('http://www.h5course.com/a/20151114316.html', {
		error: 'url有误哦' // [可选]
	})

#### 10. 校验各种识别号码 ####

	Vue.luhnValidate('6221020200101353505', {
		error: '您的银行卡号有误'
	});