# 选股机器人（移动端/小程序）

**A Vue + Mpvue Project**

一体化移动端与小程序开发，实现全套代码复用。

> [Vue](https://cn.vuejs.org/) 是一套用于构建用户界面的渐进式框架。`Vue` 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，`Vue` 也完全能够为复杂的单页应用提供驱动。

> [mpvue](http://mpvue.com/) 是一个使用 `Vue.js` 开发小程序的前端框架。框架基于 `Vue.js` 核心，`mpvue` 修改了 `Vue.js` 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 `Vue.js` 开发体验。

## 简介

> [一个同时支持移动端与小程序的聊天机器人](https://www.jianshu.com/p/91e566bfeedf)

## Build Setup

``` bash
# install dependencies
npm install

# build mini program
npm run dev

# build H5 page
npm run devH5

# build for production with minification for mini program
npm run build

# build for production with minification for H5 page
npm run buildH5

# build for production and view the bundle analyzer report
npm run build --report
```
## 重要！！！

- 请在`project.config.json`文件,`appid`处填写自己注册的微信appid;
- [echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin)**支持微信版本 >= 6.6.3，对应基础库版本 >= 1.9.91**。
- 若小程序端有`thirdScriptError`错误需注释`import axios from axios`和`import echarts from echarts`后重新运行`npm run dev`;

## 主要特性

* 使用 `Vue.js` 构建移动端应用
* 使用 `mpvue` 复用代码构建小程序应用
* 使用 Vuex 数据管理方案，方便构建复杂应用
* 使用 webpack 构建机制：自定义构建策略、开发阶段 hotReload
* 支持使用 npm 外部依赖

## 截图

### 移动端

![移动端](./static/res/readmeImg/demo_web.gif)

### 微信端

![小程序](./static/res/readmeImg/demo_wx.gif)

## Contribution

[RuShi](https://github.com/zz570557024)

## License

[MIT](http://opensource.org/licenses/MIT)

## P.S.
- *此项目适合Vue，mpvue和多端开发学习，对于公司大型项目不建议一体化开发；*

- *若还有其它问题，欢迎提问。*
