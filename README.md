## 顺风车-小程序（service-mpvue-mini）

service-mini是基于`mpvue`构建的顺风车平台，已经上线（小程序码见下边），欢迎Star。

> 本项目是我周末开发出来的，从设计和开发都是我一个人，画原型、找素材、前后端代码编写和微信小程序认证；中间参考了无数的小程序和APP的样式和交互，争取做到体验第一 ^_^

> 大概用了两个多月，主要是本身工作比较忙，所以比较拖得时间也长，如有什么不明白的可直接联系我或者有什么好的建议意见都可以联系我 人人都是产品经理 ^_^，下边我会给出我的微信号，谢谢！

> 喜欢的请Star，fork这些是我坚持下去的动力

> 有想法的小伙伴可以找我一起，把你的奇思妙想变成现实 ^_^



新的作品欢迎体验（布谷鸟助手），后期可能考虑开源（基于`uni-app`构建）

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/qrcode_remind.jpg)


小程序码体验

2.0版本

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/car_2.0.jpg)

1.0版本

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/qrcode.jpg)


### 技术栈（2.0）

前端：小程序、mpvue、Vuex、flyio、font-awesome

后端：Go、BeeGo、MySQL8.0


### 技术栈（1.0）

前端：小程序、mpvue、Vuex、flyio、font-awesome

后端：Java、SpringBoot、MySQL


### 构建步骤

``` bash
# 安装依赖
npm install

# 开发模式启动
npm run dev

# 打包
npm run build

具体步骤参见 mpvue 官网
```

### 主要功能（2.0）

测试

<img src="https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/10.jpg" width="280px" style="max-width: 280rpx; display: inline-block;"><img src="https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/11.jpg" width="280px" style="max-width: 280rpx; display: inline-block;"><img src="https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/12.jpg" width="280px" style="max-width: 280rpx; display: inline-block;">


首页

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/10.jpg)![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/11.jpg)![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/12.jpg)

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-1.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-2.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-3.jpg)


发布

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/20.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/21.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/22.jpg)


查看发布后的行程

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/23.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/24.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/25.jpg)


预定行程

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/30.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/31.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/32.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/33.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/34.jpg)


乘客预定行程后（车主看到的行程信息）

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/40.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/41.jpg)


信息中心

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/50.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/51.jpg)


个人中心

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/60.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/2.0/61.jpg)


### 主要功能（1.0）


首页、列表页和筛选页

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-1.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-2.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-3.jpg)

详情页

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-4.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-5.jpg)

个人页

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-6.jpg)

分享和生成分享图片页

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-7.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-8.jpg)

个人发布行程和司机发布行程页

![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-9.jpg)
![image](https://github.com/chengzhx76/service-mpvue-mini/blob/master/resource/1.0/mp-10.jpg)


大家可以扫码上手试下~~

#### 联系方式

WeChat：chengzhx76

email：chengzhx76@qq.com
