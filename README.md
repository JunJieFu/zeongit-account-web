
# Zeongit Account
  一个只作管理账号的网站，网站只提供账号操作等功能，这样做的功能主要是为了提供一个账号提供全部项目网站通用。
  
  灵感主要是来自Google，Google业务范围很多，譬如YouTube，Google Keep，Gmail等，他们都是使用一个账号为登录，所以从想仿照Google的方式实现同域名下token通用实现账号共享，所以该项目只是第一步，接下来所有项目都须通过该项目来实现登录，然后跳转到对应的二级域名项目下。
  
  UI遵循[Material Design](https://www.material.io/)原则，使用的是Vue下的Material Design风格的[Vuetify](https://vuetifyjs.com/)框架，但是由于框架有半点不是很符合个人开发习惯，所以在这个基础上抽离出了一个封装包，具体路径为[/src/plugins/zg](https://github.com/JunJieFu/zeongit-account-web/tree/master/src/plugins/zg)
  
  这次做这个项目并没有使用Nuxt.js，主要是开启这个项目是处于Vue3.0快要发布的时间，所以想等Vue3.0发布的时刻第一时间能够升级为Vue3.0，也有可能在Vue3.0版本改用Typescript
  
  注：   
  由于网站不是处于正式使用的情况，所以会导致账号丢失情况，所以如果要注册账号请联系作者吧。
  
#### 快速链接  
官网：[account.secdra.com](http://account.secdra.com)  

#### 相关应用
[Zeongit Beauty](http://beauty.secdra.com/)
  
#### 技术栈  
 - Vue  
 - Vuetify 
 - Scss  
 - Vue-Router  
 - Vuex  
  
#### 项目结构  
  
#### API提供
[zeongit-account](https://github.com/JunJieFu/zeongit-account)
  
#### 构建  
``` bash  
$ npm install  
  
$ npm run serve  

$ npm run build  
```  

#### 开源协议  
[MIT](https://opensource.org/licenses/MIT)
